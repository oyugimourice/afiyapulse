# AfiyaPulse Setup Guide

This guide will walk you through setting up the AfiyaPulse development environment from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **VS Code** (recommended) ([Download](https://code.visualstudio.com/))

## Required Services

You'll need accounts and API keys for:

1. **Neon Postgres** - Serverless PostgreSQL database
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string

2. **IBM Watson Speech-to-Text** - Audio transcription
   - Sign up at [IBM Cloud](https://cloud.ibm.com)
   - Create a Speech-to-Text service instance
   - Copy API key and URL

3. **OpenAI** - LLM for AI agents
   - Sign up at [platform.openai.com](https://platform.openai.com)
   - Create an API key
   - Alternative: Use Anthropic Claude instead

4. **AWS S3** (optional) - Audio file storage
   - Sign up at [aws.amazon.com](https://aws.amazon.com)
   - Create an S3 bucket
   - Create IAM credentials with S3 access

5. **Upstash Redis** (optional) - Caching layer
   - Sign up at [upstash.com](https://upstash.com)
   - Create a Redis database
   - Copy the connection URL

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/oyugimourice/afiyapulse.git
cd afiyapulse
```

### 2. Install Dependencies

```bash
# Install all workspace dependencies
npm install

# This will install dependencies for:
# - Root workspace
# - apps/web (Next.js frontend)
# - apps/api (Express backend)
# - packages/database (Prisma)
# - packages/shared-types
# - packages/mcp-sdk
# - packages/config
```

### 3. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your credentials
nano .env  # or use your preferred editor
```

Required environment variables:

```env
# Database (Neon Postgres)
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/afiyapulse?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/afiyapulse?sslmode=require"

# Redis (Upstash)
REDIS_URL="redis://default:xxx@xxx.upstash.io:6379"

# IBM Watson Speech-to-Text
WATSON_STT_API_KEY="your-watson-api-key"
WATSON_STT_URL="https://api.us-south.speech-to-text.watson.cloud.ibm.com"

# OpenAI
OPENAI_API_KEY="sk-xxx"
OPENAI_MODEL="gpt-4-turbo-preview"

# JWT Authentication
JWT_SECRET="generate-a-random-secret-key-here"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# AWS S3 (for audio storage)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET="afiyapulse-audio"
AWS_REGION="us-east-1"

# Application
NODE_ENV="development"
PORT="3001"
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:3001"
CORS_ORIGIN="http://localhost:3000"
```

### 4. Set Up the Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Seed database with sample data
npm run db:seed
```

After seeding, you'll have:

- **Admin user**: `admin@afiyapulse.com` / `Admin@123`
- **Doctor user**: `dr.smith@afiyapulse.com` / `Doctor@123`
- **3 sample patients** with MRNs: MRN-001, MRN-002, MRN-003

### 5. Verify Database Setup

```bash
# Open Prisma Studio to view your database
npm run db:studio
```

This opens a browser interface at `http://localhost:5555` where you can:

- View all tables
- Browse seeded data
- Manually add/edit records

### 6. Start Development Servers

```bash
# Start all services (frontend + backend)
npm run dev
```

This starts:

- **Frontend**: <http://localhost:3000> (Next.js)
- **Backend API**: <http://localhost:3001> (Express)
- **WebSocket**: ws://localhost:3001 (Socket.IO)

### 7. Verify Everything Works

1. **Check API Health**

   ```bash
   curl http://localhost:3001/health
   ```

   Should return:

   ```json
   {
     "status": "healthy",
     "timestamp": "2024-01-01T00:00:00.000Z",
     "uptime": 123.456
   }
   ```

2. **Test Authentication**

   ```bash
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"dr.smith@afiyapulse.com","password":"Doctor@123"}'
   ```

3. **Open Frontend**
   - Navigate to <http://localhost:3000>
   - Login with doctor credentials
   - Explore the dashboard

## Development Workflow

### Running Individual Services

```bash
# Run only the backend
cd apps/api
npm run dev

# Run only the frontend
cd apps/web
npm run dev

# Run database migrations
npm run db:migrate

# Generate Prisma Client after schema changes
npm run db:generate
```

### Code Quality

```bash
# Run linting
npm run lint

# Format code
npm run format

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage
npm run test:coverage
```

### Database Management

```bash
# Create a new migration
npm run db:migrate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Re-seed database
npm run db:seed

# View database in browser
npm run db:studio
```

## Troubleshooting

### Port Already in Use

If you see "Port 3000 (or 3001) is already in use":

```bash
# Find process using the port
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Database Connection Issues

1. **Check Neon database is running**
   - Login to Neon console
   - Verify project is active
   - Check connection string is correct

2. **Test connection manually**

   ```bash
   npx prisma db pull
   ```

3. **Verify environment variables**

   ```bash
   echo $DATABASE_URL  # macOS/Linux
   echo %DATABASE_URL%  # Windows
   ```

### Prisma Client Not Generated

```bash
# Regenerate Prisma Client
npm run db:generate

# If that fails, try:
cd packages/database
npx prisma generate
```

### TypeScript Errors

```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## VS Code Setup (Recommended)

### Recommended Extensions

Install these VS Code extensions:

1. **Prisma** - Syntax highlighting for Prisma schema
2. **ESLint** - JavaScript/TypeScript linting
3. **Prettier** - Code formatting
4. **TypeScript Vue Plugin (Volar)** - TypeScript support
5. **REST Client** - Test API endpoints
6. **GitLens** - Git integration

### Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Next Steps

Once your development environment is set up:

1. **Read the Implementation Plan** - See `IMPLEMENTATION_PLAN.md` for detailed development roadmap
2. **Explore the Architecture** - Review `README.md` for system architecture
3. **Start Coding** - Follow the implementation plan to build features
4. **Run Tests** - Ensure all tests pass before committing
5. **Commit Changes** - Use conventional commits (feat:, fix:, docs:, etc.)

## Getting Help

- **Documentation**: See `/docs` folder
- **Issues**: Check GitHub issues
- **Discord**: Join our community (link in README)
- **Email**: <support@afiyapulse.com>

## Production Deployment

For production deployment instructions, see:

- `docs/deployment.md` - Deployment guide
- `docker/` - Docker configurations
- `.github/workflows/` - CI/CD pipelines

---

**Happy coding! 🚀**
