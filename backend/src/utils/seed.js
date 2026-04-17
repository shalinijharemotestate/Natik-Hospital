// Run once to create a Super Admin: node src/utils/seed.js
require('dotenv').config({ path: '../../.env' });
const { createUser } = require('../models/user.model');
const { createUsersTable } = require('../models/user.model');
const { createRefreshTokensTable } = require('../models/refresh_token.model');

const seed = async () => {
  await createUsersTable();
  await createRefreshTokensTable();

  const admin = await createUser({
    name: 'Super Admin',
    email: 'admin@natikhospital.com',
    password: 'Admin@123',
    role: 'super_admin',
  });

  console.log('Super Admin created:', admin);
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });
