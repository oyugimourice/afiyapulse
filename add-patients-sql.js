require('dotenv').config({ path: '.env' });

// Try using node-postgres directly
const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');

// Simple CUID-like function (Prisma default)
function generateId() {
  return 'c' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
}

async function seedPatients() {
  console.log('🌱 Adding patients to database...');
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    const patients = [
      {
        id: generateId(),
        mrn: 'P-001',
        firstName: 'Jane',
        lastName: 'Doe',
        dob: '1985-06-15',
        gender: 'FEMALE',
        phone: '+254712345678',
        email: 'jane.doe@example.com',
        address: '123 Main St, Nairobi, Kenya',
        allergies: ['Penicillin', 'Peanuts'],
      },
      {
        id: generateId(),
        mrn: 'P-002',
        firstName: 'Michael',
        lastName: 'Johnson',
        dob: '1978-03-22',
        gender: 'MALE',
        phone: '+254723456789',
        email: 'michael.j@example.com',
        address: '456 Oak Ave, Mombasa, Kenya',
        allergies: ['Sulfa drugs'],
      },
      {
        id: generateId(),
        mrn: 'P-003',
        firstName: 'Sarah',
        lastName: 'Williams',
        dob: '1992-11-08',
        gender: 'FEMALE',
        phone: '+254734567890',
        email: 'sarah.w@example.com',
        address: '789 Pine Rd, Kisumu, Kenya',
        allergies: [],
      },
    ];

    for (const patient of patients) {
      const existResult = await client.query(
        'SELECT id FROM patients WHERE mrn = $1',
        [patient.mrn]
      );

      if (existResult.rows.length === 0) {
        await client.query(
          `INSERT INTO patients (id, mrn, "firstName", "lastName", dob, gender, phone, email, address, allergies, "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::text[], NOW(), NOW())`,
          [patient.id, patient.mrn, patient.firstName, patient.lastName, patient.dob, patient.gender, patient.phone, patient.email, patient.address, patient.allergies]
        );
        console.log(`✅ Created patient: ${patient.firstName} ${patient.lastName} (${patient.mrn})`);
      } else {
        console.log(`⏭️  Patient already exists: ${patient.mrn}`);
      }
    }

    console.log('🎉 Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seedPatients();
