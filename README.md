# Ismail Welfare Trust - Backend API

Complete backend for IWT charity management system.

## Features
- Case management (CRUD operations)
- Donation tracking & verification
- User authentication (JWT)
- Email notifications (receipts)
- Newsletter subscriptions
- Contact form handling
- Statistics & reporting

## Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer for emails

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your credentials:
- MongoDB URI
- JWT Secret
- Email credentials (Gmail App Password recommended)

4. Start MongoDB (if local):
```bash
mongod
```

5. Run server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

## API Endpoints

### Cases
- `GET /api/cases` - Get all cases (filter by category, status)
- `GET /api/cases/:id` - Get single case
- `POST /api/cases` - Create case (auth required)
- `PUT /api/cases/:id` - Update case (auth required)
- `GET /api/cases/stats/summary` - Get statistics

### Donations
- `POST /api/donations` - Submit donation
- `GET /api/donations` - Get all donations (auth required)
- `PUT /api/donations/:id/verify` - Verify donation (auth required)
- `GET /api/donations/stats/summary` - Get donation stats

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (auth required)

### Contact & Newsletter
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

## Authentication
Include JWT token in headers:
```
Authorization: Bearer <token>
```

## Default Admin Setup
After first run, create admin user via `/api/auth/register`:
```json
{
  "name": "Admin",
  "email": "admin@iwt.org",
  "password": "secure_password",
  "role": "admin"
}
```

## Production Notes
- Change JWT_SECRET to strong random string
- Use environment variables for all sensitive data
- Enable HTTPS
- Set up proper CORS origins
- Implement rate limiting
- Add input validation
- Set up MongoDB Atlas for cloud database
- Use PM2 or similar for process management

## License
MIT
