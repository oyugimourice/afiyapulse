import { Router, Request, Response, NextFunction } from 'express';
import { pdfService } from '../services/pdf.service';
import { authenticate } from '../middleware/auth.middleware';
import { AppError } from '../middleware/error.middleware';
import logger from '../config/logger';

const router = Router();

// All PDF routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/pdf/soap-note/:id
 * @desc    Generate PDF for SOAP note
 * @access  Private
 */
router.post('/soap-note/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    logger.info(`Generating SOAP note PDF for ID: ${id}`);

    const result = await pdfService.generateSOAPNotePDF(id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Error generating SOAP note PDF:', error);
    next(error);
  }
});

/**
 * @route   POST /api/pdf/prescription/:id
 * @desc    Generate PDF for prescription
 * @access  Private
 */
router.post('/prescription/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    logger.info(`Generating prescription PDF for ID: ${id}`);

    const result = await pdfService.generatePrescriptionPDF(id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Error generating prescription PDF:', error);
    next(error);
  }
});

/**
 * @route   POST /api/pdf/referral/:id
 * @desc    Generate PDF for referral letter
 * @access  Private
 */
router.post('/referral/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    logger.info(`Generating referral PDF for ID: ${id}`);

    const result = await pdfService.generateReferralPDF(id);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Error generating referral PDF:', error);
    next(error);
  }
});

/**
 * @route   POST /api/pdf/patient-summary/:patientId
 * @desc    Generate comprehensive patient summary PDF
 * @access  Private
 */
router.post('/patient-summary/:patientId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { patientId } = req.params;

    logger.info(`Generating patient summary PDF for patient ID: ${patientId}`);

    const result = await pdfService.generatePatientSummaryPDF(patientId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Error generating patient summary PDF:', error);
    next(error);
  }
});

/**
 * @route   POST /api/pdf/consultation/:consultationId
 * @desc    Generate all PDFs for a consultation (SOAP note, prescription, referral if exists)
 * @access  Private
 */
router.post('/consultation/:consultationId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { consultationId } = req.params;

    logger.info(`Generating all PDFs for consultation ID: ${consultationId}`);

    // Get consultation with related documents
    const { prisma } = await import('@afiyapulse/database');
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
      include: {
        soapNote: true,
        prescription: true,
        referral: true,
      },
    });

    if (!consultation) {
      throw new AppError('Consultation not found', 404);
    }

    const results: any = {};

    // Generate SOAP note PDF if exists
    if (consultation.soapNote) {
      results.soapNote = await pdfService.generateSOAPNotePDF(consultation.soapNote.id);
    }

    // Generate prescription PDF if exists
    if (consultation.prescription) {
      results.prescription = await pdfService.generatePrescriptionPDF(consultation.prescription.id);
    }

    // Generate referral PDF if exists
    if (consultation.referral) {
      results.referral = await pdfService.generateReferralPDF(consultation.referral.id);
    }

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    logger.error('Error generating consultation PDFs:', error);
    next(error);
  }
});

export default router;

// Made with Bob
