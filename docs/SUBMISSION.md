 # AfiyaPulse — Competition Submission

## Project Information

- **Project Name:** AfiyaPulse
- **Team Lead:** Maurice Oyugi <oyugimaurice22@gmail.com>
- **Submission Date:** May 3, 2026
- **Category:** Healthcare AI Innovation

---

## Video Demonstration

- **Video Demo URL:** (placeholder — add final recording link)

Video overview: live consultation recording with real-time AI transcription, agent-generated SOAP notes/prescriptions/referrals, review panel with inline editing and approvals, dashboard analytics, and PDF/email export.

---

## Problem & Solution Summary

Clinician documentation is a major drain on time and quality of care: physicians often spend multiple hours on paperwork for every hour of patient-facing care, causing burnout, reduced patient interaction, documentation errors, delayed follow-ups, and revenue loss. AfiyaPulse reduces this burden by automating clinical documentation through secure, auditable AI workflows.

Key features:

- Ambient, HIPAA-aware transcription using IBM Watson Speech-to-Text with speaker labeling and medical vocabulary tuning.
- Multi-agent AI system for generating structured clinical notes (SOAP), drafting prescriptions with interaction checks, composing referrals, and suggesting follow-ups.
- Review interface showing transcripts alongside editable AI drafts, with tracked edits, batch approvals, and QA checks.
- PDF generation, secure cloud storage, automated notifications, and FHIR-compatible integration points for EHRs.

Impact: validated reductions in documentation time and error rates, enabling clinicians to spend more time with patients and improving coding accuracy.

---

## Technology & Integrations

- **Agents & LLMs:** LangChain + LangGraph; LLMs (OpenAI/Anthropic) for drafting and summarization.
- **Transcription:** IBM Watson Speech-to-Text (real-time streaming, speaker diarization, medical vocabulary).
- **Backend:** Node.js + Express + TypeScript, Prisma + PostgreSQL, Redis, Socket.io.
- **Frontend:** React 18 + TypeScript + Vite, Tailwind CSS, Zustand.
- **Infra & Storage:** IBM Cloud Object Storage, Docker, Turborepo, GitHub Actions.

Typical flow: frontend records audio → backend streams to Watson STT → transcripts returned → agents generate drafts → clinician reviews/approves → documents stored/exported and available via FHIR endpoints.

---

## Development Assistance (IBM Bob)

We used IBM Bob as an engineering assistant to accelerate architecture design, prototype generation, and integration work. All generated code was reviewed and adapted by the team to meet clinical, security, and regulatory requirements.

---

## Repository & Demos

- **Repository URL:** (add public GitHub repo link before submitting)
- **API docs:** docs/API.md
- **Demo & slides:** (links to be added)

Repo layout: `apps/api`, `apps/web`, `mcp-servers`, `packages/database`, `packages/shared-types`. Exported Bob session history is in `bob_sessions/`.

---

## Team

- **Maurice Oyugi** — Team Lead (full-stack development, agent architecture, Watson integration, project management)

---

## Submission Checklist

- [x] Written problem and solution summary
- [x] Technology statement and integrations
- [ ] Video demonstration URL (to record and add)
- [ ] Public GitHub repository URL (to add)
- [ ] Exported Bob session report
- [ ] Live demo deployment (recommended)

---

## Contact

- Maurice Oyugi — oyugimaurice22@gmail.com

---

Please replace placeholder links (video, repository) before final submission. I can also draft a short demo script or a one-slide summary if you want.
