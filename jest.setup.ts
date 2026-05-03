// Jest setup file for global test configuration

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://test:test@localhost:5432/afiyapulse_test';
process.env.REDIS_URL = process.env.TEST_REDIS_URL || 'redis://localhost:6379';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.JWT_EXPIRES_IN = '15m';
process.env.JWT_REFRESH_EXPIRES_IN = '7d';
process.env.SESSION_SECRET = 'test-session-secret';
process.env.LOG_LEVEL = 'error'; // Reduce log noise during tests

// Mock external services
jest.mock('./apps/api/src/config/logger', () => ({
  default: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

// Increase timeout for integration tests
jest.setTimeout(30000);

// Global test utilities
global.beforeAll(async () => {
  // Setup code that runs before all tests
});

global.afterAll(async () => {
  // Cleanup code that runs after all tests
});

// Made with Bob
