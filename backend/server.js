const app = require('./src/app');
const { createUsersTable } = require('./src/models/user.model');
const { createRefreshTokensTable } = require('./src/models/refresh_token.model');

const PORT = process.env.PORT || 5000;

const start = async () => {
  await createUsersTable();
  await createRefreshTokensTable();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start().catch(console.error);
