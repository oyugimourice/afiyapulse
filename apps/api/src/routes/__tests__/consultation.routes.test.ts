import request from 'supertest';
import { createApp } from '../../app';
import { prisma } from '@afiyapulse/database';
import redisClient from '../../config/redis';
import jwt from 'jsonwebtoken';

describe('Consultation Routes Integration Tests', () => {
  let app: any;
  let httpServer: any;
  let authToken: string;
  let doctorId: string;
  let patientId: string;

  beforeAll(async () => {
    const appInstance = createApp();
    app = appInstance.app;
    httpServer = appInstance.httpServer;

    // Create test doctor
    const doctor = await prisma.user.create({
      data: {
        email: 'test.doctor@afiyapulse.com',
        name: 'Test Doctor',
        passwordHash: 'hashedPassword',
        role: 'DOCTOR',
        isActive: true,
      },
    });
    doctorId = doctor.id;

    // Create test patient
    const patient = await prisma.patient.create({
      data: {
        mrn: 'MRN-' + Date.now() + '-CONSULT',
        firstName: 'John',
        lastName: 'Doe',
        dob: new Date('1990-01-01'),
        gender: 'MALE',
        phone: '+254700000000',
        email: 'john.doe@example.com',
        address: '123 Test Street',
        allergies: [],
      },
    });
    patientId = patient.id;

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

  describe('POST /api/consultations', () => {
    it('should create a new consultation', async () => {
      const response = await request(app)
        .post('/api/consultations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          patientId,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.patientId).toBe(patientId);
      expect(response.body.doctorId).toBe(doctorId);
      expect(response.body.status).toBe('IN_PROGRESS');
    });

    it('should reject consultation without authentication', async () => {
      const response = await request(app)
        .post('/api/consultations')
        .send({
          patientId,
        });

      expect(response.status).toBe(401);
    });

    it('should reject consultation with invalid patient ID', async () => {
      const response = await request(app)
        .post('/api/consultations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          patientId: 'invalid-id',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/consultations', () => {
    let consultationId: string;

    beforeAll(async () => {
      const consultation = await prisma.consultation.create({
        data: {
          patientId,
          doctorId,
          status: 'IN_PROGRESS',
        },
      });
      consultationId = consultation.id;
    });

    it('should list consultations for authenticated doctor', async () => {
      const response = await request(app)
        .get('/api/consultations')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get specific consultation by ID', async () => {
      const response = await request(app)
        .get(`/api/consultations/${consultationId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(consultationId);
      expect(response.body.patientId).toBe(patientId);
    });
  });

  describe('PATCH /api/consultations/:id/complete', () => {
    let consultationId: string;

    beforeEach(async () => {
      const consultation = await prisma.consultation.create({
        data: {
          patientId,
          doctorId,
          status: 'IN_PROGRESS',
        },
      });
      consultationId = consultation.id;
    });

    it('should complete a consultation', async () => {
      // Create SOAP note separately
      await prisma.soapNote.create({
        data: {
          consultationId,
          subjective: 'Patient reports headache',
          objective: 'BP: 120/80, Temp: 37.5C',
          assessment: 'Tension headache',
          plan: 'Rest and hydration',
        },
      });

      const response = await request(app)
        .patch(`/api/consultations/${consultationId}/complete`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('COMPLETED');
    });
  });
});

// 