# AfiyaPulse Troubleshooting Guide

## Common Issues and Solutions

### 1. "Failed to start consultation" - 403 Forbidden Error

**Problem**: When clicking "Start Consultation", you get a 403 Forbidden error.

**Cause**: The logged-in user doesn't have the DOCTOR or NURSE role. Only users with these roles can create consultations.

**Solution**: Login with the doctor account created during database seeding:

- **Email**: `dr.smith@afiyapulse.com`
- **Password**: `Doctor@123`

**Alternative**: Update your current user's role in the database:

```sql
-- Connect to your database and run:
UPDATE "User" SET role = 'DOCTOR' WHERE email = 'your-email@example.com';
```

---

### 2. Patients Not Showing in Dashboard

**Problem**: You have patients in the database but they don't appear in the dashboard.

**Cause**: Dashboard was counting only patients with consultations.

**Solution**: This has been fixed in the latest code. Restart the API server:
```bash
npm run dev:api
```

---

### 3. Database Connection Errors

**Problem**: API fails to start with database connection errors.

**Solution**:
1. Check your `.env` file has the correct `DATABASE_URL`
2. Ensure your database is running
3. Run migrations:
```bash
cd packages/database
npx prisma migrate dev
```

---

### 4. Missing Environment Variables

**Problem**: API or Web app fails to start due to missing environment variables.

**Solution**:
1. Copy `.env.example` to `.env` in the root directory
2. Fill in all required values:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `JWT_SECRET` - A secure random string
   - `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` - Your AI provider key
   - `WATSON_STT_API_KEY` - IBM Watson Speech-to-Text key
   - `IBM_COS_*` - IBM Cloud Object Storage credentials
   - `REDIS_URL` - Your Redis connection string

---

### 5. WebSocket Connection Failures

**Problem**: Real-time features don't work, WebSocket connection fails.

**Cause**: WebSocket server not running or incorrect URL.

**Solution**:
1. Ensure API server is running on port 3001
2. Check `apps/web/.env` has correct WebSocket URL:
```env
VITE_WS_URL=ws://localhost:3001
```

---

### 6. Audio Recording Not Working

**Problem**: Cannot record audio during consultation.

**Cause**: Browser doesn't have microphone permissions.

**Solution**:
1. Grant microphone permissions when prompted
2. Check browser console for errors
3. Ensure you're using HTTPS in production (required for microphone access)

---

### 7. PDF Generation Fails

**Problem**: Cannot generate PDFs for documents.

**Cause**: Missing IBM Cloud Object Storage configuration.

**Solution**:
1. Set up IBM Cloud Object Storage
2. Add credentials to `.env`:
```env
IBM_COS_ENDPOINT=https://s3.us-south.cloud-object-storage.appdomain.cloud
IBM_COS_API_KEY_ID=your-api-key
IBM_COS_SERVICE_INSTANCE_ID=your-instance-id
IBM_COS_BUCKET_NAME=your-bucket-name
```

---

### 8. Email Notifications Not Sending

**Problem**: Users don't receive email notifications.

**Cause**: SMTP not configured or using development mode.

**Solution**:

**For Development** (uses Ethereal test email):
- Emails are logged to console with preview links
- No actual emails are sent

**For Production**:
1. Add SMTP configuration to `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@afiyapulse.com
```

---

### 9. AI Agents Not Generating Documents

**Problem**: SOAP notes, prescriptions, or referrals are not being generated.

**Cause**: Missing AI provider API keys or MCP servers not running.

**Solution**:
1. Add AI provider key to `.env`:
```env
OPENAI_API_KEY=sk-...
# OR
ANTHROPIC_API_KEY=sk-ant-...
```

2. Ensure MCP servers are accessible (they run as part of the API)

---

### 10. Cache/Redis Errors

**Problem**: API logs show Redis connection errors.

**Cause**: Redis not running or incorrect connection string.

**Solution**:
1. Install and start Redis locally:
```bash
# macOS
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt-get install redis-server
sudo systemctl start redis

# Windows
# Use Docker or WSL
```

2. Or use Upstash Redis (cloud):
   - Sign up at https://upstash.com
   - Create a Redis database
   - Copy connection string to `.env`:
```env
REDIS_URL=redis://default:password@host:port
```

---

## Default Login Credentials

After running `npm run db:seed`, use these credentials:

### Admin Account
- **Email**: `admin@afiyapulse.com`
- **Password**: `Admin@123`
- **Role**: ADMIN
- **Permissions**: Full system access

### Doctor Account
- **Email**: `dr.smith@afiyapulse.com`
- **Password**: `Doctor@123`
- **Role**: DOCTOR
- **Permissions**: Create consultations, manage patients, review documents

---

## Useful Commands

### Database
```bash
# Run migrations
cd packages/database && npx prisma migrate dev

# Seed database
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio

# Reset database (WARNING: Deletes all data)
cd packages/database && npx prisma migrate reset
```

### Development
```bash
# Start everything
npm run dev

# Start API only
npm run dev:api

# Start Web only
npm run dev:web

# Build everything
npm run build

# Run tests
npm run test
```

### Logs
```bash
# View API logs
tail -f apps/api/logs/combined.log

# View error logs only
tail -f apps/api/logs/error.log
```

---

## Getting Help

1. Check the logs in `apps/api/logs/`
2. Check browser console for frontend errors
3. Review the API documentation in `docs/API.md`
4. Check the setup guide in `SETUP.md`

---

## Production Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Set strong `JWT_SECRET` (32+ characters)
- [ ] Configure production SMTP for emails
- [ ] Set up IBM Cloud Object Storage
- [ ] Configure Redis (Upstash recommended)
- [ ] Set up proper database backups
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up monitoring and logging
- [ ] Review and update rate limits
- [ ] Test all features thoroughly
- [ ] Set `NODE_ENV=production`

---

*Last Updated: May 3, 2026*