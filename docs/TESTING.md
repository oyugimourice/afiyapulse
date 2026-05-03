# AfiyaPulse Testing Guide

This document provides comprehensive information about testing AfiyaPulse.

## Table of Contents

1. [Test Setup](#test-setup)
2. [Running Tests](#running-tests)
3. [Test Structure](#test-structure)
4. [Writing Tests](#writing-tests)
5. [Test Coverage](#test-coverage)
6. [CI/CD Integration](#cicd-integration)

## Test Setup

### Prerequisites

```bash
# Install dependencies
npm install

# Set up test database
cp .env.example .env.test

# Update .env.test with test database credentials
TEST_DATABASE_URL="postgresql://test:test@localhost:5432/afiyapulse_test"
TEST_REDIS_URL="redis://localhost:6379/1"
```

### Test Database Setup

```bash
# Create test database
createdb afiyapulse_test

# Run migrations
DATABASE_URL=$TEST_DATABASE_URL npm run db:migrate

# Seed test data (optional)
DATABASE_URL=$TEST_DATABASE_URL npm run db:seed
```

## Running Tests

### All Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

### Specific Test Suites

```bash
# Run specific test file
npm test -- health.routes.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="Health Routes"

# Run tests in specific directory
npm test -- apps/api/src/routes/__tests__
```

## Test Structure

```
apps/api/src/
├── routes/
│   └── __tests__/
│       ├── health.routes.test.ts
│       ├── auth.routes.test.ts
│       └── consultation.routes.test.ts
├── services/
│   └── __tests__/
│       ├── auth.service.test.ts
│       ├── patient.service.test.ts
│       └── cache.service.test.ts
└── middleware/
    └── __tests__/
        ├── auth.middleware.test.ts
        └── rate-limit.middleware.test.ts
```

## Writing Tests

### Unit Tests

Unit tests focus on testing individual functions or methods in isolation.

```typescript
// Example: Testing a service method
import { PatientService } from '../patient.service';
import { prisma } from '@afiyapulse/database';

jest.mock('@afiyapulse/database');

describe('PatientService', () => {
  let patientService: PatientService;

  beforeEach(() => {
    patientService = new PatientService();
    jest.clearAllMocks();
  });

  describe('createPatient', () => {
    it('should create a new patient', async () => {
      const mockPatient = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        // ... other fields
      };

      (prisma.patient.create as jest.Mock).mockResolvedValue(mockPatient);

      const result = await patientService.createPatient({
        name: 'John Doe',
        email: 'john@example.com',
      });

      expect(result).toEqual(mockPatient);
      expect(prisma.patient.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: 'John Doe',
          email: 'john@example.com',
        }),
      });
    });
  });
});
```

### Integration Tests

Integration tests verify that different parts of the system work together correctly.

```typescript
// Example: Testing API endpoints
import request from 'supertest';
import { createApp } from '../../app';

describe('Patient API', () => {
  let app: any;
  let authToken: string;

  beforeAll(async () => {
    const appInstance = createApp();
    app = appInstance.app;

    // Login to get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'doctor@example.com',
        password: 'password123',
      });

    authToken = loginResponse.body.accessToken;
  });

  describe('POST /api/patients', () => {
    it('should create a new patient', async () => {
      const response = await request(app)
        .post('/api/patients')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Jane Doe',
          dateOfBirth: '1990-01-01',
          gender: 'FEMALE',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Jane Doe');
    });

    it('should return 401 without auth token', async () => {
      const response = await request(app)
        .post('/api/patients')
        .send({
          name: 'Jane Doe',
          dateOfBirth: '1990-01-01',
          gender: 'FEMALE',
        });

      expect(response.status).toBe(401);
    });
  });
});
```

### E2E Tests

End-to-end tests verify complete user workflows.

```typescript
// Example: Testing complete consultation workflow
describe('Consultation Workflow E2E', () => {
  it('should complete full consultation workflow', async () => {
    // 1. Create patient
    const patientResponse = await request(app)
      .post('/api/patients')
      .set('Authorization', `Bearer ${authToken}`)
      .send(patientData);

    const patientId = patientResponse.body.id;

    // 2. Start consultation
    const consultationResponse = await request(app)
      .post('/api/consultations')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ patientId });

    const consultationId = consultationResponse.body.id;

    // 3. Upload audio
    const audioResponse = await request(app)
      .post(`/api/consultations/${consultationId}/audio`)
      .set('Authorization', `Bearer ${authToken}`)
      .attach('audio', audioFilePath);

    expect(audioResponse.status).toBe(200);

    // 4. Wait for AI processing
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 5. Review generated documents
    const reviewResponse = await request(app)
      .get(`/api/review/consultation/${consultationId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(reviewResponse.body).toHaveProperty('soapNote');
    expect(reviewResponse.body).toHaveProperty('prescriptions');

    // 6. Approve documents
    const approveResponse = await request(app)
      .post(`/api/review/consultation/${consultationId}/approve`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(approveResponse.status).toBe(200);
  });
});
```

## Test Coverage

### Coverage Reports

After running tests with coverage, view the report:

```bash
# Generate coverage report
npm run test:coverage

# Open HTML coverage report
open coverage/lcov-report/index.html
```

### Coverage Thresholds

We maintain the following coverage thresholds:

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

### Improving Coverage

1. Identify uncovered code:
   ```bash
   npm run test:coverage
   ```

2. Write tests for uncovered areas
3. Focus on critical paths first
4. Add edge case tests

## CI/CD Integration

### GitHub Actions

Tests run automatically on:
- Pull requests
- Pushes to main/production branches
- Manual workflow dispatch

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, production]
  pull_request:
    branches: [main, production]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:ci
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### Pre-commit Hooks

Set up pre-commit hooks to run tests before commits:

```bash
# Install husky
npm install --save-dev husky

# Set up pre-commit hook
npx husky install
npx husky add .husky/pre-commit "npm test"
```

## Best Practices

### 1. Test Naming

Use descriptive test names that explain what is being tested:

```typescript
// Good
it('should return 404 when patient does not exist', async () => {});

// Bad
it('test patient', async () => {});
```

### 2. Arrange-Act-Assert Pattern

Structure tests clearly:

```typescript
it('should create patient with valid data', async () => {
  // Arrange
  const patientData = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  // Act
  const result = await patientService.createPatient(patientData);

  // Assert
  expect(result).toHaveProperty('id');
  expect(result.name).toBe('John Doe');
});
```

### 3. Test Isolation

Each test should be independent:

```typescript
beforeEach(async () => {
  // Clean up database
  await prisma.patient.deleteMany();
  
  // Reset mocks
  jest.clearAllMocks();
});
```

### 4. Mock External Services

Always mock external services:

```typescript
jest.mock('../services/watson-stt.service', () => ({
  transcribeAudio: jest.fn().mockResolvedValue('transcribed text'),
}));
```

### 5. Test Error Cases

Don't just test happy paths:

```typescript
it('should handle database connection errors', async () => {
  (prisma.patient.create as jest.Mock).mockRejectedValue(
    new Error('Database connection failed')
  );

  await expect(
    patientService.createPatient(patientData)
  ).rejects.toThrow('Database connection failed');
});
```

## Debugging Tests

### Run Single Test

```bash
npm test -- --testNamePattern="should create patient"
```

### Enable Verbose Output

```bash
npm test -- --verbose
```

### Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

## Common Issues

### Issue: Tests timeout

**Solution**: Increase timeout in jest.config.js:

```javascript
module.exports = {
  testTimeout: 30000, // 30 seconds
};
```

### Issue: Database connection errors

**Solution**: Ensure test database is running and accessible:

```bash
# Check database connection
psql $TEST_DATABASE_URL -c "SELECT 1"
```

### Issue: Redis connection errors

**Solution**: Ensure Redis is running:

```bash
# Check Redis connection
redis-cli -u $TEST_REDIS_URL ping
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://testingjavascript.com/)

## Support

For testing issues or questions:
- Check existing tests for examples
- Review this documentation
- Ask in team chat
- Create an issue in the repository