import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import dashboardService from '../services/dashboard.service';
import logger from '../config/logger';

/**
 * Dashboard Routes
 * 
 * Provides comprehensive dashboard endpoints for doctors:
 * - Dashboard statistics and metrics
 * - Recent activity feed
 * - Recent consultations
 * - Consultation trends
 * - Patient demographics
 * - Top diagnoses
 */

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get comprehensive dashboard statistics
 * @access  Private (Doctor/Admin)
 */
router.get('/stats', async (req, res, next) => {
  try {
    const user = (req as any).user;

    const stats = await dashboardService.getDashboardStats(user.id);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/dashboard/activity
 * @desc    Get recent activity feed
 * @access  Private (Doctor/Admin)
 */
router.get('/activity', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { limit } = req.query;

    const activity = await dashboardService.getRecentActivity(
      user.id,
      limit ? parseInt(limit as string) : 20
    );

    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/dashboard/consultations/recent
 * @desc    Get recent consultations
 * @access  Private (Doctor/Admin)
 */
router.get('/consultations/recent', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { limit } = req.query;

    const consultations = await dashboardService.getRecentConsultations(
      user.id,
      limit ? parseInt(limit as string) : 10
    );

    res.json({
      success: true,
      data: consultations,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/dashboard/consultations/trends
 * @desc    Get consultation trends over time
 * @access  Private (Doctor/Admin)
 */
router.get('/consultations/trends', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { days } = req.query;

    const trends = await dashboardService.getConsultationTrends(
      user.id,
      days ? parseInt(days as string) : 30
    );

    res.json({
      success: true,
      data: trends,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/dashboard/patients/demographics
 * @desc    Get patient demographics
 * @access  Private (Doctor/Admin)
 */
router.get('/patients/demographics', async (req, res, next) => {
  try {
    const user = (req as any).user;

    const demographics = await dashboardService.getPatientDemographics(user.id);

    res.json({
      success: true,
      data: demographics,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/dashboard/diagnoses/top
 * @desc    Get top diagnoses/conditions
 * @access  Private (Doctor/Admin)
 */
router.get('/diagnoses/top', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { limit } = req.query;

    const diagnoses = await dashboardService.getTopDiagnoses(
      user.id,
      limit ? parseInt(limit as string) : 10
    );

    res.json({
      success: true,
      data: diagnoses,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/dashboard/summary
 * @desc    Get complete dashboard summary (all data in one call)
 * @access  Private (Doctor/Admin)
 */
router.get('/summary', async (req, res, next) => {
  try {
    const user = (req as any).user;

    // Fetch all dashboard data in parallel
    const [
      stats,
      activity,
      recentConsultations,
      trends,
      demographics,
      topDiagnoses,
    ] = await Promise.all([
      dashboardService.getDashboardStats(user.id),
      dashboardService.getRecentActivity(user.id, 10),
      dashboardService.getRecentConsultations(user.id, 5),
      dashboardService.getConsultationTrends(user.id, 7),
      dashboardService.getPatientDemographics(user.id),
      dashboardService.getTopDiagnoses(user.id, 5),
    ]);

    res.json({
      success: true,
      data: {
        stats,
        activity,
        recentConsultations,
        trends,
        demographics,
        topDiagnoses,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

// Made with Bob