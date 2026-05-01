# AfiyaPulse

> Ambient AI agent system for clinical documentation automation

AfiyaPulse is an intelligent clinical documentation system that uses AI agents to automatically generate SOAP notes, prescriptions, referral letters, and follow-up appointments from doctor-patient consultations in real-time.

## 🎯 Problem Statement

Healthcare professionals spend an average of **2.3 hours per day** (575 hours/year) on administrative documentation, contributing to:

- 65% physician burnout rate
- Increased medical errors
- Reduced patient care time
- Systemic healthcare delivery failures

## 💡 Solution

AfiyaPulse provides an **ambient AI agent system** that:

- ✅ Works invisibly in real-time with **one-button activation**
- ✅ Orchestrates **4 specialist AI agents** running in parallel
- ✅ Generates complete documentation packages automatically
- ✅ Maintains **human-in-the-loop** control with single-click approval
- ✅ Recovers **575 hours/year per doctor**

## 🏗️ Architecture

### Technology Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: Neon Postgres (serverless) + Prisma 7 ORM
- **Cache**: Redis (Upstash)
- **AI/ML**: IBM Watson Speech-to-Text + OpenAI GPT-4/Claude 3.5 Sonnet
- **Agent Orchestration**: LangChain/LangGraph
- **Infrastructure**: Docker + Turborepo (monorepo)

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │ Consultation │  │ Review Panel │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              API Gateway (Express + WebSocket)               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Supervisor Agent                            │
│  ┌──────────────┬──────────────┬──────────────┬──────────┐ │
│  │   Clinical   │ Prescription │   Referral   │ Follow-up│ │
│  │    Scribe    │   Drafter    │    Writer    │ Scheduler│ │
│  │    Agent     │    Agent     │    Agent     │   Agent  │ │
│  └──────────────┴──────────────┴──────────────┴──────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      MCP Servers                             │
│  ┌──────────────┬──────────────┬──────────────┐            │
│  │     Drug     │   FHIR EHR   │ Appointment  │            │
│  │   Database   │  Connector   │    System    │            │
│  └──────────────┴──────────────┴──────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│         Data Layer (Neon Postgres + Redis)                   │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Project Structure

```
afiyapulse/
├── apps/
│   ├── web/                    # Next.js frontend application
│   └── api/                    # Express backend API
├── packages/
│   ├── database/               # Prisma schema & client
│   ├── shared-types/           # TypeScript type definitions
│   ├── mcp-sdk/               # MCP server utilities
│   └── config/                # Shared configurations
├── docs/                      # Documentation
├── docker/                    # Docker configurations
└── IMPLEMENTATION_PLAN.md     # Detailed implementation guide
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Neon Postgres account
- IBM Watson Speech-to-Text API key
- OpenAI API key (or Anthropic Claude)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/afiyapulse.git
   cd afiyapulse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your credentials:
   - `DATABASE_URL` - Neon Postgres connection string
   - `WATSON_STT_API_KEY` - IBM Watson API key
   - `OPENAI_API_KEY` - OpenAI API key
   - `JWT_SECRET` - Random secret for JWT tokens
   - `AWS_*` - AWS S3 credentials for audio storage

4. **Set up the database**

   ```bash
   npm run db:generate    # Generate Prisma client
   npm run db:push        # Push schema to database
   npm run db:seed        # Seed with sample data
   ```

5. **Start development servers**

   ```bash
   npm run dev
   ```

   This starts:
   - Frontend: <http://localhost:3000>
   - Backend API: <http://localhost:3001>

### Default Login Credentials

After seeding the database:

- **Admin**: `admin@afiyapulse.com` / `Admin@123`
- **Doctor**: `dr.smith@afiyapulse.com` / `Doctor@123`

## 🎯 Key Features

### 1. One-Button Recording

- Start consultation with single button press
- Real-time audio streaming to IBM Watson STT
- Live transcript display with speaker diarization

### 2. Parallel AI Agent System

- **Clinical Scribe Agent**: Generates structured SOAP notes
- **Prescription Drafter Agent**: Creates prescriptions with drug interaction checks
- **Referral Writer Agent**: Drafts specialist referral letters
- **Follow-up Scheduler Agent**: Books follow-up appointments

### 3. Review & Approval Workflow

- Unified review panel for all generated documents
- Side-by-side transcript comparison
- Inline editing capabilities
- Single-click approval or rejection

### 4. MCP Server Integrations

- **Drug Database**: Validates medications and checks interactions
- **FHIR EHR**: Retrieves patient history and records
- **Appointment System**: Manages scheduling and reminders

### 5. Security & Compliance

- End-to-end encryption for audio and transcripts
- HIPAA-compliant data storage
- Role-based access control (RBAC)
- Comprehensive audit logging

## 📊 Database Schema

The system uses Prisma 7 with the following core models:

- **User**: Doctors, nurses, and administrators
- **Patient**: Patient demographics and medical information
- **Consultation**: Consultation sessions and metadata
- **Transcript**: Real-time speech-to-text transcripts
- **SOAPNote**: Structured clinical notes
- **Prescription**: Medication prescriptions
- **Referral**: Specialist referrals
- **Appointment**: Follow-up appointments
- **AuditLog**: Compliance and audit trail

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 Development Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow TypeScript best practices
   - Write tests for new features
   - Update documentation

3. **Run linting and tests**

   ```bash
   npm run lint
   npm test
   ```

4. **Commit and push**

   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create a pull request**

## 📚 Documentation

- [Implementation Plan](./IMPLEMENTATION_PLAN.md) - Detailed development roadmap
- [Architecture](./docs/architecture.md) - System architecture details
- [API Reference](./docs/api-reference.md) - API endpoint documentation
- [Deployment Guide](./docs/deployment.md) - Production deployment instructions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [IBM Bob](https://ibm.com/bob) as the primary development partner
- Powered by IBM Watson Speech-to-Text
- Uses Model Context Protocol (MCP) for agent orchestration

## 📞 Support

For support, email <support@afiyapulse.com> or join our [Discord community](https://discord.gg/afiyapulse).

---

**Made with ❤️ for healthcare professionals worldwide**
