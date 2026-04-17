const bcrypt = require('bcrypt');
const { prisma } = require('../config/prisma');
const { generateAccessToken } = require('../config/jwt');

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.isActive) return res.status(403).json({ message: 'Account is deactivated' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    if (user.role !== role) {
      return res.status(403).json({ message: 'Unauthorized role access' });
    }

    const payload = { userId: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);

    res.json({
      accessToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
