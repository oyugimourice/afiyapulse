import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';
import patientService from '../services/patient.service';
import { AppError } from '../middleware/error.middleware';

const router = Router();

/**
 * @route   POST /api/patients
 * @desc    Create a new patient
 * @access  Private (Doctor, Nurse, Admin)
 */
router.post(
  '/',
  authenticate,
  authorize(['DOCTOR', 'NURSE', 'ADMIN']),
  async (req, res, next) => {
    try {
      const {
        mrn,
        firstName,
        lastName,
        dob,
        gender,
        phone,
        email,
        address,
        allergies,
        medicalHistory,
      } = req.body;

      if (!mrn || !firstName || !lastName || !dob || !gender) {
        throw new AppError(
          'MRN, first name, last name, date of birth, and gender are required',
          400
        );
      }

      const patient = await patientService.createPatient({
        mrn,
        firstName,
        lastName,
        dob: new Date(dob),
        gender,
        phone,
        email,
        address,
        allergies,
        medicalHistory,
      });

      res.status(201).json({
        success: true,
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   GET /api/patients
 * @desc    Search patients
 * @access  Private
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { query, page, limit } = req.query;

    const result = await patientService.searchPatients({
      query: query as string,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });

    res.json({
      success: true,
      data: result.patients,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/patients/:id
 * @desc    Get patient by ID
 * @access  Private
 */
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;

    const patient = await patientService.getPatient(id);

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
 * @desc    Get patient by MRN
 * @access  Private
 */
router.get('/mrn/:mrn', authenticate, async (req, res, next) => {
  try {
    const { mrn } = req.params;

    const patient = await patientService.getPatientByMRN(mrn);

    res.json({
      success: true,
      data: patient,
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
router.patch(
  '/:id',
  authenticate,
  authorize(['DOCTOR', 'NURSE', 'ADMIN']),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        phone,
        email,
        address,
        allergies,
        medicalHistory,
      } = req.body;

      const patient = await patientService.updatePatient(id, {
        firstName,
        lastName,
        phone,
        email,
        address,
        allergies,
        medicalHistory,
      });

      res.json({
        success: true,
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route   GET /api/patients/:id/consultations
 * @desc    Get patient consultation history
 * @access  Private
 */
router.get('/:id/consultations', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page, limit } = req.query;

    const result = await patientService.getConsultationHistory(id, {
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    });

    res.json({
      success: true,
      data: result.consultations,
      pagination: result.pagination,
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
router.delete(
  '/:id',
  authenticate,
  authorize(['ADMIN']),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      await patientService.deletePatient(id);

      res.json({
        success: true,
        message: 'Patient deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

// Made with Bob
