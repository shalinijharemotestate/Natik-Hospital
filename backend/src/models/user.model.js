const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUsersTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL CHECK (role IN (
        'super_admin', 'receptionist', 'doctor',
        'nurse', 'lab_technician', 'pharmacist', 'hr_manager'
      )),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

const findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const findById = async (id) => {
  const result = await pool.query('SELECT id, name, email, role, is_active FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const createUser = async ({ name, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
};

const comparePassword = async (plain, hashed) => bcrypt.compare(plain, hashed);

module.exports = { createUsersTable, findByEmail, findById, createUser, comparePassword };
