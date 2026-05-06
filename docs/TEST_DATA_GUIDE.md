# Test Data Creation Guide

## Overview

This guide explains how to create test data that matches the Prisma schema for AfiyaPulse.

## Schema Field Mappings

### Patient Model

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
    mrn: 'MRN-' + Date.now(),  // Must be unique
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date('1990-01-01'),  // Use 'dob' not 'dateOfBirth'
    gender: 'MALE',
    phone: '+254700000000',       // Use 'phone' not 'phoneNumber'
    email: 'john@example.com',
    address: '123 Test Street',
    allergies: ['Penicillin'],
  },
});
```

### Consultation Model

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

**Example:**
```typescript
await prisma.consultation.create({
  data: {
    patientId: patient.id,
    doctorId: doctor.id,
    status: 'IN_PROGRESS',
    // Do NOT include chiefComplaint, type, transcript, etc.
  },
});
```

### Transcript Model (Separate)

Transcripts are stored separately:

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

### SOAP Note Model (Separate)

SOAP notes are a separate related model:

```typescript
await prisma.soapNote.create({
  data: {
    consultationId: consultation.id,  // unique constraint
    subjective: 'Patient reports...',
    objective: 'BP: 120/80...',
    assessment: 'Hypertension...',
    plan: 'Prescribe medication...',
    isApproved: false,
  },
});
```

### Prescription Model (Separate)

Prescriptions are separate:

```typescript
await prisma.prescription.create({
  data: {
    consultationId: consultation.id,  // unique constraint
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

### Referral Model (Separate)

Referrals are separate:

```typescript
await prisma.referral.create({
  data: {
    consultationId: consultation.id,  // unique constraint
    patientId: patient.id,
    specialty: 'Cardiology',
    reason: 'Chest pain evaluation',
    urgency: 'ROUTINE',  // ROUTINE | URGENT | EMERGENCY
    notes: 'Patient requires specialist evaluation',
    isApproved: false,
  },
});
```

### Appointment Model (Separate)

Follow-up appointments are separate:

```typescript
await prisma.appointment.create({
  data: {
    consultationId: consultation.id,  // unique constraint
    patientId: patient.id,
    scheduledAt: new Date('2026-05-10T10:00:00Z'),
    type: 'FOLLOW_UP',  // FOLLOW_UP | LAB_WORK | IMAGING | SPECIALIST | PROCEDURE
    reason: 'Review blood pressure',
    isApproved: false,
  },
});
```

## Complete Test Data Example

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

## Common Mistakes to Avoid

### ❌ Wrong
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

### ✅ Correct
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

## Test Data Cleanup

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

## Unique Constraints

Be aware of unique constraints:
- `Patient.mrn` - Must be unique
- `Patient.email` - Optional but unique if provided
- `User.email` - Must be unique
- `User.licenseNumber` - Optional but unique if provided
- `SOAPNote.consultationId` - One SOAP note per consultation
- `Prescription.consultationId` - One prescription per consultation
- `Referral.consultationId` - One referral per consultation
- `Appointment.consultationId` - One appointment per consultation

## Helper Functions

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

---

**Last Updated**: May 3, 2026  
**Purpose**: Guide for creating test data matching Prisma schema

