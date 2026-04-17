# Backend (Natik Hospital)

## Setup

1. Create `.env` from `.env.example` and set `DATABASE_URL` and `JWT_SECRET`.
2. Install dependencies:

```bash
npm install
```

3. Run Prisma migration + generate client:

```bash
npm run prisma:migrate
```

4. (Optional) Seed a SUPER_ADMIN:

```bash
npm run seed
```

5. Start the API:

```bash
npm run dev
```

## Key endpoints

- `POST /api/auth/login`
- `GET /api/users` (SUPER_ADMIN)
- `POST /api/users` (SUPER_ADMIN)
- `DELETE /api/users/:id` (SUPER_ADMIN)

