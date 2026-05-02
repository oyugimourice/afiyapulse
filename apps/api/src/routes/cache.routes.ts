import { Router } from 'express';
import cacheService from '../services/cache.service';
import { authenticate } from '../middleware/auth.middleware';
import { cacheStatsMiddleware } from '../middleware/cache.middleware';
import logger from '../config/logger';

/**
 * Cache Management Routes
 * 
 * Provides endpoints for cache monitoring and management.
 * All routes require authentication and admin privileges.
 */

const router = Router();

/**
 * @route   GET /api/cache/stats
 * @desc    Get cache statistics
 * @access  Private (Admin only)
 */
router.get('/stats', authenticate, cacheStatsMiddleware);

/**
 * @route   GET /api/cache/health
 * @desc    Check cache health
 * @access  Private (Admin only)
 */
router.get('/health', authenticate, async (req, res, next) => {
  try {
    // Check if user is admin
    const user = (req as any).user;
    if (user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required',
      });
    }

    // Try to set and get a test value
    const testKey = 'health_check';
    const testValue = { timestamp: Date.now() };
    
    await cacheService.set(testKey, testValue, { ttl: 10 });
    const retrieved = await cacheService.get(testKey);
    await cacheService.delete(testKey);

    const isHealthy = retrieved !== null;

    res.json({
      success: true,
      data: {
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Cache health check error:', error);
    res.status(500).json({
      success: false,
      error: 'Cache health check failed',
    });
  }
});

/**
 * @route   DELETE /api/cache/invalidate/:prefix
 * @desc    Invalidate cache by prefix
 * @access  Private (Admin only)
 */
router.delete('/invalidate/:prefix', authenticate, async (req, res, next) => {
  try {
    // Check if user is admin
    const user = (req as any).user;
    if (user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required',
      });
    }

    const { prefix } = req.params;
    const pattern = `${prefix}:*`;
    
    await cacheService.deletePattern(pattern);
    
    logger.info(`Cache invalidated by admin: ${pattern}`, {
      userId: user.id,
      prefix,
    });

    res.json({
      success: true,
      message: `Cache invalidated for prefix: ${prefix}`,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/cache/clear
 * @desc    Clear all cache (use with extreme caution)
 * @access  Private (Admin only)
 */
router.delete('/clear', authenticate, async (req, res, next) => {
  try {
    // Check if user is admin
    const user = (req as any).user;
    if (user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required',
      });
    }

    // Require confirmation parameter
    const { confirm } = req.query;
    if (confirm !== 'true') {
      return res.status(400).json({
        success: false,
        error: 'Confirmation required. Add ?confirm=true to clear all cache.',
      });
    }

    await cacheService.clearAll();
    
    logger.warn('All cache cleared by admin', {
      userId: user.id,
      timestamp: new Date().toISOString(),
    });

    res.json({
      success: true,
      message: 'All cache cleared successfully',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/cache/key/:key
 * @desc    Get value for a specific cache key
 * @access  Private (Admin only)
 */
router.get('/key/:key', authenticate, async (req, res, next) => {
  try {
    // Check if user is admin
    const user = (req as any).user;
    if (user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required',
      });
    }

    const { key } = req.params;
    const { prefix } = req.query;
    
    const value = await cacheService.get(key, { 
      prefix: prefix as string 
    });
    
    if (value === null) {
      return res.status(404).json({
        success: false,
        error: 'Cache key not found',
      });
    }

    const ttl = await cacheService.getTTL(key, { 
      prefix: prefix as string 
    });

    res.json({
      success: true,
      data: {
        key,
        value,
        ttl,
        expiresAt: ttl > 0 
          ? new Date(Date.now() + ttl * 1000).toISOString() 
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/cache/key/:key
 * @desc    Delete a specific cache key
 * @access  Private (Admin only)
 */
router.delete('/key/:key', authenticate, async (req, res, next) => {
  try {
    // Check if user is admin
    const user = (req as any).user;
    if (user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required',
      });
    }

    const { key } = req.params;
    const { prefix } = req.query;
    
    await cacheService.delete(key, { 
      prefix: prefix as string 
    });
    
    logger.info(`Cache key deleted by admin: ${key}`, {
      userId: user.id,
      prefix,
    });

    res.json({
      success: true,
      message: `Cache key deleted: ${key}`,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/cache/warm
 * @desc    Warm up cache with frequently accessed data
 * @access  Private (Admin only)
 */
router.post('/warm', authenticate, async (req, res, next) => {
  try {
    // Check if user is admin
    const user = (req as any).user;
    if (user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required',
      });
    }

    // This is a placeholder for cache warming logic
    // In a real implementation, you would:
    // 1. Fetch frequently accessed data from database
    // 2. Pre-populate cache with this data
    // 3. Return statistics about what was cached

    logger.info('Cache warming initiated by admin', {
      userId: user.id,
    });

    res.json({
      success: true,
      message: 'Cache warming completed',
      data: {
        itemsCached: 0,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

// Made with Bob