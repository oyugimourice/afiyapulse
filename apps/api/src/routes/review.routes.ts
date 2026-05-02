import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import reviewService from '../services/review.service';
import logger from '../config/logger';

/**
 * Review Panel Routes
 * 
 * Provides endpoints for reviewing and approving AI-generated documentation:
 * - Get consultation review summary
 * - Approve/reject SOAP notes
 * - Approve/reject prescriptions
 * - Approve/reject referrals
 * - Approve/reject appointments
 * - Batch approval operations
 * - Get pending reviews
 */

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/review/consultation/:consultationId
 * @desc    Get review summary for a consultation
 * @access  Private (Doctor/Nurse/Admin)
 */
router.get('/consultation/:consultationId', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { consultationId } = req.params;

    const review = await reviewService.getConsultationReview(
      consultationId,
      user.id
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        error: 'Consultation not found',
      });
    }

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/review/soap-note/:id/approve
 * @desc    Approve SOAP note (with optional revisions)
 * @access  Private (Doctor/Admin)
 */
router.post('/soap-note/:id/approve', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { revisions } = req.body;

    // Only doctors and admins can approve
    if (user.role !== 'DOCTOR' && user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Only doctors and admins can approve SOAP notes',
      });
    }

    await reviewService.approveSOAPNote(id, user.id, revisions);

    res.json({
      success: true,
      message: revisions ? 'SOAP note revised and approved' : 'SOAP note approved',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/review/soap-note/:id/reject
 * @desc    Reject SOAP note
 * @access  Private (Doctor/Admin)
 */
router.post('/soap-note/:id/reject', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        error: 'Rejection reason is required',
      });
    }

    // Only doctors and admins can reject
    if (user.role !== 'DOCTOR' && user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Only doctors and admins can reject SOAP notes',
      });
    }

    await reviewService.rejectSOAPNote(id, user.id, reason);

    res.json({
      success: true,
      message: 'SOAP note rejected',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/review/prescription/:id/approve
 * @desc    Approve prescription (with optional revisions)
 * @access  Private (Doctor/Admin)
 */
router.post('/prescription/:id/approve', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { revisions } = req.body;

    // Only doctors and admins can approve
    if (user.role !== 'DOCTOR' && user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Only doctors and admins can approve prescriptions',
      });
    }

    await reviewService.approvePrescription(id, user.id, revisions);

    res.json({
      success: true,
      message: revisions ? 'Prescription revised and approved' : 'Prescription approved',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/review/prescription/:id/reject
 * @desc    Reject prescription
 * @access  Private (Doctor/Admin)
 */
router.post('/prescription/:id/reject', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        error: 'Rejection reason is required',
      });
    }

    // Only doctors and admins can reject
    if (user.role !== 'DOCTOR' && user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Only doctors and admins can reject prescriptions',
      });
    }

    await reviewService.rejectPrescription(id, user.id, reason);

    res.json({
      success: true,
      message: 'Prescription rejected',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/review/referral/:id/approve
 * @desc    Approve referral (with optional revisions)
 * @access  Private (Doctor/Admin)
 */
router.post('/referral/:id/approve', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { revisions } = req.body;

    // Only doctors and admins can approve
    if (user.role !== 'DOCTOR' && user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Only doctors and admins can approve referrals',
      });
    }

    await reviewService.approveReferral(id, user.id, revisions);

    res.json({
      success: true,
      message: revisions ? 'Referral revised and approved' : 'Referral approved',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/review/referral/:id/reject
 * @desc    Reject referral
 * @access  Private (Doctor/Admin)
 */
router.post('/referral/:id/reject', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        error: 'Rejection reason is required',
      });
    }

    // Only doctors and admins can reject
    if (user.role !== 'DOCTOR' && user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Only doctors and admins can reject referrals',
      });
    }

    await reviewService.rejectReferral(id, user.id, reason);

    res.json({
      success: true,
      message: 'Referral rejected',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/review/appointment/:id/approve
 * @desc    Approve appointment (with optional revisions)
 * @access  Private (Doctor/Nurse/Admin)
 */
router.post('/appointment/:id/approve', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { revisions } = req.body;

    await reviewService.approveAppointment(id, user.id, revisions);

    res.json({
      success: true,
      message: revisions ? 'Appointment revised and approved' : 'Appointment approved',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/review/appointment/:id/reject
 * @desc    Reject appointment
 * @access  Private (Doctor/Nurse/Admin)
 */
router.post('/appointment/:id/reject', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        error: 'Rejection reason is required',
      });
    }

    await reviewService.rejectAppointment(id, user.id, reason);

    res.json({
      success: true,
      message: 'Appointment rejected',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/review/consultation/:consultationId/batch-approve
 * @desc    Batch approve all pending items for a consultation
 * @access  Private (Doctor/Admin)
 */
router.post('/consultation/:consultationId/batch-approve', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { consultationId } = req.params;

    // Only doctors and admins can batch approve
    if (user.role !== 'DOCTOR' && user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Only doctors and admins can batch approve',
      });
    }

    const result = await reviewService.batchApproveConsultation(
      consultationId,
      user.id
    );

    res.json({
      success: true,
      message: 'Batch approval completed',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/review/pending
 * @desc    Get pending reviews for the current doctor
 * @access  Private (Doctor/Admin)
 */
router.get('/pending', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { limit } = req.query;

    const reviews = await reviewService.getPendingReviews(
      user.id,
      limit ? parseInt(limit as string) : 10
    );

    res.json({
      success: true,
      data: {
        reviews,
        count: reviews.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/review/stats
 * @desc    Get review statistics for the current doctor
 * @access  Private (Doctor/Admin)
 */
router.get('/stats', async (req, res, next) => {
  try {
    const user = (req as any).user;

    const reviews = await reviewService.getPendingReviews(user.id, 100);

    const stats = {
      totalPending: reviews.reduce((sum, r) => sum + r.pendingItems, 0),
      consultationsWithPending: reviews.length,
      byType: {
        soapNotes: reviews.filter(r => r.items.soapNote && !r.items.soapNote.isApproved).length,
        prescriptions: reviews.filter(r => r.items.prescription && !r.items.prescription.isApproved).length,
        referrals: reviews.filter(r => r.items.referral && !r.items.referral.isApproved).length,
        appointments: reviews.filter(r => r.items.appointment && !r.items.appointment.isApproved).length,
      },
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

// Made with Bob
