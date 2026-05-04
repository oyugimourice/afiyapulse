require('dotenv').config({ path: '.env' });

// Manually ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Please check your .env file.');
  process.exit(1);
}

console.log('DATABASE_URL is set:', process.env.DATABASE_URL.substring(0, 50) + '...');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedPatients() {
  console.log('🌱 Adding patients to database...');
  
  try {
    const patients = [
      {
        mrn: 'P-001',
        firstName: 'Jane',
        lastName: 'Doe',
        dob: new Date('1985-06-15'),
        gender: 'FEMALE',
        phone: '+254712345678',
        email: 'jane.doe@example.com',
        address: '123 Main St, Nairobi, Kenya',
        allergies: JSON.stringify(['Penicillin', 'Peanuts']),
      },
      {
        mrn: 'P-002',
        firstName: 'Michael',
        lastName: 'Johnson',
        dob: new Date('1978-03-22'),
        gender: 'MALE',
        phone: '+254723456789',
        email: 'michael.j@example.com',
        address: '456 Oak Ave, Mombasa, Kenya',
        allergies: JSON.stringify(['Sulfa drugs']),
      },
      {
        mrn: 'P-003',
        firstName: 'Sarah',
        lastName: 'Williams',
        dob: new Date('1992-11-08'),
        gender: 'FEMALE',
        phone: '+254734567890',
        email: 'sarah.w@example.com',
        address: '789 Pine Rd, Kisumu, Kenya',
        allergies: JSON.stringify([]),
      },
    ];

    for (const patient of patients) {
      const existing = await prisma.patient.findUnique({
        where: { mrn: patient.mrn },
      });

      if (!existing) {
        const created = await prisma.patient.create({ data: patient });
        console.log(`✅ Created patient: ${created.firstName} ${created.lastName} (${created.mrn})`);
      } else {
        console.log(`⏭️  Patient already exists: ${existing.mrn}`);
      }
    }

    console.log('🎉 Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedPatients();
