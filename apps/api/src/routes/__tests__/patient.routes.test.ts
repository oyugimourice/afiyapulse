import request from 'supertest';
import { createApp } from '../../app';
import { prisma } from '@afiyapulse/database';
import redisClient from '../../config/redis';
import jwt from 'jsonwebtoken';

describe('Patient Routes Integration Tests', () => {
  let app: any;
  let httpServer: any;
  let authToken: string;
  let doctorId: string;

  beforeAll(async () => {
    const appInstance = createApp();
    app = appInstance.app;
    httpServer = appInstance.httpServer;

    // Create test doctor
    const doctor = await prisma.user.create({
      data: {
        email: 'patient.test.doctor@afiyapulse.com',
        name: 'Patient Test Doctor',
        passwordHash: 'hashedPassword',
        role: 'DOCTOR',
        isActive: true,
      },
    });
    doctorId = doctor.id;

    // Generate auth token
    authToken = jwt.sign(
      { id: doctorId, email: doctor.email, role: 'DOCTOR' },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    // Cleanup test data
    await prisma.patient.deleteMany({
      where: { email: { contains: 'patient.test' } },
    });
    await prisma.user.deleteMany({
      where: { id: doctorId },
    });
    await prisma.$disconnect();
    await redisClient.quit();
    httpServer.close();
  });

  describe('POST /api/patients', () => {
    it('should create a new patient', async () => {
      const response = await request(app)
        .post('/api/patients')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          firstName: 'Jane',
          lastName: 'Smith',
          dob: '1985-05-15',
          gender: 'FEMALE',
          phone: '+254711111111',
          email: 'patient.test.jane@example.com',
          address: '456 Test Avenue',
          allergies: ['Penicillin'],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.firstName).toBe('Jane');
      expect(response.body.lastName).toBe('Smith');
      expect(response.body.email).toBe('patient.test.jane@example.com');
    });

    it('should reject patient creation without authentication', async () => {
      const response = await request(app)
        .post('/api/patients')
        .send({
          firstName: 'Test',
          lastName: 'Patient',
          dateOfBirth: '1990-01-01',
          gender: 'MALE',
        });

      expect(response.status).toBe(401);
    });

    it('should reject patient with invalid email', async () => {
      const response = await request(app)
        .post('/api/patients')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          firstName: 'Test',
          lastName: 'Patient',
          dateOfBirth: '1990-01-01',
          gender: 'MALE',
          email: 'invalid-email',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/patients', () => {
    let patientId: string;

    beforeAll(async () => {
      const patient = await prisma.patient.create({
        data: {
          mrn: 'MRN-' + Date.now() + '-LIST',
          firstName: 'List',
          lastName: 'Test',
          dob: new Date('1992-03-20'),
          gender: 'MALE',
          phone: '+254722222222',
          email: 'patient.test.list@example.com',
          address: '789 Test Road',
          allergies: [],
        },
      });
      patientId = patient.id;
    });

    it('should list all patients', async () => {
      const response = await request(app)
        .get('/api/patients')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get specific patient by ID', async () => {
      const response = await request(app)
        .get(`/api/patients/${patientId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(patientId);
      expect(response.body.firstName).toBe('List');
      expect(response.body.lastName).toBe('Test');
    });

    it('should search patients by name', async () => {
      const response = await request(app)
        .get('/api/patients?search=List')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.some((p: any) => p.firstName === 'List')).toBe(true);
    });
  });

  describe('PATCH /api/patients/:id', () => {
    let patientId: string;

    beforeAll(async () => {
      const patient = await prisma.patient.create({
        data: {
          mrn: 'MRN-' + Date.now() + '-UPDATE',
          firstName: 'Update',
          lastName: 'Test',
          dob: new Date('1988-07-10'),
          gender: 'FEMALE',
          phone: '+254733333333',
          email: 'patient.test.update@example.com',
          address: '321 Test Lane',
          allergies: [],
        },
      });
      patientId = patient.id;
    });

    it('should update patient information', async () => {
      const response = await request(app)
        .patch(`/api/patients/${patientId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          phone: '+254744444444',
          address: '999 Updated Street',
        });

      expect(response.status).toBe(200);
      expect(response.body.phone).toBe('+254744444444');
      expect(response.body.address).toBe('999 Updated Street');
    });
  });

  describe('GET /api/patients/:id/consultations', () => {
    let patientId: string;
    let consultationId: string;

    beforeAll(async () => {
      const patient = await prisma.patient.create({
        data: {
          mrn: 'MRN-' + Date.now() + '-CONSULT',
          firstName: 'Consultation',
          lastName: 'Test',
          dob: new Date('1995-11-25'),
          gender: 'MALE',
          phone: '+254755555555',
          email: 'patient.test.consultation@example.com',
          address: '111 Test Boulevard',
          allergies: [],
        },
      });
      patientId = patient.id;

      const consultation = await prisma.consultation.create({
        data: {
          patientId,
          doctorId,
          status: 'COMPLETED',
        },
      });
      consultationId = consultation.id;
    });

    it('should get patient consultation history', async () => {
      const response = await request(app)
        .get(`/api/patients/${patientId}/consultations`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].patientId).toBe(patientId);
    });
  });
});

// Made with Bob