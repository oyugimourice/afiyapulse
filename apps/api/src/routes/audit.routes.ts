import { Router } from 'express';
import auditService from '../services/audit.service';
import { authenticate } from '../middleware/auth.middleware';
import { AppError } from '../middleware/error.middleware';

const router = Router();

/**
 * @route   GET /api/audit
 * @desc    Get audit logs with filters
 * @access  Private (Admin only)
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    // Check if user is admin
    if ((req as any).user.role !== 'ADMIN') {
      throw new AppError('Access denied. Admin privileges required.', 403);
    }

    const {
      userId,
      action,
      resourceType,
      resourceId,
      startDate,
      endDate,
      limit,
      offset,
    } = req.query;

    const result = await auditService.query({
      userId: userId as string,
      action: action as any,
      resourceType: resourceType as string,
      resourceId: resourceId as string,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/audit/user/:userId
 * @desc    Get audit logs for a specific user
 * @access  Private (Admin or own logs)
 */
router.get('/user/:userId', authenticate, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { limit, offset } = req.query;

    // Check if user is admin or requesting own logs
    if ((req as any).user.role !== 'ADMIN' && (req as any).user.id !== userId) {
      throw new AppError('Access denied', 403);
    }

    const result = await auditService.getUserLogs(
      userId,
      limit ? parseInt(limit as string) : undefined,
      offset ? parseInt(offset as string) : undefined
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/audit/resource/:resourceType/:resourceId
 * @desc    Get audit logs for a specific resource
 * @access  Private (Admin only)
 */
router.get('/resource/:resourceType/:resourceId', authenticate, async (req, res, next) => {
  try {
    if ((req as any).user.role !== 'ADMIN') {
      throw new AppError('Access denied. Admin privileges required.', 403);
    }

    const { resourceType, resourceId } = req.params;
    const { limit } = req.query;

    const result = await auditService.getResourceLogs(
      resourceType,
      resourceId,
      limit ? parseInt(limit as string) : undefined
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/audit/recent
 * @desc    Get recent audit logs
 * @access  Private (Admin only)
 */
router.get('/recent', authenticate, async (req, res, next) => {
  try {
    if ((req as any).user.role !== 'ADMIN') {
      throw new AppError('Access denied. Admin privileges required.', 403);
    }

    const { limit } = req.query;

    const result = await auditService.getRecentLogs(
      limit ? parseInt(limit as string) : undefined
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/audit/security
 * @desc    Get security events
 * @access  Private (Admin only)
 */
router.get('/security', authenticate, async (req, res, next) => {
  try {
    if ((req as any).user.role !== 'ADMIN') {
      throw new AppError('Access denied. Admin privileges required.', 403);
    }

    const { limit } = req.query;

    const logs = await auditService.getSecurityEvents(
      limit ? parseInt(limit as string) : undefined
    );

    res.json({ logs });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/audit/statistics
 * @desc    Get audit statistics
 * @access  Private (Admin only)
 */
router.get('/statistics', authenticate, async (req, res, next) => {
  try {
    if ((req as any).user.role !== 'ADMIN') {
      throw new AppError('Access denied. Admin privileges required.', 403);
    }

    const { startDate, endDate } = req.query;

    const stats = await auditService.getStatistics(
      startDate ? new Date(startDate as string) : undefined,
      endDate ? new Date(endDate as string) : undefined
    );

    res.json(stats);
  } catch (error) {
    next(error);
  }
});

export default router;

// Made with Bob