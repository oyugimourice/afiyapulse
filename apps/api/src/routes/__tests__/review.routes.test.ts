import request from 'supertest';
import { createApp } from '../../app';
import { prisma } from '@afiyapulse/database';
import redisClient from '../../config/redis';
import jwt from 'jsonwebtoken';

describe('Review Routes Integration Tests', () => {
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
        email: 'review.test.doctor@afiyapulse.com',
        name: 'Review Test Doctor',
        passwordHash: 'hashedPassword',
        role: 'DOCTOR',
        isActive: true,
      },
    });
    doctorId = doctor.id;

    // Create test patient
    const patient = await prisma.patient.create({
      data: {
        mrn: 'MRN-' + Date.now() + '-REVIEW',
        firstName: 'Review',
        lastName: 'Patient',
        dob: new Date('1987-06-15'),
        gender: 'MALE',
        phone: '+254766666666',
        email: 'review.patient@example.com',
        address: '222 Review Street',
        allergies: [],
      },
    });
    patientId = patient.id;

    // Create test consultation
    const consultation = await prisma.consultation.create({
      data: {
        patientId,
        doctorId,
        status: 'IN_PROGRESS',
      },
    });
    
    // Add transcript
    await prisma.transcript.create({
      data: {
        consultationId: consultation.id,
        text: 'Patient reports chest pain for 2 days. Pain is sharp and intermittent.',
        speaker: 'PATIENT',
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

  describe('POST /api/review/generate-soap', () => {
    it('should generate SOAP note from consultation', async () => {
      const response = await request(app)
        .post('/api/review/generate-soap')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('soapNote');
      expect(response.body.soapNote).toHaveProperty('subjective');
      expect(response.body.soapNote).toHaveProperty('objective');
      expect(response.body.soapNote).toHaveProperty('assessment');
      expect(response.body.soapNote).toHaveProperty('plan');
    });

    it('should reject without authentication', async () => {
      const response = await request(app)
        .post('/api/review/generate-soap')
        .send({
          consultationId,
        });

      expect(response.status).toBe(401);
    });

    it('should reject with invalid consultation ID', async () => {
      const response = await request(app)
        .post('/api/review/generate-soap')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId: 'invalid-id',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/review/generate-prescription', () => {
    it('should generate prescription from consultation', async () => {
      const response = await request(app)
        .post('/api/review/generate-prescription')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
          diagnosis: 'Angina pectoris',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('prescription');
      expect(response.body.prescription).toHaveProperty('medications');
      expect(Array.isArray(response.body.prescription.medications)).toBe(true);
    });
  });

  describe('POST /api/review/generate-referral', () => {
    it('should generate referral letter', async () => {
      const response = await request(app)
        .post('/api/review/generate-referral')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
          specialty: 'Cardiology',
          reason: 'Further evaluation of chest pain',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('referral');
      expect(response.body.referral).toHaveProperty('specialty');
      expect(response.body.referral.specialty).toBe('Cardiology');
    });
  });

  describe('POST /api/review/schedule-followup', () => {
    it('should schedule follow-up appointment', async () => {
      const followUpDate = new Date();
      followUpDate.setDate(followUpDate.getDate() + 7);

      const response = await request(app)
        .post('/api/review/schedule-followup')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
          followUpDate: followUpDate.toISOString(),
          reason: 'Review test results',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('followUp');
      expect(response.body.followUp).toHaveProperty('scheduledDate');
    });
  });

  describe('PATCH /api/review/approve/:consultationId', () => {
    let reviewConsultationId: string;

    beforeEach(async () => {
      const consultation = await prisma.consultation.create({
        data: {
          patientId,
          doctorId,
          status: 'IN_PROGRESS',
        },
      });
      
      // Create SOAP note separately
      await prisma.soapNote.create({
        data: {
          consultationId: consultation.id,
          subjective: 'Test subjective',
          objective: 'Test objective',
          assessment: 'Test assessment',
          plan: 'Test plan',
        },
      });
      reviewConsultationId = consultation.id;
    });

    it('should approve and finalize consultation', async () => {
      const response = await request(app)
        .patch(`/api/review/approve/${reviewConsultationId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          approved: true,
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('COMPLETED');
    });
  });

  describe('GET /api/review/pending', () => {
    it('should list pending consultations for review', async () => {
      const response = await request(app)
        .get('/api/review/pending')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

// Made with Bob