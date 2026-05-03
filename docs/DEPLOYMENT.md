# AfiyaPulse - IBM Cloud Deployment Guide

This guide provides step-by-step instructions for deploying AfiyaPulse to IBM Cloud.

## Prerequisites

1. **IBM Cloud Account**: [Sign up here](https://cloud.ibm.com/registration)
2. **IBM Cloud CLI**: [Install CLI](https://cloud.ibm.com/docs/cli?topic=cli-getting-started)
3. **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
4. **Git**: For version control

## Architecture Overview

AfiyaPulse on IBM Cloud uses:
- **IBM Cloud Foundry** or **IBM Code Engine** for application hosting
- **IBM Cloud Object Storage (COS)** for audio file storage
- **IBM Watson Speech-to-Text** for transcription
- **Neon Postgres** (external) for database
- **Upstash Redis** (external) for caching

## Step 1: Set Up IBM Cloud Services

### 1.1 Create IBM Cloud Object Storage

```bash
# Login to IBM Cloud
ibmcloud login

# Target your resource group
ibmcloud target -g Default

# Create COS instance
ibmcloud resource service-instance-create afiyapulse-cos \
  cloud-object-storage standard global

# Create HMAC credentials
ibmcloud resource service-key-create afiyapulse-cos-hmac \
  Writer --instance-name afiyapulse-cos \
  --parameters '{"HMAC":true}'

# Get credentials
ibmcloud resource service-key afiyapulse-cos-hmac
```

**Save the following from the output:**
- `access_key_id` → `AWS_ACCESS_KEY_ID`
- `secret_access_key` → `AWS_SECRET_ACCESS_KEY`

### 1.2 Create COS Bucket

```bash
# Install COS plugin
ibmcloud plugin install cloud-object-storage

# Create bucket (replace REGION with us-south, eu-gb, etc.)
ibmcloud cos bucket-create --bucket afiyapulse-audio \
  --ibm-service-instance-id <COS_INSTANCE_ID> \
  --region us-south
```

### 1.3 Create Watson Speech-to-Text Service

```bash
# Create Watson STT instance
ibmcloud resource service-instance-create afiyapulse-watson-stt \
  speech-to-text lite us-south

# Create service credentials
ibmcloud resource service-key-create afiyapulse-watson-stt-key \
  Manager --instance-name afiyapulse-watson-stt

# Get credentials
ibmcloud resource service-key afiyapulse-watson-stt-key
```

**Save the following:**
- `apikey` → `WATSON_STT_API_KEY`
- `url` → `WATSON_STT_URL`

## Step 2: Set Up External Services

### 2.1 Neon Postgres Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project: `afiyapulse-production`
3. Copy the connection string → `DATABASE_URL`
4. Copy the direct connection string → `DIRECT_URL`

### 2.2 Upstash Redis

1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database: `afiyapulse-redis`
3. Copy the Redis URL → `REDIS_URL`

## Step 3: Configure Environment Variables

Create a `.env.production` file:

```bash
# Database (Neon Postgres)
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/afiyapulse?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/afiyapulse?sslmode=require"

# Redis (Upstash)
REDIS_URL="redis://default:xxx@xxx.upstash.io:6379"

# IBM Watson Speech-to-Text
WATSON_STT_API_KEY="your-watson-api-key"
WATSON_STT_URL="https://api.us-south.speech-to-text.watson.cloud.ibm.com"

# OpenAI or Claude
OPENAI_API_KEY="sk-xxx"
OPENAI_MODEL="gpt-4-turbo-preview"

# JWT Authentication
JWT_SECRET="your-production-jwt-secret-min-32-chars"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# IBM Cloud Object Storage
AWS_ACCESS_KEY_ID="your-cos-hmac-access-key"
AWS_SECRET_ACCESS_KEY="your-cos-hmac-secret-key"
AWS_S3_BUCKET="afiyapulse-audio"
AWS_REGION="us-south"
AWS_ENDPOINT="https://s3.us-south.cloud-object-storage.appdomain.cloud"

# Application
NODE_ENV="production"
PORT="8080"
FRONTEND_URL="https://your-frontend-domain.com"
BACKEND_URL="https://afiyapulse-api.us-south.cf.appdomain.cloud"

# CORS
CORS_ORIGIN="https://your-frontend-domain.com"

# Session
SESSION_SECRET="your-production-session-secret-min-32-chars"

# Logging
LOG_LEVEL="info"

# Feature Flags
ENABLE_MCP_SERVERS="true"
ENABLE_DRUG_DATABASE="true"
ENABLE_FHIR_EHR="true"
ENABLE_APPOINTMENTS="true"
```

## Step 4: Deploy to IBM Cloud

### Option A: Deploy with Cloud Foundry

```bash
# Login to IBM Cloud
ibmcloud login

# Target Cloud Foundry
ibmcloud target --cf

# Push application
ibmcloud cf push afiyapulse-api -f manifest.yml

# Set environment variables
ibmcloud cf set-env afiyapulse-api DATABASE_URL "your-database-url"
ibmcloud cf set-env afiyapulse-api REDIS_URL "your-redis-url"
# ... set all other environment variables

# Restage application
ibmcloud cf restage afiyapulse-api
```

### Option B: Deploy with Code Engine (Recommended)

```bash
# Create Code Engine project
ibmcloud ce project create --name afiyapulse

# Select the project
ibmcloud ce project select --name afiyapulse

# Build container image
docker build -t afiyapulse-api:latest .

# Tag for IBM Container Registry
docker tag afiyapulse-api:latest \
  us.icr.io/<your-namespace>/afiyapulse-api:latest

# Push to IBM Container Registry
ibmcloud cr login
docker push us.icr.io/<your-namespace>/afiyapulse-api:latest

# Create application
ibmcloud ce application create \
  --name afiyapulse-api \
  --image us.icr.io/<your-namespace>/afiyapulse-api:latest \
  --cpu 1 \
  --memory 2G \
  --min-scale 1 \
  --max-scale 5 \
  --port 8080 \
  --env-from-configmap afiyapulse-config \
  --env-from-secret afiyapulse-secrets

# Create ConfigMap for non-sensitive config
ibmcloud ce configmap create afiyapulse-config \
  --from-literal NODE_ENV=production \
  --from-literal PORT=8080 \
  --from-literal LOG_LEVEL=info

# Create Secret for sensitive data
ibmcloud ce secret create afiyapulse-secrets \
  --from-literal DATABASE_URL="your-database-url" \
  --from-literal REDIS_URL="your-redis-url" \
  --from-literal JWT_SECRET="your-jwt-secret" \
  --from-literal WATSON_STT_API_KEY="your-watson-key" \
  --from-literal AWS_ACCESS_KEY_ID="your-cos-access-key" \
  --from-literal AWS_SECRET_ACCESS_KEY="your-cos-secret-key"
```

## Step 5: Run Database Migrations

```bash
# SSH into the application (Cloud Foundry)
ibmcloud cf ssh afiyapulse-api

# Or exec into Code Engine container
ibmcloud ce app exec --name afiyapulse-api

# Run migrations
cd /app
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

## Step 6: Configure Custom Domain (Optional)

### For Cloud Foundry:

```bash
# Map custom domain
ibmcloud cf map-route afiyapulse-api yourdomain.com \
  --hostname api

# Configure SSL certificate
ibmcloud cf create-domain <your-org> yourdomain.com
```

### For Code Engine:

```bash
# Create custom domain mapping
ibmcloud ce application update afiyapulse-api \
  --domain api.yourdomain.com
```

## Step 7: Set Up Monitoring

### Enable IBM Cloud Monitoring

```bash
# Create monitoring instance
ibmcloud resource service-instance-create afiyapulse-monitoring \
  sysdig-monitor graduated-tier us-south

# Bind to application (Cloud Foundry)
ibmcloud cf bind-service afiyapulse-api afiyapulse-monitoring
```

### Configure Log Analysis

```bash
# Create log analysis instance
ibmcloud resource service-instance-create afiyapulse-logs \
  logdna 7-day us-south

# View logs
ibmcloud cf logs afiyapulse-api --recent
```

## Step 8: Set Up CI/CD with GitHub Actions

See `.github/workflows/deploy-ibm-cloud.yml` for automated deployment pipeline.

## Step 9: Health Checks

Verify deployment:

```bash
# Check application status
ibmcloud cf app afiyapulse-api

# Or for Code Engine
ibmcloud ce application get --name afiyapulse-api

# Test health endpoint
curl https://afiyapulse-api.us-south.cf.appdomain.cloud/health

# Expected response:
# {
#   "status": "healthy",
#   "timestamp": "2026-05-02T16:42:00.000Z",
#   "uptime": 3600,
#   "database": "connected",
#   "redis": "connected"
# }
```

## Step 10: Security Hardening

### Enable HTTPS Only

```bash
# Cloud Foundry - force HTTPS
ibmcloud cf set-env afiyapulse-api FORCE_HTTPS true
```

### Configure IP Whitelisting (Optional)

```bash
# Add IP whitelist to environment
ibmcloud cf set-env afiyapulse-api IP_WHITELIST "1.2.3.4,5.6.7.8"
```

### Enable Rate Limiting

Rate limiting is already configured in the application. Adjust limits in `.env`:

```bash
RATE_LIMIT_WINDOW_MS="60000"
RATE_LIMIT_MAX_REQUESTS="100"
```

## Scaling

### Manual Scaling

```bash
# Cloud Foundry
ibmcloud cf scale afiyapulse-api -i 3

# Code Engine
ibmcloud ce application update afiyapulse-api \
  --min-scale 2 --max-scale 10
```

### Auto-scaling (Code Engine)

```bash
# Configure auto-scaling based on CPU
ibmcloud ce application update afiyapulse-api \
  --scale-down-delay 300 \
  --concurrency 100 \
  --concurrency-target 80
```

## Backup and Disaster Recovery

### Database Backups

Neon Postgres provides automatic backups. Configure retention:

1. Go to Neon Console
2. Select your project
3. Configure backup retention (7-30 days)

### Object Storage Backups

```bash
# Enable versioning on COS bucket
ibmcloud cos bucket-versioning-put \
  --bucket afiyapulse-audio \
  --versioning-configuration Status=Enabled
```

## Monitoring and Alerts

### Set Up Alerts

```bash
# Create alert for high CPU usage
ibmcloud monitoring alert-create \
  --name "High CPU Usage" \
  --condition "cpu.usage.percent > 80" \
  --notification-channel email
```

## Troubleshooting

### View Logs

```bash
# Cloud Foundry
ibmcloud cf logs afiyapulse-api --recent

# Code Engine
ibmcloud ce application logs --name afiyapulse-api
```

### Common Issues

1. **Database Connection Failed**
   - Verify `DATABASE_URL` is correct
   - Check Neon database is running
   - Verify SSL mode is enabled

2. **Redis Connection Failed**
   - Verify `REDIS_URL` is correct
   - Check Upstash Redis is accessible

3. **Watson STT Errors**
   - Verify API key is valid
   - Check service quota limits
   - Verify region matches URL

4. **COS Upload Failures**
   - Verify HMAC credentials are correct
   - Check bucket exists and is accessible
   - Verify endpoint URL matches region

## Cost Optimization

### Estimated Monthly Costs (Production)

- **Code Engine**: $50-100 (2 instances, 2GB RAM each)
- **IBM Cloud Object Storage**: $5-20 (100GB storage, 10K requests)
- **Watson Speech-to-Text**: $0.02/minute (varies by usage)
- **Neon Postgres**: $19-69 (Pro plan)
- **Upstash Redis**: $10-50 (Pay-as-you-go)

**Total**: ~$100-250/month

### Cost Reduction Tips

1. Use Code Engine auto-scaling to scale to zero during low traffic
2. Enable COS lifecycle policies to archive old audio files
3. Use Watson STT batch processing for non-real-time transcription
4. Optimize Redis cache TTL to reduce memory usage

## Support

For issues or questions:
- IBM Cloud Support: https://cloud.ibm.com/unifiedsupport
- AfiyaPulse Documentation: See README.md
- GitHub Issues: [Your repository URL]

## Next Steps

1. Set up frontend deployment
2. Configure CDN for static assets
3. Implement monitoring dashboards
4. Set up automated backups
5. Configure disaster recovery plan