import { PrismaClient, UserRole, Gender } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@afiyapulse.com' },
    update: {},
    create: {
      email: 'admin@afiyapulse.com',
      name: 'System Administrator',
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      isActive: true,
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create sample doctor
  const doctorPassword = await bcrypt.hash('Doctor@123', 10);
  const doctor = await prisma.user.upsert({
    where: { email: 'dr.smith@afiyapulse.com' },
    update: {},
    create: {
      email: 'dr.smith@afiyapulse.com',
      name: 'Dr. John Smith',
      passwordHash: doctorPassword,
      role: UserRole.DOCTOR,
      specialty: 'Internal Medicine',
      licenseNumber: 'MD-12345',
      isActive: true,
    },
  });
  console.log('✅ Created doctor user:', doctor.email);

  // Create sample patients
  const patient1 = await prisma.patient.upsert({
    where: { mrn: 'MRN-001' },
    update: {},
    create: {
      mrn: 'MRN-001',
      firstName: 'Jane',
      lastName: 'Doe',
      dob: new Date('1985-06-15'),
      gender: Gender.FEMALE,
      phone: '+254712345678',
      email: 'jane.doe@example.com',
      address: '123 Main St, Nairobi, Kenya',
      allergies: ['Penicillin', 'Peanuts'],
    },
  });
  console.log('✅ Created patient:', patient1.mrn);

  const patient2 = await prisma.patient.upsert({
    where: { mrn: 'MRN-002' },
    update: {},
    create: {
      mrn: 'MRN-002',
      firstName: 'Michael',
      lastName: 'Johnson',
      dob: new Date('1978-03-22'),
      gender: Gender.MALE,
      phone: '+254723456789',
      email: 'michael.j@example.com',
      address: '456 Oak Ave, Mombasa, Kenya',
      allergies: ['Sulfa drugs'],
    },
  });
  console.log('✅ Created patient:', patient2.mrn);

  const patient3 = await prisma.patient.upsert({
    where: { mrn: 'MRN-003' },
    update: {},
    create: {
      mrn: 'MRN-003',
      firstName: 'Sarah',
      lastName: 'Williams',
      dob: new Date('1992-11-08'),
      gender: Gender.FEMALE,
      phone: '+254734567890',
      email: 'sarah.w@example.com',
      address: '789 Pine Rd, Kisumu, Kenya',
      allergies: [],
    },
  });
  console.log('✅ Created patient:', patient3.mrn);

  console.log('🎉 Database seeding completed!');
  console.log('\n📝 Login credentials:');
  console.log('Admin: admin@afiyapulse.com / Admin@123');
  console.log('Doctor: dr.smith@afiyapulse.com / Doctor@123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Made with Bob
