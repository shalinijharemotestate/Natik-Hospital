function roleMiddleware(allowedRoles) {
  const allowed = new Set(Array.isArray(allowedRoles) ? allowedRoles : []);

  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Access token required' });
    }
    if (!allowed.has(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    return next();
  };
}

module.exports = { roleMiddleware };
