# AfiyaPulse Documentation

Welcome to the AfiyaPulse documentation. This directory contains comprehensive guides and references for developing, deploying, and maintaining the AfiyaPulse clinical documentation system.

## 📚 Documentation Index

### Getting Started

- **[Main README](../README.md)** - Project overview, features, and quick start guide
- **[Commands Reference](COMMANDS.md)** - Complete command reference for all operations
- **[Environment Setup](.env.example)** - Environment variables configuration guide

### Development

- **[API Documentation](API.md)** - Complete REST API reference with all endpoints
- **[Testing Guide](TESTING.md)** - Testing setup, writing tests, and best practices
- **[Consultation Recording](CONSULTATION_RECORDING.md)** - Real-time consultation recording system

### Deployment

- **[IBM Cloud Deployment](DEPLOYMENT.md)** - Complete IBM Cloud deployment guide
- **[Docker Configuration](../Dockerfile)** - Container configuration and build process
- **[CI/CD Pipeline](../.github/workflows/deploy-ibm-cloud.yml)** - Automated deployment workflow

### Architecture

- **[Agent System Architecture](Agent-system-architecture.png)** - Visual diagram of AI agent system
- **[Implementation Plan](../IMPLEMENTATION_PLAN.md)** - Complete project implementation roadmap

## 🚀 Quick Links

### For Developers

```bash
# Start development
npm run dev

# Run tests
npm test

# View API docs
open docs/API.md
```

### For DevOps

```bash
# Build Docker image
npm run docker:build

# Deploy to IBM Cloud
ibmcloud ce application update --name afiyapulse-api

# View deployment guide
open docs/DEPLOYMENT.md
```

### For QA

```bash
# Run all tests
npm run test:coverage

# View testing guide
open docs/TESTING.md
```

## 📖 Documentation Structure

```sh
docs/
├── README.md                      # This file - Documentation index
├── API.md                         # REST API reference (700 lines)
├── COMMANDS.md                    # Command reference (467 lines)
├── DEPLOYMENT.md                  # IBM Cloud deployment guide (437 lines)
├── TESTING.md                     # Testing guide (467 lines)
├── CONSULTATION_RECORDING.md      # Consultation system documentation
└── Agent-system-architecture.png  # Architecture diagram
```

## 🎯 Key Features Documented

### 1. AI Agent System

- **Supervisor Agent** - Orchestrates 4 specialist agents
- **Clinical Scribe Agent** - Generates SOAP notes
- **Prescription Drafter Agent** - Creates prescriptions with drug interaction checks
- **Referral Writer Agent** - Drafts specialist referral letters
- **Follow-up Scheduler Agent** - Automates appointment booking

### 2. Backend Infrastructure

- **Authentication** - JWT-based auth with refresh tokens
- **Database** - Prisma 7 with Neon Postgres
- **Caching** - Redis for performance optimization
- **Storage** - IBM Cloud Object Storage for audio files
- **Real-time** - WebSocket server for live updates

### 3. Security & Compliance

- **HIPAA Compliance** - Audit logging, encryption, access controls
- **Data Encryption** - AES-256-GCM for PHI data
- **Rate Limiting** - Distributed rate limiting with Redis
- **Security Headers** - Helmet, CORS, CSP, HSTS

### 4. Deployment

- **Docker** - Multi-stage builds for production
- **IBM Cloud** - Code Engine and Cloud Foundry support
- **CI/CD** - GitHub Actions automated deployment
- **Monitoring** - Health checks, metrics, logging

## 📝 Documentation Guidelines

### Writing Documentation

1. **Be Clear and Concise** - Use simple language
2. **Include Examples** - Show code snippets and commands
3. **Keep Updated** - Update docs when code changes
4. **Use Markdown** - Follow standard markdown formatting
5. **Add Links** - Cross-reference related documentation

### Documentation Standards

- Use `#` for main titles
- Use `##` for sections
- Use `###` for subsections
- Use code blocks with language specification
- Include table of contents for long documents
- Add "Made with Bob" footer to generated files

## 🔗 External Resources

### IBM Cloud

- [IBM Cloud Documentation](https://cloud.ibm.com/docs)
- [IBM Code Engine](https://cloud.ibm.com/docs/codeengine)
- [IBM Cloud Object Storage](https://cloud.ibm.com/docs/cloud-object-storage)
- [IBM Watson Speech-to-Text](https://cloud.ibm.com/docs/speech-to-text)

### Development Tools

- [Prisma Documentation](https://www.prisma.io/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Jest Documentation](https://jestjs.io/docs)

### Best Practices

- [REST API Design](https://restfulapi.net/)
- [HIPAA Compliance](https://www.hhs.gov/hipaa/index.html)
- [Security Best Practices](https://owasp.org/www-project-top-ten/)

## 🤝 Contributing

When contributing to documentation:

1. **Check Existing Docs** - Avoid duplication
2. **Follow Structure** - Maintain consistent formatting
3. **Test Commands** - Verify all commands work
4. **Update Index** - Add new docs to this README
5. **Review Changes** - Have someone review your docs

## 📞 Support

For questions or issues:

- **Technical Issues** - Create a GitHub issue
- **Documentation Issues** - Submit a pull request
- **General Questions** - Contact the development team

## 📄 License

This documentation is part of the AfiyaPulse project and follows the same license.

---

**Last Updated**: 2026-05-02  
**Version**: 1.0.0  
**Maintained By**: AfiyaPulse Development Team
