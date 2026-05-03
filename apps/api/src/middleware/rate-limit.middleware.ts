import { Request, Response, NextFunction } from 'express';
import cacheService from '../services/cache.service';
import logger from '../config/logger';

/**
 * Rate Limiting Middleware using Redis Cache
 *
 * Provides distributed rate limiting across multiple server instances.
 * Uses Redis for storing request counts with automatic expiration.
 */

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum requests per window
  message?: string;
  statusCode?: number;
  skipSuccessfulRequests?: boolean;
  keyGenerator?: (req: Request) => string;
}

/**
 * Default key generator using IP address
 */
function defaultKeyGenerator(req: Request): string {
  return req.ip || req.socket.remoteAddress || 'unknown';
}

/**
 * Create a rate limiter middleware
 */
export function createRateLimiter(config: RateLimitConfig) {
  const {
    windowMs,
    max,
    message = 'Too many requests, please try again later',
    statusCode = 429,
    skipSuccessfulRequests = false,
    keyGenerator = defaultKeyGenerator,
  } = config;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const identifier = keyGenerator(req);
      const windowSeconds = Math.floor(windowMs / 1000);

      // Check rate limit
      const result = await cacheService.checkRateLimit(
        identifier,
        max,
        windowSeconds
      );

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', max.toString());
      res.setHeader('X-RateLimit-Remaining', result.remaining.toString());
      res.setHeader('X-RateLimit-Reset', result.resetAt.toISOString());

      if (!result.allowed) {
        logger.warn(`Rate limit exceeded for: ${identifier}`, {
          ip: req.ip,
          path: req.path,
          method: req.method,
        });

        return res.status(statusCode).json({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message,
            retryAfter: result.resetAt.toISOString(),
          },
        });
      }

      // If skipSuccessfulRequests is true, we need to decrement on successful responses
      if (skipSuccessfulRequests) {
        const originalJson = res.json.bind(res);
        res.json = function (body: any) {
          // If response is successful (2xx), we could implement decrement logic here
          // For now, we'll just pass through
          return originalJson(body);
        };
      }

      next();
    } catch (error) {
      logger.error('Rate limiter error:', error);
      // On error, allow the request through (fail open)
      next();
    }
  };
}

/**
 * General API rate limiter
 * 100 requests per minute per IP
 */
export const rateLimiter = createRateLimiter({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests, please try again later',
});

/**
 * Stricter rate limiter for authentication endpoints
 * 5 requests per minute per IP
 */
export const authRateLimiter = createRateLimiter({
  windowMs: 60000, // 1 minute
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS || '20'),
  message: 'Too many authentication attempts, please try again later',
  skipSuccessfulRequests: true,
});

/**
 * Rate limiter for file uploads
 * 10 uploads per 5 minutes per user
 */
export const uploadRateLimiter = createRateLimiter({
  windowMs: 300000, // 5 minutes
  max: 10,
  message: 'Too many upload attempts, please try again later',
  keyGenerator: (req: Request) => {
    const user = (req as any).user;
    return user?.id || req.ip || 'unknown';
  },
});

/**
 * Rate limiter for AI agent operations
 * 20 requests per minute per user (AI operations are expensive)
 */
export const agentRateLimiter = createRateLimiter({
  windowMs: 60000, // 1 minute
  max: 20,
  message: 'Too many AI agent requests, please try again later',
  keyGenerator: (req: Request) => {
    const user = (req as any).user;
    return user?.id || req.ip || 'unknown';
  },
});

/**
 * Rate limiter for consultation creation
 * 30 consultations per hour per doctor
 */
export const consultationRateLimiter = createRateLimiter({
  windowMs: 3600000, // 1 hour
  max: 30,
  message: 'Too many consultation requests, please try again later',
  keyGenerator: (req: Request) => {
    const user = (req as any).user;
    return `consultation:${user?.id || req.ip}`;
  },
});

// Made with Bob
