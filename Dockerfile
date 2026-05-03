# AfiyaPulse - Multi-stage Docker build for IBM Cloud deployment
# Stage 1: Build dependencies and compile TypeScript
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache python3 make g++ git

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.json ./

# Copy workspace packages
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm ci --legacy-peer-deps

# Generate Prisma Client
RUN npm run db:generate

# Build all packages
RUN npm run build

# Stage 2: Production runtime
FROM node:20-alpine AS runner

# Install production dependencies only
RUN apk add --no-cache dumb-init curl

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy built artifacts from builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/apps ./apps
COPY --from=builder --chown=nodejs:nodejs /app/packages ./packages
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/turbo.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port (IBM Cloud uses 8080 by default)
EXPOSE 8080

# Switch to non-root user
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the API server
CMD ["node", "apps/api/dist/index.js"]
