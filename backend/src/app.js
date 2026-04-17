const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'Natik Hospital API running' }));

module.exports = app;
