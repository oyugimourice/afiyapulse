import request from 'supertest';
import { createApp } from '../app';
import { prisma } from '@afiyapulse/database';
import redisClient from '../config/redis';
import bcrypt from 'bcryptjs';

/**
 * End-to-End Workflow Integration Test
 * 
 * This test simulates a complete consultation workflow:
 * 1. Doctor registration and login
 * 2. Patient creation
 * 3. Consultation creation
 * 4. Consultation completion with SOAP note
 * 5. Document generation (prescription, referral)
 * 6. PDF generation
 * 7. Email delivery
 */
describe('E2E Consultation Workflow', () => {
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
  });

  afterAll(async () => {
    // Cleanup all test data
    if (consultationId) {
      await prisma.consultation.deleteMany({
        where: { id: consultationId },
      });
    }
    if (patientId) {
      await prisma.patient.deleteMany({
        where: { id: patientId },
      });
    }
    if (doctorId) {
      await prisma.user.deleteMany({
        where: { id: doctorId },
      });
    }
    await prisma.$disconnect();
    await redisClient.quit();
    httpServer.close();
  });

  describe('Step 1: Doctor Registration and Authentication', () => {
    it('should register a new doctor', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'e2e.doctor@afiyapulse.com',
          password: 'E2EDoctor123!',
          name: 'Dr. E2E Test',
          role: 'DOCTOR',
          specialty: 'General Practice',
          licenseNumber: 'E2E-TEST-001',
        });

      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty('id');
      doctorId = response.body.user.id;
    });

    it('should login with registered credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'e2e.doctor@afiyapulse.com',
          password: 'E2EDoctor123!',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      authToken = response.body.accessToken;
    });

    it('should get current user profile', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe('e2e.doctor@afiyapulse.com');
      expect(response.body.role).toBe('DOCTOR');
    });
  });

  describe('Step 2: Patient Management', () => {
    it('should create a new patient', async () => {
      const response = await request(app)
        .post('/api/patients')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          firstName: 'E2E',
          lastName: 'Patient',
          dob: '1985-06-20',
          gender: 'MALE',
          phone: '+254788888888',
          email: 'e2e.patient@example.com',
          address: '123 E2E Test Street',
          allergies: ['Penicillin'],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      patientId = response.body.id;
    });

    it('should retrieve patient details', async () => {
      const response = await request(app)
        .get(`/api/patients/${patientId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.firstName).toBe('E2E');
      expect(response.body.lastName).toBe('Patient');
      expect(response.body.allergies).toContain('Penicillin');
      expect(response.body.phone).toBe('+254788888888');
    });

    it('should list all patients', async () => {
      const response = await request(app)
        .get('/api/patients')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.some((p: any) => p.id === patientId)).toBe(true);
    });
  });

  describe('Step 3: Consultation Creation and Recording', () => {
    it('should create a new consultation', async () => {
      const response = await request(app)
        .post('/api/consultations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          patientId,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.status).toBe('IN_PROGRESS');
      consultationId = response.body.id;
    });

    it('should add transcript to consultation', async () => {
      const transcriptText = `
        Doctor: Good morning. What brings you in today?
        Patient: I've been having severe headaches for the past week, and I feel dizzy sometimes.
        Doctor: Can you describe the headache? Is it constant or does it come and go?
        Patient: It comes and goes, but when it hits, it's really bad. The pain is mostly on the right side.
        Doctor: Any nausea or vomiting?
        Patient: Yes, I felt nauseous yesterday.
        Doctor: Let me check your blood pressure. It's 150/95, which is elevated.
        Patient: Is that bad?
        Doctor: It's higher than normal. Given your history of hypertension, we need to adjust your medication.
      `;

      // Add transcript entries
      await prisma.transcript.create({
        data: {
          consultationId,
          text: transcriptText.trim(),
          speaker: 'DOCTOR',
        },
      });

      const transcripts = await prisma.transcript.findMany({
        where: { consultationId },
      });

      expect(transcripts.length).toBeGreaterThan(0);
    });
  });

  describe('Step 4: AI-Generated Documentation', () => {
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

    it('should generate prescription', async () => {
      const response = await request(app)
        .post('/api/review/generate-prescription')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
          diagnosis: 'Hypertensive headache',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('prescription');
      expect(response.body.prescription).toHaveProperty('medications');
      expect(Array.isArray(response.body.prescription.medications)).toBe(true);
    });

    it('should generate referral letter', async () => {
      const response = await request(app)
        .post('/api/review/generate-referral')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
          specialty: 'Neurology',
          reason: 'Persistent headaches requiring specialist evaluation',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('referral');
      expect(response.body.referral.specialty).toBe('Neurology');
    });

    it('should schedule follow-up appointment', async () => {
      const followUpDate = new Date();
      followUpDate.setDate(followUpDate.getDate() + 14);

      const response = await request(app)
        .post('/api/review/schedule-followup')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
          followUpDate: followUpDate.toISOString(),
          reason: 'Review blood pressure and medication effectiveness',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('followUp');
    });
  });

  describe('Step 5: Consultation Completion', () => {
    it('should complete consultation with all documentation', async () => {
      // Create SOAP note
      await prisma.soapNote.create({
        data: {
          consultationId,
          subjective: 'Patient reports severe headaches for 1 week, right-sided, with dizziness and nausea',
          objective: 'BP: 150/95 mmHg, Alert and oriented, No focal neurological deficits',
          assessment: 'Hypertensive headache, Uncontrolled hypertension',
          plan: 'Increase Amlodipine to 10mg daily, Refer to Neurology, Follow-up in 2 weeks',
          isApproved: true,
        },
      });

      const response = await request(app)
        .patch(`/api/consultations/${consultationId}/complete`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('COMPLETED');
    });

    it('should verify consultation is marked as completed', async () => {
      const response = await request(app)
        .get(`/api/consultations/${consultationId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('COMPLETED');
      
      // Verify SOAP note exists
      const soapNote = await prisma.soapNote.findUnique({
        where: { consultationId },
      });
      expect(soapNote).toBeTruthy();
    });
  });

  describe('Step 6: PDF Generation', () => {
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

    it('should generate prescription PDF', async () => {
      const response = await request(app)
        .post('/api/pdf/prescription')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
        });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('application/pdf');
    });

    it('should generate medical certificate', async () => {
      const response = await request(app)
        .post('/api/pdf/medical-certificate')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          consultationId,
          daysOff: 2,
          reason: 'Severe headache requiring rest',
        });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toBe('application/pdf');
    });
  });

  describe('Step 7: Dashboard and Analytics', () => {
    it('should retrieve dashboard statistics', async () => {
      const response = await request(app)
        .get('/api/dashboard/stats')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('totalPatients');
      expect(response.body).toHaveProperty('totalConsultations');
      expect(response.body.totalPatients).toBeGreaterThan(0);
      expect(response.body.totalConsultations).toBeGreaterThan(0);
    });

    it('should retrieve recent activity', async () => {
      const response = await request(app)
        .get('/api/dashboard/recent-activity')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('Step 8: Patient History', () => {
    it('should retrieve patient consultation history', async () => {
      const response = await request(app)
        .get(`/api/patients/${patientId}/consultations`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.some((c: any) => c.id === consultationId)).toBe(true);
    });
  });

  describe('Step 9: Audit Trail', () => {
    it('should have audit logs for all actions', async () => {
      const response = await request(app)
        .get('/api/audit/logs')
        .set('Authorization', `Bearer ${authToken}`)
        .query({
          userId: doctorId,
          limit: 50,
        });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});

// Made with Bob