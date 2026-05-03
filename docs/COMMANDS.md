# AfiyaPulse - Command Reference

Complete reference of all commands used in the AfiyaPulse project.

## Table of Contents

- [Setup Commands](#setup-commands)
- [Development Commands](#development-commands)
- [Database Commands](#database-commands)
- [Testing Commands](#testing-commands)
- [Build Commands](#build-commands)
- [Docker Commands](#docker-commands)
- [IBM Cloud Commands](#ibm-cloud-commands)
- [Git Commands](#git-commands)
- [Utility Commands](#utility-commands)

---

## Setup Commands

### Initial Project Setup

```bash
# Clone repository
git clone <repository-url>
cd AfiyaPulse

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate encryption key
openssl rand -hex 32

# Generate JWT secret
openssl rand -base64 32

# Set up environment variables
nano .env
```

### Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (development)
npm run db:push

# Run migrations (production)
npm run db:migrate

# Seed database with initial data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

---

## Development Commands

### Start Development Server

```bash
# Start all services in development mode
npm run dev

# Start specific app
cd apps/api && npm run dev
```

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix

# Format code
npm run format

# Type check
npx tsc --noEmit
```

---

## Database Commands

### Prisma Commands

```bash
# Generate Prisma Client
npm run db:generate

# Create migration
npx prisma migrate dev --name <migration-name>

# Apply migrations
npm run db:migrate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Push schema without migration
npm run db:push

# Open Prisma Studio
npm run db:studio

# Seed database
npm run db:seed

# Pull schema from database
npx prisma db pull

# Validate schema
npx prisma validate

# Format schema file
npx prisma format
```

### Database Backup & Restore

```bash
# Backup database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql

# Backup with compression
pg_dump $DATABASE_URL | gzip > backup.sql.gz

# Restore from compressed backup
gunzip -c backup.sql.gz | psql $DATABASE_URL
```

---

## Testing Commands

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci

# Run specific test file
npm test -- health.routes.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="Health Routes"

# Update snapshots
npm test -- -u

# Run tests with verbose output
npm test -- --verbose
```

---

## Build Commands

### Build Project

```bash
# Build all packages
npm run build

# Clean build artifacts
npm run clean

# Clean and rebuild
npm run clean && npm run build
```

---

## Docker Commands

### Build & Run

```bash
# Build image
npm run docker:build

# Run container
npm run docker:run

# Build manually
docker build -t afiyapulse-api:latest .

# Run with custom port
docker run -p 8080:8080 --env-file .env afiyapulse-api:latest
```

### Docker Management

```bash
# List containers
docker ps

# Stop container
docker stop <container-id>

# View logs
docker logs -f <container-id>

# Execute command in container
docker exec -it <container-id> /bin/sh

# Remove stopped containers
docker container prune
```

---

## IBM Cloud Commands

### Setup

```bash
# Install IBM Cloud CLI
curl -fsSL https://clis.cloud.ibm.com/install/linux | sh

# Login
ibmcloud login --apikey <api-key>

# Target resource group and region
ibmcloud target -g Default -r us-south
```

### Object Storage

```bash
# Install COS plugin
ibmcloud plugin install cloud-object-storage

# Create bucket
ibmcloud cos bucket-create --bucket afiyapulse-audio --region us-south

# List buckets
ibmcloud cos buckets

# Upload file
ibmcloud cos object-put --bucket afiyapulse-audio --key file.txt --body ./file.txt
```

### Code Engine

```bash
# Install Code Engine plugin
ibmcloud plugin install code-engine

# Create project
ibmcloud ce project create --name afiyapulse

# Select project
ibmcloud ce project select --name afiyapulse

# Create application
ibmcloud ce application create \
  --name afiyapulse-api \
  --image us.icr.io/afiyapulse/afiyapulse-api:latest \
  --cpu 1 \
  --memory 2G \
  --port 8080

# Update application
ibmcloud ce application update --name afiyapulse-api --image <new-image>

# View logs
ibmcloud ce application logs --name afiyapulse-api

# Create secret
ibmcloud ce secret create --name afiyapulse-secrets \
  --from-literal DATABASE_URL="<url>"
```

### Container Registry

```bash
# Install CR plugin
ibmcloud plugin install container-registry

# Login to registry
ibmcloud cr login

# Create namespace
ibmcloud cr namespace-add afiyapulse

# Tag and push image
docker tag afiyapulse-api:latest us.icr.io/afiyapulse/afiyapulse-api:latest
docker push us.icr.io/afiyapulse/afiyapulse-api:latest

# List images
ibmcloud cr image-list
```

### Watson Services

```bash
# Create Watson STT service
ibmcloud resource service-instance-create afiyapulse-watson-stt \
  speech-to-text lite us-south

# Create credentials
ibmcloud resource service-key-create afiyapulse-watson-stt-key \
  Manager --instance-name afiyapulse-watson-stt

# Get credentials
ibmcloud resource service-key afiyapulse-watson-stt-key
```

---

## Git Commands

### Basic Operations

```bash
# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "commit message"

# Push changes
git push origin main

# Pull changes
git pull origin main
```

### Branch Management

```bash
# Create and switch branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# List branches
git branch

# Delete branch
git branch -d feature/old-feature

# Merge branch
git merge feature/new-feature
```

### Advanced Operations

```bash
# Stash changes
git stash

# Apply stashed changes
git stash pop

# View commit history
git log --oneline

# Revert commit
git revert <commit-hash>

# Reset to commit
git reset --hard <commit-hash>

# Cherry-pick commit
git cherry-pick <commit-hash>
```

---

## Utility Commands

### Generate Secrets

```bash
# Generate random string (32 bytes, base64)
openssl rand -base64 32

# Generate random hex string (32 bytes)
openssl rand -hex 32

# Generate UUID
uuidgen

# Generate password
openssl rand -base64 24
```

### System Information

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check disk space
df -h

# Check memory usage
free -h

# Check running processes
ps aux | grep node
```

### Network & Port

```bash
# Check if port is in use
lsof -i :3001

# Kill process on port
kill -9 $(lsof -t -i:3001)

# Test API endpoint
curl http://localhost:3001/health

# Test with headers
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/patients
```

### File Operations

```bash
# Find files
find . -name "*.ts"

# Search in files
grep -r "searchterm" ./apps

# Count lines of code
find ./apps -name "*.ts" | xargs wc -l

# Remove node_modules
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
```

### Performance Monitoring

```bash
# Monitor CPU and memory
top

# Monitor specific process
top -p <pid>

# Check application logs
tail -f logs/app.log

# Monitor disk I/O
iostat -x 1
```

---

## Quick Reference

### Daily Development Workflow

```bash
# 1. Start development
git pull origin main
npm install
npm run dev

# 2. Make changes and test
npm test
npm run lint

# 3. Commit and push
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

### Deployment Workflow

```bash
# 1. Build and test
npm run build
npm run test:ci

# 2. Build Docker image
docker build -t afiyapulse-api:latest .

# 3. Push to IBM Container Registry
docker tag afiyapulse-api:latest us.icr.io/afiyapulse/afiyapulse-api:latest
docker push us.icr.io/afiyapulse/afiyapulse-api:latest

# 4. Deploy to Code Engine
ibmcloud ce application update --name afiyapulse-api \
  --image us.icr.io/afiyapulse/afiyapulse-api:latest
```

### Troubleshooting Workflow

```bash
# 1. Check application health
curl http://localhost:3001/health

# 2. View logs
docker logs -f <container-id>

# 3. Check database connection
psql $DATABASE_URL -c "SELECT 1"

# 4. Check Redis connection
redis-cli -u $REDIS_URL ping

# 5. Restart services
docker-compose restart
```

---

## Environment-Specific Commands

### Development

```bash
NODE_ENV=development npm run dev
npm run db:push
npm run test:watch
```

### Staging

```bash
NODE_ENV=staging npm run build
npm run db:migrate
npm run test:ci
```

### Production

```bash
NODE_ENV=production npm run build
npm run db:migrate
npm test
```

---

## Additional Resources

- [Prisma CLI Reference](https://www.prisma.io/docs/reference/api-reference/command-reference)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)
- [IBM Cloud CLI Reference](https://cloud.ibm.com/docs/cli?topic=cli-ibmcloud_cli)
- [Git Command Reference](https://git-scm.com/docs)