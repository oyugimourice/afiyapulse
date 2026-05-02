import { Request, Response, NextFunction } from 'express';
import cacheService, { CachePrefix, CacheTTL } from '../services/cache.service';
import logger from '../config/logger';

/**
 * Cache Middleware
 * 
 * Provides automatic HTTP response caching for GET requests.
 * Supports cache invalidation on POST, PUT, PATCH, DELETE requests.
 */

export interface CacheMiddlewareOptions {
  ttl?: number;
  prefix?: string;
  keyGenerator?: (req: Request) => string;
  shouldCache?: (req: Request, res: Response) => boolean;
  invalidateOn?: string[]; // HTTP methods that should invalidate cache
}

/**
 * Generate cache key from request
 */
function generateCacheKey(req: Request): string {
  const { method, originalUrl, query, params } = req;
  const userId = (req as any).user?.id || 'anonymous';
  
  // Include user ID, method, URL, and query params in key
  const queryString = Object.keys(query).length > 0 
    ? JSON.stringify(query) 
    : '';
  const paramsString = Object.keys(params).length > 0 
    ? JSON.stringify(params) 
    : '';
  
  return `${userId}:${method}:${originalUrl}:${queryString}:${paramsString}`;
}

/**
 * Check if response should be cached
 */
function shouldCacheResponse(req: Request, res: Response): boolean {
  // Only cache successful GET requests
  if (req.method !== 'GET') return false;
  if (res.statusCode < 200 || res.statusCode >= 300) return false;
  
  // Don't cache if explicitly disabled
  if (req.headers['cache-control'] === 'no-cache') return false;
  
  return true;
}

/**
 * Cache middleware factory
 */
export function cacheMiddleware(options: CacheMiddlewareOptions = {}) {
  const {
    ttl = CacheTTL.MEDIUM,
    prefix = 'http',
    keyGenerator = generateCacheKey,
    shouldCache = shouldCacheResponse,
    invalidateOn = ['POST', 'PUT', 'PATCH', 'DELETE'],
  } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = keyGenerator(req);

    // Handle cache invalidation for mutating requests
    if (invalidateOn.includes(req.method)) {
      // Invalidate related cache entries
      const pattern = `${prefix}:*${req.baseUrl}*`;
      await cacheService.deletePattern(pattern);
      logger.debug(`Cache invalidated: ${pattern}`);
      return next();
    }

    // Try to get from cache for GET requests
    if (req.method === 'GET') {
      try {
        const cached = await cacheService.get(cacheKey, { prefix });
        
        if (cached) {
          logger.debug(`Cache HIT: ${cacheKey}`);
          res.setHeader('X-Cache', 'HIT');
          return res.json(cached);
        }
        
        logger.debug(`Cache MISS: ${cacheKey}`);
        res.setHeader('X-Cache', 'MISS');
        
        // Intercept response to cache it
        const originalJson = res.json.bind(res);
        res.json = function (body: any) {
          // Cache the response if conditions are met
          if (shouldCache(req, res)) {
            cacheService.set(cacheKey, body, { prefix, ttl })
              .catch(err => logger.error('Failed to cache response:', err));
          }
          return originalJson(body);
        };
      } catch (error) {
        logger.error('Cache middleware error:', error);
        // Continue without cache on error
      }
    }

    next();
  };
}

/**
 * Cache middleware for patient routes
 */
export const patientCacheMiddleware = cacheMiddleware({
  ttl: CacheTTL.LONG,
  prefix: CachePrefix.PATIENT,
  invalidateOn: ['POST', 'PUT', 'PATCH', 'DELETE'],
});

/**
 * Cache middleware for consultation routes
 */
export const consultationCacheMiddleware = cacheMiddleware({
  ttl: CacheTTL.MEDIUM,
  prefix: CachePrefix.CONSULTATION,
  invalidateOn: ['POST', 'PUT', 'PATCH', 'DELETE'],
});

/**
 * Cache middleware for drug database routes
 */
export const drugCacheMiddleware = cacheMiddleware({
  ttl: CacheTTL.VERY_LONG,
  prefix: CachePrefix.DRUG,
  invalidateOn: [], // Drug data rarely changes
});

/**
 * Cache middleware for FHIR routes
 */
export const fhirCacheMiddleware = cacheMiddleware({
  ttl: CacheTTL.LONG,
  prefix: CachePrefix.FHIR,
  invalidateOn: ['POST', 'PUT', 'PATCH', 'DELETE'],
});

/**
 * Cache middleware for appointment routes
 */
export const appointmentCacheMiddleware = cacheMiddleware({
  ttl: CacheTTL.MEDIUM,
  prefix: CachePrefix.APPOINTMENT,
  invalidateOn: ['POST', 'PUT', 'PATCH', 'DELETE'],
});

/**
 * Manual cache invalidation middleware
 * Use this to invalidate cache after specific operations
 */
export function invalidateCacheMiddleware(
  pattern: string,
  prefix?: string
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fullPattern = prefix ? `${prefix}:${pattern}` : pattern;
      await cacheService.deletePattern(fullPattern);
      logger.debug(`Cache invalidated: ${fullPattern}`);
    } catch (error) {
      logger.error('Cache invalidation error:', error);
    }
    next();
  };
}

/**
 * Cache statistics endpoint middleware
 */
export async function cacheStatsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const stats = await cacheService.getStats();
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
}

// Made with Bob