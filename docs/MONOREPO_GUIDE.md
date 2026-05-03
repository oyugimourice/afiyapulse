# AfiyaPulse Monorepo Guide

This document explains the monorepo structure and how to work with it effectively.

## Overview

AfiyaPulse uses a monorepo architecture managed by npm workspaces and Turborepo. This allows us to:

- Share code between packages
- Manage dependencies centrally
- Build and test efficiently with caching
- Maintain consistent tooling across projects

## Structure

```sh
afiyapulse/
├── apps/                          # Application packages
│   ├── api/                       # Backend API (Node.js + Express)
│   ├── web/                       # Frontend web app (React + Vite)
│   └── mcp-servers/              # MCP server implementations
│       ├── appointment-system/
│       ├── drug-database/
│       └── fhir-ehr/
├── packages/                      # Shared packages
│   ├── database/                  # Prisma database client
│   └── shared-types/             # Shared TypeScript types
├── docs/                         # Documentation
├── package.json                  # Root package.json with workspaces
└── turbo.json                    # Turborepo configuration
```

## Workspaces

### Apps

#### `@afiyapulse/api`

- **Location**: `apps/api/`
- **Purpose**: Backend REST API and WebSocket server
- **Tech**: Node.js 20, Express, TypeScript, Prisma
- **Port**: 3001
- **Dependencies**: `@afiyapulse/database`, `@afiyapulse/shared-types`

#### `@afiyapulse/web`

- **Location**: `apps/web/`
- **Purpose**: Frontend web application
- **Tech**: React 18, Vite, TypeScript, Tailwind CSS
- **Port**: 3000
- **Dependencies**: `@afiyapulse/shared-types`

#### MCP Servers

- **Location**: `apps/mcp-servers/*/`
- **Purpose**: Model Context Protocol servers for AI agents
- **Tech**: TypeScript, MCP SDK
- **Servers**:
  - `appointment-system` - Appointment scheduling
  - `drug-database` - Drug information lookup
  - `fhir-ehr` - FHIR EHR integration

### Packages

#### `@afiyapulse/database`

- **Location**: `packages/database/`
- **Purpose**: Prisma database client and migrations
- **Exports**: Prisma client, database utilities
- **Used by**: `@afiyapulse/api`

#### `@afiyapulse/shared-types`

- **Location**: `packages/shared-types/`
- **Purpose**: Shared TypeScript types and interfaces
- **Exports**: API types, domain models, WebSocket events
- **Used by**: `@afiyapulse/api`, `@afiyapulse/web`

## Package Dependencies

```sh
@afiyapulse/api
  ├── @afiyapulse/database
  └── @afiyapulse/shared-types

@afiyapulse/web
  └── @afiyapulse/shared-types

@afiyapulse/database
  └── (no internal dependencies)

@afiyapulse/shared-types
  └── (no internal dependencies)
```

## Common Commands

### Development

```bash
# Run all apps in development mode
npm run dev

# Run specific app
npm run dev:api      # API only
npm run dev:web      # Web only

# Run from specific workspace
cd apps/api && npm run dev
cd apps/web && npm run dev
```

### Building

```bash
# Build all packages
npm run build

# Build specific package
npm run build:api
npm run build:web

# Build from workspace
cd apps/api && npm run build
```

### Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run CI tests
npm run test:ci
```

### Linting & Formatting

```bash
# Lint all packages
npm run lint

# Format all files
npm run format
```

### Database Operations

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Run migrations
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

### Cleaning

```bash
# Clean all build artifacts
npm run clean

# Clean specific workspace
cd apps/api && npm run clean
cd apps/web && npm run clean
```

## Working with Shared Packages

### Using Shared Types

In any workspace, import from `@afiyapulse/shared-types`:

```typescript
// apps/api/src/services/patient.service.ts
import { Patient, CreatePatientDTO } from '@afiyapulse/shared-types';

// apps/web/src/services/patient.service.ts
import { Patient, CreatePatientDTO } from '@afiyapulse/shared-types';
```

### Using Database Client

Only in the API:

```typescript
// apps/api/src/services/patient.service.ts
import { prisma } from '@afiyapulse/database';

const patient = await prisma.patient.findUnique({
  where: { id: patientId }
});
```

### Adding New Shared Types

1. Add types to `packages/shared-types/src/`
2. Export from `packages/shared-types/src/index.ts`
3. Types are automatically available in all workspaces

```typescript
// packages/shared-types/src/appointment.ts
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledAt: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
}

// packages/shared-types/src/index.ts
export * from './appointment';
```

## Turborepo Configuration

### Pipeline Tasks

Defined in `turbo.json`:

- **build**: Builds packages with dependency awareness
- **dev**: Runs development servers (no caching)
- **lint**: Lints code
- **test**: Runs tests with caching
- **clean**: Cleans build artifacts
- **db:generate**: Generates Prisma client
- **db:push**: Pushes schema to database
- **db:migrate**: Runs database migrations
- **db:studio**: Opens Prisma Studio

### Task Dependencies

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    }
  }
}
```

- `^build` means "build dependencies first"
- Ensures packages are built in correct order

### Caching

Turborepo caches task outputs for faster rebuilds:

- Build outputs are cached
- Test results are cached
- Only changed packages are rebuilt

## Adding New Packages

### Adding a New App

1. Create directory in `apps/`:

```bash
mkdir apps/new-app
cd apps/new-app
npm init -y
```

1. Update `package.json`:

```json
{
  "name": "@afiyapulse/new-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "...",
    "build": "...",
    "lint": "...",
    "clean": "..."
  }
}
```

1. Add dependencies:

```bash
npm install @afiyapulse/shared-types
```

1. Install from root:

```bash
cd ../..
npm install
```

### Adding a New Shared Package

1. Create directory in `packages/`:

```bash
mkdir packages/new-package
cd packages/new-package
npm init -y
```

1. Update `package.json`:

```json
{
  "name": "@afiyapulse/new-package",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts"
}
```

1. Create entry point:

```bash
mkdir src
touch src/index.ts
```

1. Install from root:

```bash
cd ../..
npm install
```

1. Use in other packages:

```json
{
  "dependencies": {
    "@afiyapulse/new-package": "*"
  }
}
```

## Dependency Management

### Installing Dependencies

```bash
# Install in root (affects all workspaces)
npm install <package>

# Install in specific workspace
npm install <package> -w @afiyapulse/api
npm install <package> -w @afiyapulse/web

# Install dev dependency
npm install -D <package> -w @afiyapulse/api
```

### Updating Dependencies

```bash
# Update all dependencies
npm update

# Update specific package
npm update <package>

# Update in specific workspace
npm update <package> -w @afiyapulse/api
```

### Removing Dependencies

```bash
# Remove from specific workspace
npm uninstall <package> -w @afiyapulse/api
```

## Best Practices

### 1. Shared Code

- Put shared types in `@afiyapulse/shared-types`
- Put shared utilities in appropriate packages
- Don't duplicate code across workspaces

### 2. Dependencies

- Use workspace protocol (`*`) for internal dependencies
- Keep external dependencies up to date
- Use exact versions for critical dependencies

### 3. Building

- Always build from root: `npm run build`
- Let Turborepo handle build order
- Don't manually build dependencies

### 4. Testing

- Write tests in each workspace
- Run tests from root for full coverage
- Use `npm run test:ci` in CI/CD

### 5. Type Safety

- Use TypeScript everywhere
- Enable strict mode
- Share types via `@afiyapulse/shared-types`

### 6. Git

- Commit from root directory
- Include all changed workspaces in commits
- Use conventional commit messages

## Troubleshooting

### "Cannot find module '@afiyapulse/...'"

```bash
# Reinstall dependencies
npm install

# Rebuild packages
npm run build
```

### "Port already in use"

```bash
# Kill process on port
npx kill-port 3000
npx kill-port 3001
```

### Build errors after pulling changes

```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

### Type errors in IDE

```bash
# Regenerate types
npm run db:generate
npm run build

# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

### Turborepo cache issues

```bash
# Clear Turborepo cache
rm -rf .turbo
npm run build
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
      
      - name: Test
        run: npm run test:ci
```

## Performance Tips

1. **Use Turborepo caching**: Let Turbo cache build outputs
2. **Parallel execution**: Turbo runs tasks in parallel when possible
3. **Incremental builds**: Only changed packages are rebuilt
4. **Remote caching**: Configure remote cache for team sharing (optional)

## Resources

- [npm Workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Monorepo Best Practices](https://monorepo.tools/)

## Support

For questions or issues:

1. Check this guide
2. Review package-specific READMEs
3. Check Turborepo documentation
4. Contact the development team
