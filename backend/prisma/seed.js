require('dotenv').config();

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SUPER_ADMIN_EMAIL || 'admin@natik.local';
  const password = process.env.SUPER_ADMIN_PASSWORD || 'ChangeMeNow123!';
  const name = process.env.SUPER_ADMIN_NAME || 'Super Admin';

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      name,
      password: hashed,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
    create: {
      name,
      email,
      password: hashed,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });

  // eslint-disable-next-line no-console
  console.log(`Seeded SUPER_ADMIN: ${email}`);

  const receptionistEmail = 'receptionist@natik.local';
  const receptionistPassword = 'Receptionist@123';
  const receptionistHashed = await bcrypt.hash(receptionistPassword, 12);

  await prisma.user.upsert({
    where: { email: receptionistEmail },
    update: {
      name: 'Default Receptionist',
      password: receptionistHashed,
      role: 'RECEPTIONIST',
      isActive: true,
    },
    create: {
      name: 'Default Receptionist',
      email: receptionistEmail,
      password: receptionistHashed,
      role: 'RECEPTIONIST',
      isActive: true,
    },
  });

  // eslint-disable-next-line no-console
  console.log(`Seeded RECEPTIONIST: ${receptionistEmail}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

