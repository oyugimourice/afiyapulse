# AfiyaPulse Testing Guide

## Overview

This document provides comprehensive testing instructions for the AfiyaPulse application, including unit tests, integration tests, and end-to-end workflow tests.

## Test Structure

```
apps/api/src/
├── __tests__/
│   └── e2e-workflow.test.ts          # End-to-end workflow tests
├── routes/__tests__/
│   ├── auth.routes.test.ts           # Authentication endpoint tests
│   ├── consultation.routes.test.ts   # Consultation endpoint tests
│   ├── health.routes.test.ts         # Health check endpoint tests
│   ├── patient.routes.test.ts        # Patient management tests
│   ├── pdf.routes.test.ts            # PDF generation tests
│   └── review.routes.test.ts         # Review and approval tests
└── services/__tests__/
    └── auth.service.test.ts          # Authentication service tests
```

## Prerequisites

### 1. Environment Setup

Create a `.env.test` file with test-specific configurations:

```bash
# Test Database
TEST_DATABASE_URL=postgresql://test:test@localhost:5432/afiyapulse_test
DATABASE_URL=postgresql://test:test@localhost:5432/afiyapulse_test

# Test Redis
TEST_REDIS_URL=redis://localhost:6379/1
REDIS_URL=redis://localhost:6379/1

# JWT Configuration
JWT_SECRET=test-jwt-secret-key-for-testing-only
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
SESSION_SECRET=test-session-secret

# Logging
LOG_LEVEL=error
NODE_ENV=test
```

### 2. Test Database Setup

```bash
# Create test database
createdb afiyapulse_test

# Run migrations
npm run db:migrate

# Optional: Seed test data
npm run db:seed
```

### 3. Install Dependencies

```bash
npm install
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Run Specific Test Suites

```bash
# Health check tests
npm test -- --testPathPattern="health.routes.test"

# Authentication tests
npm test -- --testPathPattern="auth.routes.test"

# Consultation workflow tests
npm test -- --testPathPattern="consultation.routes.test"

# Patient management tests
npm test -- --testPathPattern="patient.routes.test"

# Review and approval tests
npm test -- --testPathPattern="review.routes.test"

# PDF generation tests
npm test -- --testPathPattern="pdf.routes.test"

# End-to-end workflow tests
npm test -- --testPathPattern="e2e-workflow.test"
```

### Run Tests for CI/CD

```bash
npm run test:ci
```

## Test Coverage

### Current Coverage Targets

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

### View Coverage Report

After running tests with coverage:

```bash
# Open HTML coverage report
open coverage/lcov-report/index.html
```

## Test Suites Description

### 1. Health Routes Tests (`health.routes.test.ts`)

Tests system health and readiness endpoints:

- ✅ Health check endpoint
- ✅ Readiness probe
- ✅ Liveness probe
- ✅ Metrics endpoint
- ✅ Database connectivity
- ✅ Redis connectivity

**Run**: `npm test -- health.routes.test`

### 2. Authentication Tests (`auth.routes.test.ts`)

Tests user authentication and authorization:

- ✅ User registration (Doctor, Admin)
- ✅ Login with valid credentials
- ✅ Login with invalid credentials
- ✅ Password validation
- ✅ Token refresh
- ✅ Logout functionality
- ✅ Get current user profile
- ✅ Inactive account handling

**Run**: `npm test -- auth.routes.test`

### 3. Patient Management Tests (`patient.routes.test.ts`)

Tests patient CRUD operations:

- ✅ Create new patient
- ✅ List all patients
- ✅ Get patient by ID
- ✅ Update patient information
- ✅ Search patients by name
- ✅ Get patient consultation history
- ✅ Input validation
- ✅ Authorization checks

**Run**: `npm test -- patient.routes.test`

### 4. Consultation Tests (`consultation.routes.test.ts`)

Tests consultation workflow:

- ✅ Create new consultation
- ✅ List consultations
- ✅ Get consultation by ID
- ✅ Update consultation transcript
- ✅ Complete consultation
- ✅ Authorization checks
- ✅ Invalid input handling

**Run**: `npm test -- consultation.routes.test`

### 5. Review and Approval Tests (`review.routes.test.ts`)

Tests AI-generated document review:

- ✅ Generate SOAP note
- ✅ Generate prescription
- ✅ Generate referral letter
- ✅ Schedule follow-up appointment
- ✅ Approve and finalize consultation
- ✅ List pending consultations
- ✅ Authorization checks

**Run**: `npm test -- review.routes.test`

### 6. PDF Generation Tests (`pdf.routes.test.ts`)

Tests document generation:

- ✅ Generate SOAP note PDF
- ✅ Generate prescription PDF
- ✅ Generate referral letter PDF
- ✅ Generate medical certificate
- ✅ Email PDF documents
- ✅ Input validation
- ✅ Authorization checks

**Run**: `npm test -- pdf.routes.test`

### 7. End-to-End Workflow Tests (`e2e-workflow.test.ts`)

Tests complete consultation workflow:

1. ✅ Doctor registration and login
2. ✅ Patient creation
3. ✅ Consultation creation
4. ✅ Transcript recording
5. ✅ SOAP note generation
6. ✅ Prescription generation
7. ✅ Referral generation
8. ✅ Follow-up scheduling
9. ✅ Consultation completion
10. ✅ PDF generation
11. ✅ Dashboard statistics
12. ✅ Audit trail verification

**Run**: `npm test -- e2e-workflow.test`

## Manual Testing Checklist

### Authentication Flow

- [ ] Register new doctor account
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Refresh access token
- [ ] Logout
- [ ] Access protected routes without token

### Patient Management

- [ ] Create new patient with all fields
- [ ] Create patient with minimal required fields
- [ ] View patient list
- [ ] Search for patients
- [ ] View patient details
- [ ] Update patient information
- [ ] View patient consultation history

### Consultation Workflow

- [ ] Start new consultation
- [ ] Record audio (if Watson STT configured)
- [ ] View real-time transcript
- [ ] See agent status updates
- [ ] Review generated SOAP note
- [ ] Edit SOAP note if needed
- [ ] Review generated prescription
- [ ] Edit prescription if needed
- [ ] Review referral letter
- [ ] Schedule follow-up
- [ ] Complete consultation
- [ ] Generate PDF documents
- [ ] Email documents to patient

### Dashboard

- [ ] View statistics (patients, consultations)
- [ ] View recent activity
- [ ] View consultation charts
- [ ] Access quick actions

### Role-Based Access Control

- [ ] Admin can access all features
- [ ] Doctor can access patient and consultation features
- [ ] Unauthorized users cannot access protected routes

## WebSocket Testing

### Manual WebSocket Testing

1. Open browser console
2. Connect to WebSocket server:

```javascript
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected to WebSocket');
  
  // Join consultation room
  ws.send(JSON.stringify({
    type: 'join_consultation',
    consultationId: 'your-consultation-id'
  }));
};

ws.onmessage = (event) => {
  console.log('Received:', JSON.parse(event.data));
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket');
};
```

### Expected WebSocket Events

- `transcript_update`: Real-time transcript updates
- `agent_status`: Agent processing status
- `document_generated`: Document generation completion
- `error`: Error notifications

## Performance Testing

### Load Testing with Artillery

Install Artillery:

```bash
npm install -g artillery
```

Create `load-test.yml`:

```yaml
config:
  target: 'http://localhost:8080'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: 'Health Check'
    flow:
      - get:
          url: '/health'
```

Run load test:

```bash
artillery run load-test.yml
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Errors

```bash
# Check if PostgreSQL is running
pg_isready

# Verify database exists
psql -l | grep afiyapulse_test

# Reset test database
npm run db:reset
```

#### 2. Redis Connection Errors

```bash
# Check if Redis is running
redis-cli ping

# Should return: PONG
```

#### 3. Test Timeouts

Increase timeout in `jest.config.js`:

```javascript
module.exports = {
  testTimeout: 60000, // 60 seconds
  // ... other config
};
```

#### 4. Port Already in Use

```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

### Debug Mode

Run tests with debug output:

```bash
DEBUG=* npm test
```

## Continuous Integration

### GitHub Actions

Tests run automatically on:

- Push to `main` branch
- Pull requests
- Manual workflow dispatch

View test results in GitHub Actions tab.

### Pre-commit Hooks

Install pre-commit hooks:

```bash
npm install -D husky lint-staged

# Setup husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm test"
```

## Best Practices

### Writing Tests

1. **Follow AAA Pattern**: Arrange, Act, Assert
2. **Use Descriptive Names**: Test names should describe what they test
3. **Test One Thing**: Each test should verify one behavior
4. **Clean Up**: Always clean up test data in `afterAll` or `afterEach`
5. **Mock External Services**: Don't rely on external APIs in tests
6. **Use Test Fixtures**: Create reusable test data helpers

### Example Test Structure

```typescript
describe('Feature Name', () => {
  // Setup
  beforeAll(async () => {
    // Initialize test environment
  });

  afterAll(async () => {
    // Clean up test data
  });

  describe('Specific Functionality', () => {
    it('should do something specific', async () => {
      // Arrange
      const testData = createTestData();

      // Act
      const result = await performAction(testData);

      // Assert
      expect(result).toBe(expectedValue);
    });
  });
});
```

## Test Data Management

### Creating Test Users

```typescript
const createTestDoctor = async () => {
  const passwordHash = await bcrypt.hash('TestPass123!', 10);
  return await prisma.user.create({
    data: {
      email: 'test.doctor@example.com',
      name: 'Test Doctor',
      passwordHash,
      role: 'DOCTOR',
      isActive: true,
    },
  });
};
```

### Creating Test Patients

```typescript
const createTestPatient = async () => {
  return await prisma.patient.create({
    data: {
      firstName: 'Test',
      lastName: 'Patient',
      dateOfBirth: new Date('1990-01-01'),
      gender: 'MALE',
      phoneNumber: '+254700000000',
      email: 'test.patient@example.com',
      address: '123 Test Street',
      city: 'Nairobi',
      country: 'Kenya',
    },
  });
};
```

## Coverage Reports

### Viewing Coverage

```bash
# Generate coverage report
npm run test:coverage

# Open in browser
open coverage/lcov-report/index.html
```

### Coverage Thresholds

Configure in `jest.config.js`:

```javascript
module.exports = {
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
};
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://testingjavascript.com/)
- [Prisma Testing Guide](https://www.prisma.io/docs/guides/testing)

## Test Data Creation Guide

### Schema Field Mappings

#### Patient Model

**Correct Fields:**
```typescript
{
  mrn: string          // Medical Record Number (required, unique)
  firstName: string
  lastName: string
  dob: DateTime        // NOT dateOfBirth
  gender: Gender       // MALE | FEMALE | OTHER | UNKNOWN
  phone: string?       // NOT phoneNumber (optional)
  email: string?       // optional
  address: string?     // optional
  allergies: string[]  // array of strings
}
```

**Example:**
```typescript
await prisma.patient.create({
  data: {
    mrn: 'MRN-' + Date.now(),
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date('1990-01-01'),
    gender: 'MALE',
    phone: '+254700000000',
    email: 'john@example.com',
    address: '123 Test Street',
    allergies: ['Penicillin'],
  },
});
```

#### Consultation Model

**Correct Fields:**
```typescript
{
  patientId: string
  doctorId: string
  startedAt: DateTime  // auto-set to now()
  endedAt: DateTime?
  status: ConsultationStatus  // IN_PROGRESS | COMPLETED | CANCELLED | PENDING_REVIEW
  audioUrl: string?
  duration: number?
}
```

**Important:** Consultation does NOT have these fields directly:
- ❌ `chiefComplaint`
- ❌ `type`
- ❌ `transcript`
- ❌ `diagnosis`
- ❌ `soapNote` (object)
- ❌ `prescription` (object)
- ❌ `referral` (object)

#### Transcript Model (Separate)

```typescript
await prisma.transcript.create({
  data: {
    consultationId: consultation.id,
    text: 'Patient reports headache...',
    speaker: 'DOCTOR',  // DOCTOR | PATIENT | SYSTEM
    confidence: 0.95,
  },
});
```

#### SOAP Note Model (Separate)

```typescript
await prisma.soapNote.create({
  data: {
    consultationId: consultation.id,
    subjective: 'Patient reports...',
    objective: 'BP: 120/80...',
    assessment: 'Hypertension...',
    plan: 'Prescribe medication...',
    isApproved: false,
  },
});
```

#### Prescription Model (Separate)

```typescript
await prisma.prescription.create({
  data: {
    consultationId: consultation.id,
    patientId: patient.id,
    medications: {
      drugs: [
        {
          name: 'Amlodipine',
          dosage: '5mg',
          frequency: 'Once daily',
          duration: '30 days',
        },
      ],
    },
    instructions: 'Take with food',
    isApproved: false,
  },
});
```

#### Referral Model (Separate)

```typescript
await prisma.referral.create({
  data: {
    consultationId: consultation.id,
    patientId: patient.id,
    specialty: 'Cardiology',
    reason: 'Chest pain evaluation',
    urgency: 'ROUTINE',  // ROUTINE | URGENT | EMERGENCY
    notes: 'Patient requires specialist evaluation',
    isApproved: false,
  },
});
```

#### Appointment Model (Separate)

```typescript
await prisma.appointment.create({
  data: {
    consultationId: consultation.id,
    patientId: patient.id,
    scheduledAt: new Date('2026-05-10T10:00:00Z'),
    type: 'FOLLOW_UP',  // FOLLOW_UP | LAB_WORK | IMAGING | SPECIALIST | PROCEDURE
    reason: 'Review blood pressure',
    isApproved: false,
  },
});
```

### Complete Test Data Example

```typescript
// 1. Create doctor
const doctor = await prisma.user.create({
  data: {
    email: 'test.doctor@example.com',
    name: 'Dr. Test',
    passwordHash: await bcrypt.hash('password', 10),
    role: 'DOCTOR',
    specialty: 'General Practice',
    licenseNumber: 'LIC-001',
    isActive: true,
  },
});

// 2. Create patient
const patient = await prisma.patient.create({
  data: {
    mrn: 'MRN-' + Date.now(),
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date('1990-01-01'),
    gender: 'MALE',
    phone: '+254700000000',
    email: 'john@example.com',
    address: '123 Test Street',
    allergies: ['Penicillin'],
  },
});

// 3. Create consultation
const consultation = await prisma.consultation.create({
  data: {
    patientId: patient.id,
    doctorId: doctor.id,
    status: 'IN_PROGRESS',
  },
});

// 4. Add transcript
await prisma.transcript.create({
  data: {
    consultationId: consultation.id,
    text: 'Patient reports severe headache for 3 days',
    speaker: 'PATIENT',
    confidence: 0.95,
  },
});

// 5. Create SOAP note
await prisma.soapNote.create({
  data: {
    consultationId: consultation.id,
    subjective: 'Patient reports severe headache for 3 days',
    objective: 'BP: 150/95, Temp: 37.2C',
    assessment: 'Hypertensive headache',
    plan: 'Increase medication, follow-up in 2 weeks',
  },
});

// 6. Create prescription
await prisma.prescription.create({
  data: {
    consultationId: consultation.id,
    patientId: patient.id,
    medications: {
      drugs: [
        {
          name: 'Amlodipine',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '30 days',
        },
      ],
    },
    instructions: 'Take in the morning with food',
  },
});

// 7. Create referral
await prisma.referral.create({
  data: {
    consultationId: consultation.id,
    patientId: patient.id,
    specialty: 'Neurology',
    reason: 'Persistent headaches requiring specialist evaluation',
    urgency: 'ROUTINE',
  },
});

// 8. Create follow-up appointment
await prisma.appointment.create({
  data: {
    consultationId: consultation.id,
    patientId: patient.id,
    scheduledAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks
    type: 'FOLLOW_UP',
    reason: 'Review blood pressure and medication effectiveness',
  },
});

// 9. Complete consultation
await prisma.consultation.update({
  where: { id: consultation.id },
  data: {
    status: 'COMPLETED',
    endedAt: new Date(),
    duration: 1800, // 30 minutes in seconds
  },
});
```

### Common Mistakes to Avoid

#### ❌ Wrong
```typescript
// Don't use dateOfBirth
await prisma.patient.create({
  data: {
    dateOfBirth: new Date('1990-01-01'),  // WRONG
  },
});

// Don't use phoneNumber
await prisma.patient.create({
  data: {
    phoneNumber: '+254700000000',  // WRONG
  },
});

// Don't add chiefComplaint to consultation
await prisma.consultation.create({
  data: {
    chiefComplaint: 'Headache',  // WRONG - not in schema
  },
});

// Don't add soapNote as nested object
await prisma.consultation.create({
  data: {
    soapNote: {  // WRONG - create separately
      subjective: '...',
    },
  },
});
```

#### ✅ Correct
```typescript
// Use dob
await prisma.patient.create({
  data: {
    dob: new Date('1990-01-01'),  // CORRECT
  },
});

// Use phone
await prisma.patient.create({
  data: {
    phone: '+254700000000',  // CORRECT
  },
});

// Create consultation without chiefComplaint
await prisma.consultation.create({
  data: {
    patientId: patient.id,
    doctorId: doctor.id,
    status: 'IN_PROGRESS',
  },
});

// Create SOAP note separately
await prisma.soapNote.create({
  data: {
    consultationId: consultation.id,
    subjective: '...',
    objective: '...',
    assessment: '...',
    plan: '...',
  },
});
```

### Test Data Cleanup

Always clean up test data in the correct order (due to foreign key constraints):

```typescript
// Delete in reverse order of creation
await prisma.appointment.deleteMany({ where: { consultationId } });
await prisma.referral.deleteMany({ where: { consultationId } });
await prisma.prescription.deleteMany({ where: { consultationId } });
await prisma.soapNote.deleteMany({ where: { consultationId } });
await prisma.transcript.deleteMany({ where: { consultationId } });
await prisma.consultation.deleteMany({ where: { id: consultationId } });
await prisma.patient.deleteMany({ where: { id: patientId } });
await prisma.user.deleteMany({ where: { id: doctorId } });
```

### Unique Constraints

Be aware of unique constraints:
- `Patient.mrn` - Must be unique
- `Patient.email` - Optional but unique if provided
- `User.email` - Must be unique
- `User.licenseNumber` - Optional but unique if provided
- `SOAPNote.consultationId` - One SOAP note per consultation
- `Prescription.consultationId` - One prescription per consultation
- `Referral.consultationId` - One referral per consultation
- `Appointment.consultationId` - One appointment per consultation

### Helper Functions

```typescript
// Generate unique MRN
function generateMRN(): string {
  return `MRN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Generate unique email
function generateTestEmail(prefix: string): string {
  return `${prefix}.${Date.now()}@test.example.com`;
}

// Create complete test consultation
async function createTestConsultation() {
  const doctor = await prisma.user.create({
    data: {
      email: generateTestEmail('doctor'),
      name: 'Test Doctor',
      passwordHash: await bcrypt.hash('password', 10),
      role: 'DOCTOR',
      isActive: true,
    },
  });

  const patient = await prisma.patient.create({
    data: {
      mrn: generateMRN(),
      firstName: 'Test',
      lastName: 'Patient',
      dob: new Date('1990-01-01'),
      gender: 'MALE',
      phone: '+254700000000',
      allergies: [],
    },
  });

  const consultation = await prisma.consultation.create({
    data: {
      patientId: patient.id,
      doctorId: doctor.id,
      status: 'IN_PROGRESS',
    },
  });

  return { doctor, patient, consultation };
}
```

## Support

For testing issues or questions:

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Review test logs in `logs/test.log`
3. Open an issue on GitHub
4. Contact the development team

---

**Last Updated**: May 6, 2026  
**Version**: 1.0.0  
**Maintained by**: AfiyaPulse Development Team

