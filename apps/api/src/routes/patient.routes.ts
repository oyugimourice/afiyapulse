import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { patientCacheMiddleware } from '../middleware/cache.middleware';
import patientService from '../services/patient.service';
import { Gender } from '@afiyapulse/database';
import logger from '../config/logger';

/**
 * Patient Management Routes
 * 
 * Provides comprehensive patient CRUD operations with:
 * - Patient creation and registration
 * - Patient search and filtering
 * - Patient profile management
 * - Medical history access
 * - Patient statistics
 */

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/patients
 * @desc    Create a new patient
 * @access  Private (Doctor/Nurse/Admin)
 */
router.post('/', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { firstName, lastName, dob, gender, phone, email, address, allergies } = req.body;

    // Validation
    if (!firstName || !lastName || !dob || !gender) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: firstName, lastName, dob, gender',
      });
    }

    if (!Object.values(Gender).includes(gender)) {
      return res.status(400).json({
        success: false,
        error: `Invalid gender. Must be one of: ${Object.values(Gender).join(', ')}`,
      });
    }

    const patient = await patientService.createPatient(
      {
        firstName,
        lastName,
        dob: new Date(dob),
        gender,
        phone,
        email,
        address,
        allergies: allergies || [],
      },
      user.id
    );

    res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/patients/search
 * @desc    Search and filter patients
 * @access  Private (Doctor/Nurse/Admin)
 */
router.get('/search', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const {
      search,
      gender,
      minAge,
      maxAge,
      hasAllergies,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.query;

    const result = await patientService.searchPatients(
      {
        search: search as string,
        gender: gender as Gender,
        minAge: minAge ? parseInt(minAge as string) : undefined,
        maxAge: maxAge ? parseInt(maxAge as string) : undefined,
        hasAllergies: hasAllergies === 'true',
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 20,
        sortBy: sortBy as any,
        sortOrder: sortOrder as any,
      },
      user.id
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/patients/:id
 * @desc    Get patient by ID
 * @access  Private (Doctor/Nurse/Admin)
 */
router.get('/:id', patientCacheMiddleware, async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const patient = await patientService.getPatientById(id, user.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found',
      });
    }

    res.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/patients/mrn/:mrn
 * @desc    Get patient by Medical Record Number
 * @access  Private (Doctor/Nurse/Admin)
 */
router.get('/mrn/:mrn', patientCacheMiddleware, async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { mrn } = req.params;

    const patient = await patientService.getPatientByMRN(mrn, user.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found',
      });
    }

    res.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   PUT /api/patients/:id
 * @desc    Update patient information
 * @access  Private (Doctor/Nurse/Admin)
 */
router.put('/:id', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { firstName, lastName, dob, gender, phone, email, address, allergies } = req.body;

    // Validate gender if provided
    if (gender && !Object.values(Gender).includes(gender)) {
      return res.status(400).json({
        success: false,
        error: `Invalid gender. Must be one of: ${Object.values(Gender).join(', ')}`,
      });
    }

    const patient = await patientService.updatePatient(
      id,
      {
        firstName,
        lastName,
        dob: dob ? new Date(dob) : undefined,
        gender,
        phone,
        email,
        address,
        allergies,
      },
      user.id
    );

    res.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/patients/:id
 * @desc    Delete patient
 * @access  Private (Admin only)
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    // Only admins can delete patients
    if (user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required to delete patients',
      });
    }

    await patientService.deletePatient(id, user.id);

    res.json({
      success: true,
      message: 'Patient deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/patients/:id/history
 * @desc    Get patient medical history
 * @access  Private (Doctor/Nurse/Admin)
 */
router.get('/:id/history', async (req, res, next) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const history = await patientService.getPatientHistory(id, user.id);

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/patients/:id/stats
 * @desc    Get patient statistics
 * @access  Private (Doctor/Nurse/Admin)
 */
router.get('/:id/stats', async (req, res, next) => {
  try {
    const { id } = req.params;

    const stats = await patientService.getPatientStats(id);

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/patients
 * @desc    Get all patients (paginated)
 * @access  Private (Doctor/Nurse/Admin)
 */
router.get('/', patientCacheMiddleware, async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const result = await patientService.getAllPatients(
      page ? parseInt(page as string) : 1,
      limit ? parseInt(limit as string) : 50
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

// Made with Bob
