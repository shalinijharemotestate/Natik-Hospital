const bcrypt = require('bcrypt');
const { prisma } = require('../config/prisma');

async function listUsers(req, res) {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
  return res.json({ users });
}

async function createUser(req, res) {
  const { name, email, password, role, isActive } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role,
        ...(typeof isActive === 'boolean' ? { isActive } : {}),
      },
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    });

    return res.status(201).json({ user });
  } catch (err) {
    if (err && err.code === 'P2002') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    throw err;
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    if (err && err.code === 'P2025') {
      return res.status(404).json({ message: 'User not found' });
    }
    throw err;
  }
}

module.exports = { listUsers, createUser, deleteUser };
