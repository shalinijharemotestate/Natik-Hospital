const { findByEmail, findById, createUser, comparePassword } = require('../models/user.model');
const { saveRefreshToken, findRefreshToken, deleteRefreshToken, deleteAllUserTokens } = require('../models/refresh_token.model');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../config/jwt');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    if (!user.is_active) return res.status(403).json({ message: 'Account is deactivated' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const payload = { id: user.id, role: user.role, name: user.name };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await saveRefreshToken(user.id, refreshToken);

    res.json({
      accessToken,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });

    const stored = await findRefreshToken(refreshToken);
    if (!stored) return res.status(401).json({ message: 'Invalid or expired refresh token' });

    const decoded = verifyRefreshToken(refreshToken);
    const user = await findById(decoded.id);
    if (!user || !user.is_active) return res.status(401).json({ message: 'User not found or inactive' });

    const payload = { id: user.id, role: user.role, name: user.name };
    const newAccessToken = generateAccessToken(payload);

    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) await deleteRefreshToken(refreshToken);
    res.json({ message: 'Logged out successfully' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const logoutAll = async (req, res) => {
  try {
    await deleteAllUserTokens(req.user.id);
    res.json({ message: 'Logged out from all devices' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, refresh, logout, logoutAll, getMe };
