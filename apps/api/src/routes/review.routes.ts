import { Router } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.middleware';
import { UserRole } from '@afiyapulse/database';

const router = Router();

// All review routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/review/consultations/:consultationId
 * @desc    Get all documents for review for a consultation
 * @access  Private (Doctor, Nurse)
 */
router.get('/consultations/:consultationId', authorize(UserRole.DOCTOR, UserRole.NURSE), async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement get documents for review
    res.status(501).json({
      success: false,
      message: 'Get review documents not yet implemented',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/review/approve
 * @desc    Approve a document
 * @access  Private (Doctor, Nurse)
 */
router.post('/approve', authorize(UserRole.DOCTOR, UserRole.NURSE), async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement document approval
    res.status(501).json({
      success: false,
      message: 'Document approval not yet implemented',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/review/reject
 * @desc    Reject a document
 * @access  Private (Doctor, Nurse)
 */
router.post('/reject', authorize(UserRole.DOCTOR, UserRole.NURSE), async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement document rejection
    res.status(501).json({
      success: false,
      message: 'Document rejection not yet implemented',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PATCH /api/review/update
 * @desc    Update a document before approval
 * @access  Private (Doctor, Nurse)
 */
router.patch('/update', authorize(UserRole.DOCTOR, UserRole.NURSE), async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement document update
    res.status(501).json({
      success: false,
      message: 'Document update not yet implemented',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

// Made with Bob
