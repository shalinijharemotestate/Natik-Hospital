const app = require('./src/app');
const { prisma } = require('./src/config/prisma');

const PORT = process.env.PORT || 5000;

function safeDbTarget(databaseUrl) {
  try {
    const u = new URL(databaseUrl);
    // Avoid printing username/password; show only host/db
    return `${u.hostname}${u.port ? `:${u.port}` : ''}/${u.pathname.replace(/^\//, '')}`;
  } catch {
    return '(invalid DATABASE_URL)';
  }
}

const start = async () => {
  const target = safeDbTarget(process.env.DATABASE_URL || '');
  console.log(`[db] Connecting to ${target} ...`);
  try {
    await prisma.$connect();
    console.log('[db] Connected');
  } catch (err) {
    console.error('[db] Connection failed');
    console.error(err);
    process.exit(1);
  }

  const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  const shutdown = async () => {
    server.close(() => {});
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

start().catch(console.error);
