import { Router } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

// All patient routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/patients
 * @desc    Create a new patient
 * @access  Private (Doctor, Nurse, Admin)
 */
router.post('/', authorize(UserRole.DOCTOR, UserRole.NURSE, UserRole.ADMIN), async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement patient creation
    res.status(501).json({
      success: false,
      message: 'Patient creation not yet implemented',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/patients
 * @desc    List patients with search and pagination
 * @access  Private
 */
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement patient listing
    res.status(501).json({
      success: false,
      message: 'Patient listing not yet implemented',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/patients/:id
 * @desc    Get patient details
 * @access  Private
 */
router.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement get patient
    res.status(501).json({
      success: false,
      message: 'Get patient not yet implemented',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PATCH /api/patients/:id
 * @desc    Update patient
 * @access  Private (Doctor, Nurse, Admin)
 */
router.patch('/:id', authorize(UserRole.DOCTOR, UserRole.NURSE, UserRole.ADMIN), async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement patient update
    res.status(501).json({
      success: false,
      message: 'Patient update not yet implemented',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/patients/:id/history
 * @desc    Get patient medical history
 * @access  Private
 */
router.get('/:id/history', async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement patient history
    res.status(501).json({
      success: false,
      message: 'Patient history not yet implemented',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

// Made with Bob
