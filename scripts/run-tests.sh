#!/bin/bash

# AfiyaPulse Test Runner Script
# This script runs all tests and generates reports

set -e

echo "🧪 AfiyaPulse Test Suite Runner"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if required services are running
echo "📋 Checking prerequisites..."

# Check PostgreSQL
if ! pg_isready -q; then
    echo -e "${RED}❌ PostgreSQL is not running${NC}"
    echo "Please start PostgreSQL and try again"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL is running${NC}"

# Check Redis
if ! redis-cli ping > /dev/null 2>&1; then
    echo -e "${RED}❌ Redis is not running${NC}"
    echo "Please start Redis and try again"
    exit 1
fi
echo -e "${GREEN}✅ Redis is running${NC}"

echo ""
echo "🔧 Setting up test environment..."

# Load test environment variables
if [ -f .env.test ]; then
    export $(cat .env.test | grep -v '^#' | xargs)
    echo -e "${GREEN}✅ Test environment variables loaded${NC}"
else
    echo -e "${YELLOW}⚠️  .env.test not found, using default test configuration${NC}"
fi

# Generate Prisma client
echo ""
echo "📦 Generating Prisma client..."
npm run db:generate > /dev/null 2>&1
echo -e "${GREEN}✅ Prisma client generated${NC}"

# Run database migrations
echo ""
echo "🗄️  Running database migrations..."
npm run db:migrate > /dev/null 2>&1
echo -e "${GREEN}✅ Database migrations completed${NC}"

# Run tests based on argument
echo ""
echo "🧪 Running tests..."
echo ""

case "$1" in
    "unit")
        echo "Running unit tests..."
        npm test -- --testPathPattern="services/__tests__" --verbose
        ;;
    "integration")
        echo "Running integration tests..."
        npm test -- --testPathPattern="routes/__tests__" --verbose
        ;;
    "e2e")
        echo "Running end-to-end tests..."
        npm test -- --testPathPattern="e2e-workflow.test" --verbose
        ;;
    "coverage")
        echo "Running all tests with coverage..."
        npm run test:coverage
        echo ""
        echo -e "${GREEN}✅ Coverage report generated${NC}"
        echo "View report: open coverage/lcov-report/index.html"
        ;;
    "ci")
        echo "Running tests for CI/CD..."
        npm run test:ci
        ;;
    "watch")
        echo "Running tests in watch mode..."
        npm run test:watch
        ;;
    *)
        echo "Running all tests..."
        npm test -- --verbose
        ;;
esac

TEST_EXIT_CODE=$?

echo ""
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
else
    echo -e "${RED}❌ Some tests failed${NC}"
    exit $TEST_EXIT_CODE
fi

echo ""
echo "📊 Test Summary"
echo "==============="
echo "Test suite completed successfully"
echo ""
echo "Available commands:"
echo "  ./scripts/run-tests.sh          - Run all tests"
echo "  ./scripts/run-tests.sh unit     - Run unit tests only"
echo "  ./scripts/run-tests.sh integration - Run integration tests only"
echo "  ./scripts/run-tests.sh e2e      - Run end-to-end tests only"
echo "  ./scripts/run-tests.sh coverage - Run tests with coverage report"
echo "  ./scripts/run-tests.sh ci       - Run tests for CI/CD"
echo "  ./scripts/run-tests.sh watch    - Run tests in watch mode"
echo ""

exit 0

# Made with Bob
