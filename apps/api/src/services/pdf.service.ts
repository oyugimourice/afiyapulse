import PDFDocument from 'pdfkit';
import { Readable } from 'stream';
import { prisma } from '@afiyapulse/database';
import storageService from './storage.service';
import logger from '../config/logger';

interface PDFGenerationResult {
  pdfUrl: string;
  fileName: string;
  size: number;
}

class PDFService {
  /**
   * Generate PDF for SOAP Note
   */
  async generateSOAPNotePDF(soapNoteId: string): Promise<PDFGenerationResult> {
    try {
      const soapNote = await prisma.sOAPNote.findUnique({
        where: { id: soapNoteId },
        include: {
          consultation: {
            include: {
              patient: true,
              doctor: true,
            },
          },
        },
      });

      if (!soapNote) {
        throw new Error('SOAP note not found');
      }

      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));

      // Header
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .text('SOAP Note', { align: 'center' })
        .moveDown();

      // Patient Information
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Patient Information', { underline: true })
        .moveDown(0.5);

      doc.font('Helvetica').fontSize(10);
      doc.text(`Name: ${soapNote.consultation.patient.firstName} ${soapNote.consultation.patient.lastName}`);
      doc.text(`MRN: ${soapNote.consultation.patient.mrn}`);
      doc.text(`DOB: ${new Date(soapNote.consultation.patient.dob).toLocaleDateString()}`);
      doc.text(`Gender: ${soapNote.consultation.patient.gender}`);
      doc.moveDown();

      // Consultation Information
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Consultation Information', { underline: true })
        .moveDown(0.5);

      doc.font('Helvetica').fontSize(10);
      doc.text(`Date: ${new Date(soapNote.consultation.startedAt).toLocaleString()}`);
      doc.text(`Doctor: ${soapNote.consultation.doctor.name}`);
      if (soapNote.consultation.doctor.specialty) {
        doc.text(`Specialty: ${soapNote.consultation.doctor.specialty}`);
      }
      doc.moveDown();

      // SOAP Sections
      this.addSOAPSection(doc, 'Subjective', soapNote.subjective);
      this.addSOAPSection(doc, 'Objective', soapNote.objective);
      this.addSOAPSection(doc, 'Assessment', soapNote.assessment);
      this.addSOAPSection(doc, 'Plan', soapNote.plan);

      // Footer
      doc.moveDown(2);
      doc.fontSize(8).text(
        `Generated on: ${new Date().toLocaleString()}`,
        { align: 'center' }
      );
      doc.text(`Document ID: ${soapNote.id}`, { align: 'center' });

      // Signature section
      doc.moveDown(2);
      doc.fontSize(10);
      doc.text('_'.repeat(50));
      doc.text(`Dr. ${soapNote.consultation.doctor.name}`);
      if (soapNote.consultation.doctor.licenseNumber) {
        doc.text(`License: ${soapNote.consultation.doctor.licenseNumber}`);
      }

      doc.end();

      return new Promise((resolve, reject) => {
        doc.on('end', async () => {
          try {
            const pdfBuffer = Buffer.concat(chunks);
            const fileName = `soap-note-${soapNoteId}-${Date.now()}.pdf`;
            const pdfUrl = await storageService.uploadFile(
              pdfBuffer,
              fileName,
              'application/pdf'
            );

            resolve({
              pdfUrl,
              fileName,
              size: pdfBuffer.length,
            });
          } catch (error) {
            reject(error);
          }
        });

        doc.on('error', reject);
      });
    } catch (error) {
      logger.error('Error generating SOAP note PDF:', error);
      throw error;
    }
  }

  /**
   * Generate PDF for Prescription
   */
  async generatePrescriptionPDF(prescriptionId: string): Promise<PDFGenerationResult> {
    try {
      const prescription = await prisma.prescription.findUnique({
        where: { id: prescriptionId },
        include: {
          consultation: {
            include: {
              doctor: true,
            },
          },
          patient: true,
        },
      });

      if (!prescription) {
        throw new Error('Prescription not found');
      }

      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));

      // Header with Rx symbol
      doc
        .fontSize(24)
        .font('Helvetica-Bold')
        .text('℞', { align: 'center' })
        .fontSize(18)
        .text('PRESCRIPTION', { align: 'center' })
        .moveDown();

      // Doctor Information
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Prescriber Information', { underline: true })
        .moveDown(0.5);

      doc.font('Helvetica').fontSize(10);
      doc.text(`Dr. ${prescription.consultation.doctor.name}`);
      if (prescription.consultation.doctor.specialty) {
        doc.text(`Specialty: ${prescription.consultation.doctor.specialty}`);
      }
      if (prescription.consultation.doctor.licenseNumber) {
        doc.text(`License Number: ${prescription.consultation.doctor.licenseNumber}`);
      }
      doc.moveDown();

      // Patient Information
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Patient Information', { underline: true })
        .moveDown(0.5);

      doc.font('Helvetica').fontSize(10);
      doc.text(`Name: ${prescription.patient.firstName} ${prescription.patient.lastName}`);
      doc.text(`MRN: ${prescription.patient.mrn}`);
      doc.text(`DOB: ${new Date(prescription.patient.dob).toLocaleDateString()}`);
      doc.text(`Date: ${new Date(prescription.createdAt).toLocaleDateString()}`);
      doc.moveDown();

      // Medications
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Medications', { underline: true })
        .moveDown(0.5);

      const medications = prescription.medications as any[];
      medications.forEach((med, index) => {
        doc.font('Helvetica-Bold').fontSize(11);
        doc.text(`${index + 1}. ${med.name}`);
        
        doc.font('Helvetica').fontSize(10);
        doc.text(`   Dosage: ${med.dosage}`);
        doc.text(`   Frequency: ${med.frequency}`);
        doc.text(`   Duration: ${med.duration}`);
        if (med.instructions) {
          doc.text(`   Instructions: ${med.instructions}`);
        }
        doc.moveDown(0.5);
      });

      // Pharmacy Instructions
      if (prescription.instructions) {
        doc.moveDown();
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('Pharmacy Instructions', { underline: true })
          .moveDown(0.5);

        doc.font('Helvetica').fontSize(10);
        doc.text(prescription.instructions);
      }

      // Footer
      doc.moveDown(2);
      doc.fontSize(8).text(
        `Generated on: ${new Date().toLocaleString()}`,
        { align: 'center' }
      );
      doc.text(`Prescription ID: ${prescription.id}`, { align: 'center' });

      // Signature section
      doc.moveDown(2);
      doc.fontSize(10);
      doc.text('_'.repeat(50));
      doc.text(`Dr. ${prescription.consultation.doctor.name}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);

      doc.end();

      return new Promise((resolve, reject) => {
        doc.on('end', async () => {
          try {
            const pdfBuffer = Buffer.concat(chunks);
            const fileName = `prescription-${prescriptionId}-${Date.now()}.pdf`;
            const pdfUrl = await storageService.uploadFile(
              pdfBuffer,
              fileName,
              'application/pdf'
            );

            resolve({
              pdfUrl,
              fileName,
              size: pdfBuffer.length,
            });
          } catch (error) {
            reject(error);
          }
        });

        doc.on('error', reject);
      });
    } catch (error) {
      logger.error('Error generating prescription PDF:', error);
      throw error;
    }
  }

  /**
   * Generate PDF for Referral Letter
   */
  async generateReferralPDF(referralId: string): Promise<PDFGenerationResult> {
    try {
      const referral = await prisma.referral.findUnique({
        where: { id: referralId },
        include: {
          consultation: {
            include: {
              doctor: true,
            },
          },
          patient: true,
        },
      });

      if (!referral) {
        throw new Error('Referral not found');
      }

      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));

      // Header
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .text('REFERRAL LETTER', { align: 'center' })
        .moveDown();

      // Date
      doc
        .fontSize(10)
        .font('Helvetica')
        .text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' })
        .moveDown();

      // Urgency Badge
      const urgencyColors: Record<string, string> = {
        ROUTINE: 'green',
        URGENT: 'orange',
        EMERGENCY: 'red',
      };

      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor(urgencyColors[referral.urgency] || 'black')
        .text(`Urgency: ${referral.urgency}`, { align: 'right' })
        .fillColor('black')
        .moveDown();

      // Referring Doctor Information
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('From:', { underline: true })
        .moveDown(0.5);

      doc.font('Helvetica').fontSize(10);
      doc.text(`Dr. ${referral.consultation.doctor.name}`);
      if (referral.consultation.doctor.specialty) {
        doc.text(`Specialty: ${referral.consultation.doctor.specialty}`);
      }
      if (referral.consultation.doctor.licenseNumber) {
        doc.text(`License: ${referral.consultation.doctor.licenseNumber}`);
      }
      doc.moveDown();

      // Specialist Information
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('To:', { underline: true })
        .moveDown(0.5);

      doc.font('Helvetica').fontSize(10);
      doc.text(`${referral.specialty} Specialist`);
      doc.moveDown();

      // Patient Information
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Patient Information', { underline: true })
        .moveDown(0.5);

      doc.font('Helvetica').fontSize(10);
      doc.text(`Name: ${referral.patient.firstName} ${referral.patient.lastName}`);
      doc.text(`MRN: ${referral.patient.mrn}`);
      doc.text(`DOB: ${new Date(referral.patient.dob).toLocaleDateString()}`);
      doc.text(`Gender: ${referral.patient.gender}`);
      
      if (referral.patient.allergies && referral.patient.allergies.length > 0) {
        doc.text(`Allergies: ${referral.patient.allergies.join(', ')}`);
      }
      doc.moveDown();

      // Reason for Referral
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Reason for Referral', { underline: true })
        .moveDown(0.5);

      doc.font('Helvetica').fontSize(10);
      doc.text(referral.reason, { align: 'justify' });
      doc.moveDown();

      // Additional Notes
      if (referral.notes) {
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('Additional Notes', { underline: true })
          .moveDown(0.5);

        doc.font('Helvetica').fontSize(10);
        doc.text(referral.notes, { align: 'justify' });
        doc.moveDown();
      }

      // Closing
      doc.moveDown();
      doc.fontSize(10).font('Helvetica');
      doc.text('Thank you for your attention to this matter.');
      doc.moveDown();
      doc.text('Sincerely,');
      doc.moveDown(2);

      // Signature section
      doc.text('_'.repeat(50));
      doc.text(`Dr. ${referral.consultation.doctor.name}`);
      if (referral.consultation.doctor.licenseNumber) {
        doc.text(`License: ${referral.consultation.doctor.licenseNumber}`);
      }
      doc.text(`Date: ${new Date().toLocaleDateString()}`);

      // Footer
      doc.moveDown(2);
      doc.fontSize(8).text(
        `Generated on: ${new Date().toLocaleString()}`,
        { align: 'center' }
      );
      doc.text(`Referral ID: ${referral.id}`, { align: 'center' });

      doc.end();

      return new Promise((resolve, reject) => {
        doc.on('end', async () => {
          try {
            const pdfBuffer = Buffer.concat(chunks);
            const fileName = `referral-${referralId}-${Date.now()}.pdf`;
            const pdfUrl = await storageService.uploadFile(
              pdfBuffer,
              fileName,
              'application/pdf'
            );

            resolve({
              pdfUrl,
              fileName,
              size: pdfBuffer.length,
            });
          } catch (error) {
            reject(error);
          }
        });

        doc.on('error', reject);
      });
    } catch (error) {
      logger.error('Error generating referral PDF:', error);
      throw error;
    }
  }

  /**
   * Generate comprehensive patient summary PDF
   */
  async generatePatientSummaryPDF(patientId: string): Promise<PDFGenerationResult> {
    try {
      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: {
          consultations: {
            include: {
              doctor: true,
              soapNote: true,
            },
            orderBy: { startedAt: 'desc' },
            take: 10,
          },
          prescriptions: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
          referrals: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
        },
      });

      if (!patient) {
        throw new Error('Patient not found');
      }

      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));

      // Header
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .text('PATIENT SUMMARY', { align: 'center' })
        .moveDown();

      // Patient Demographics
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('Patient Demographics', { underline: true })
        .moveDown(0.5);

      doc.font('Helvetica').fontSize(10);
      doc.text(`Name: ${patient.firstName} ${patient.lastName}`);
      doc.text(`MRN: ${patient.mrn}`);
      doc.text(`DOB: ${new Date(patient.dob).toLocaleDateString()}`);
      doc.text(`Age: ${this.calculateAge(patient.dob)} years`);
      doc.text(`Gender: ${patient.gender}`);
      if (patient.phone) doc.text(`Phone: ${patient.phone}`);
      if (patient.email) doc.text(`Email: ${patient.email}`);
      if (patient.address) doc.text(`Address: ${patient.address}`);
      doc.moveDown();

      // Allergies
      if (patient.allergies && patient.allergies.length > 0) {
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .fillColor('red')
          .text('⚠ ALLERGIES', { underline: true })
          .fillColor('black')
          .moveDown(0.5);

        doc.font('Helvetica').fontSize(10);
        patient.allergies.forEach((allergy) => {
          doc.text(`• ${allergy}`);
        });
        doc.moveDown();
      }

      // Recent Consultations
      if (patient.consultations.length > 0) {
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('Recent Consultations', { underline: true })
          .moveDown(0.5);

        patient.consultations.forEach((consultation, index) => {
          doc.font('Helvetica-Bold').fontSize(10);
          doc.text(`${index + 1}. ${new Date(consultation.startedAt).toLocaleDateString()}`);
          
          doc.font('Helvetica').fontSize(9);
          doc.text(`   Doctor: ${consultation.doctor.name}`);
          doc.text(`   Status: ${consultation.status}`);
          if (consultation.soapNote) {
            doc.text(`   Assessment: ${consultation.soapNote.assessment.substring(0, 100)}...`);
          }
          doc.moveDown(0.3);
        });
        doc.moveDown();
      }

      // Active Prescriptions
      if (patient.prescriptions.length > 0) {
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('Recent Prescriptions', { underline: true })
          .moveDown(0.5);

        patient.prescriptions.forEach((prescription, index) => {
          const medications = prescription.medications as any[];
          doc.font('Helvetica-Bold').fontSize(10);
          doc.text(`${index + 1}. ${new Date(prescription.createdAt).toLocaleDateString()}`);
          
          doc.font('Helvetica').fontSize(9);
          medications.forEach((med) => {
            doc.text(`   • ${med.name} - ${med.dosage}`);
          });
          doc.moveDown(0.3);
        });
        doc.moveDown();
      }

      // Recent Referrals
      if (patient.referrals.length > 0) {
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('Recent Referrals', { underline: true })
          .moveDown(0.5);

        patient.referrals.forEach((referral, index) => {
          doc.font('Helvetica-Bold').fontSize(10);
          doc.text(`${index + 1}. ${referral.specialty} - ${referral.urgency}`);
          
          doc.font('Helvetica').fontSize(9);
          doc.text(`   Date: ${new Date(referral.createdAt).toLocaleDateString()}`);
          doc.text(`   Reason: ${referral.reason.substring(0, 100)}...`);
          doc.moveDown(0.3);
        });
      }

      // Footer
      doc.moveDown(2);
      doc.fontSize(8).text(
        `Generated on: ${new Date().toLocaleString()}`,
        { align: 'center' }
      );
      doc.text(`Patient ID: ${patient.id}`, { align: 'center' });

      doc.end();

      return new Promise((resolve, reject) => {
        doc.on('end', async () => {
          try {
            const pdfBuffer = Buffer.concat(chunks);
            const fileName = `patient-summary-${patientId}-${Date.now()}.pdf`;
            const pdfUrl = await storageService.uploadFile(
              pdfBuffer,
              fileName,
              'application/pdf'
            );

            resolve({
              pdfUrl,
              fileName,
              size: pdfBuffer.length,
            });
          } catch (error) {
            reject(error);
          }
        });

        doc.on('error', reject);
      });
    } catch (error) {
      logger.error('Error generating patient summary PDF:', error);
      throw error;
    }
  }

  /**
   * Helper method to add SOAP sections
   */
  private addSOAPSection(doc: PDFKit.PDFDocument, title: string, content: string): void {
    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(title, { underline: true })
      .moveDown(0.5);

    doc.font('Helvetica').fontSize(10);
    doc.text(content, { align: 'justify' });
    doc.moveDown();
  }

  /**
   * Calculate age from date of birth
   */
  private calculateAge(dob: Date): number {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
}

export const pdfService = new PDFService();
