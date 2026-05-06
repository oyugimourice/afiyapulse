import request from 'supertest';
import { createApp } from '../../app';
import { prisma } from '@afiyapulse/database';
import redisClient from '../../config/redis';
import jwt from 'jsonwebtoken';

describe('PDF Routes Integration Tests', () => {
  let app: any;
  let httpServer: any;
  let authToken: string;
  let doctorId: string;
  let patientId: string;
  let consultationId: string;

  beforeAll(async () => {
    const appInstance = createApp();
    app = appInstance.app;
    httpServer = appInstance.httpServer;

    // Create test doctor
    const doctor = await prisma.user.create({
      data: {
        email: 'pdf.test.doctor@afiyapulse.com',
        name: 'PDF Test Doctor',
        passwordHash: 'hashedPassword',
        role: 'DOCTOR',
        isActive: true,
        specialty: 'General Practice',
        licenseNumber: 'PDF-TEST-001',
      },
    });
    doctorId = doctor.id;

    // Create test patient
    const patient = await prisma.patient.create({
      data: {
        mrn: 'MRN-' + Date.now() + '-PDF',
        firstName: 'PDF',
        lastName: 'Patient',
        dob: new Date('1980-03-10'),
        gender: 'FEMALE',
        phone: '+254777777777',
        email: 'pdf.patient@example.com',
        address: '333 PDF Street',
        allergies: [],
      },
    });
    patientId = patient.id;

    // Create test consultation with complete data
    const consultation = await prisma.consultation.create({
      data: {
        patientId,
        doctorId,
        status: 'COMPLETED',
        endedAt: new Date(),
      },
    });
    
    // Add transcript
    await prisma.transcript.create({
      data: {
        consultationId: consultation.id,
        text: 'Patient reports persistent cough for 3 weeks.',
        speaker: 'PATIENT',
      },
    });
    
    // Create SOAP note
    await prisma.soapNote.create({
      data: {
        consultationId: consultation.id,
        subjective: 'Patient reports persistent dry cough for 3 weeks, worse at night',
        objective: 'Temp: 37.2C, BP: 118/76, Chest clear on auscultation',
        assessment: 'Upper respiratory tract infection, likely viral',
        plan: 'Symptomatic treatment, rest, fluids. Follow up if symptoms persist beyond 1 week',
        isApproved: true,
      },
    });
    
    // Create prescription
    await prisma.prescription.create({
      data: {
        consultationId: consultation.id,
        patientId,
        medications: {
          drugs: [
            {
              name: 'Dextromethorphan',
              dosage: '10mg',
              frequency: 'Every 6 hours',
              duration: '7 days',
              instructions: 'Take with water, avoid alcohol',
            },
          ],
        },
        instructions: 'Complete the full course',
        isApproved: true,
      },
    });
    consultationId = consultation.id;

    // Generate auth token
    authToken = jwt.sign(
      { id: doctorId, email: doctor.email, role: 'DOCTOR' },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    // Cleanup test data
    await prisma.consultation.deleteMany({
      where: { doctorId },
    });
    await prisma.patient.deleteMany({
      where: { id: patientId },
    });
    await prisma.user.deleteMany({
      where: { id: doctorId },
    });
    await prisma.$disconnect();
    await redisClient.quit();
    httpServer.close();
  });

  describe('POST /api/pdf/soap-note', () => {
    it('should generate SOAP note PDF', async () => {
      const response = await request(app)
        .post('/api/pdf/soap-note')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
        });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('application/pdf');
      expect(response.body).toBeInstanceOf(Buffer);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should reject without authentication', async () => {
      const response = await request(app)
        .post('/api/pdf/soap-note')
        .send({
          consultationId,
        });

      expect(response.status).toBe(401);
    });

    it('should reject with invalid consultation ID', async () => {
      const response = await request(app)
        .post('/api/pdf/soap-note')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId: 'invalid-id',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/pdf/prescription', () => {
    it('should generate prescription PDF', async () => {
      const response = await request(app)
        .post('/api/pdf/prescription')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
        });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('application/pdf');
      expect(response.body).toBeInstanceOf(Buffer);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should reject consultation without prescription', async () => {
      // Create consultation without prescription
      const noPrescConsultation = await prisma.consultation.create({
        data: {
          patientId,
          doctorId,
          status: 'COMPLETED',
        },
      });

      const response = await request(app)
        .post('/api/pdf/prescription')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId: noPrescConsultation.id,
        });

      expect(response.status).toBe(400);

      // Cleanup
      await prisma.consultation.delete({
        where: { id: noPrescConsultation.id },
      });
    });
  });

  describe('POST /api/pdf/referral', () => {
    let referralConsultationId: string;

    beforeAll(async () => {
      const consultation = await prisma.consultation.create({
        data: {
          patientId,
          doctorId,
          status: 'COMPLETED',
        },
      });
      
      // Create referral
      await prisma.referral.create({
        data: {
          consultationId: consultation.id,
          patientId,
          specialty: 'Cardiology',
          reason: 'Evaluation of chest pain',
          urgency: 'ROUTINE',
          notes: 'Patient requires specialist evaluation',
          isApproved: true,
        },
      });
      referralConsultationId = consultation.id;
    });

    it('should generate referral letter PDF', async () => {
      const response = await request(app)
        .post('/api/pdf/referral')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId: referralConsultationId,
        });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('application/pdf');
      expect(response.body).toBeInstanceOf(Buffer);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/pdf/medical-certificate', () => {
    it('should generate medical certificate PDF', async () => {
      const response = await request(app)
        .post('/api/pdf/medical-certificate')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
          daysOff: 3,
          reason: 'Upper respiratory tract infection',
        });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('application/pdf');
      expect(response.body).toBeInstanceOf(Buffer);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should validate days off parameter', async () => {
      const response = await request(app)
        .post('/api/pdf/medical-certificate')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
          daysOff: -1,
          reason: 'Test',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/pdf/email', () => {
    it('should email PDF documents', async () => {
      const response = await request(app)
        .post('/api/pdf/email')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
          documentType: 'soap-note',
          recipientEmail: 'pdf.patient@example.com',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('sent');
    });

    it('should validate email address', async () => {
      const response = await request(app)
        .post('/api/pdf/email')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
          documentType: 'soap-note',
          recipientEmail: 'invalid-email',
        });

      expect(response.status).toBe(400);
    });
  });
});

// 