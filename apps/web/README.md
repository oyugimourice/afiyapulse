# AfiyaPulse Web Application

Frontend application for AfiyaPulse - AI-powered clinical documentation automation.

## Tech Stack

- **Framework**: React 18.3+ with TypeScript
- **Build Tool**: Vite 5.0+
- **Styling**: Tailwind CSS 3.4+
- **State Management**: Zustand
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod
- **Icons**: Heroicons

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080
VITE_APP_NAME=AfiyaPulse
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```sh
src/
├── components/       # Reusable UI components
│   ├── layout/      # Layout components (Sidebar, TopBar, etc.)
│   └── ui/          # UI components (Button, Input, etc.)
├── pages/           # Page components
│   ├── auth/        # Authentication pages
│   ├── dashboard/   # Dashboard pages
│   ├── patients/    # Patient management pages
│   ├── consultations/ # Consultation pages
│   ├── review/      # Review panel pages
│   └── settings/    # Settings pages
├── hooks/           # Custom React hooks
├── services/        # API services
├── store/           # Zustand stores
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Features

### Implemented

- ✅ Project setup with Vite + React + TypeScript
- ✅ Tailwind CSS configuration
- ✅ Authentication system (login/register)
- ✅ Protected routes
- ✅ Main layout with sidebar and top bar
- ✅ API client with token refresh
- ✅ State management with Zustand

### In Progress

- 🚧 Dashboard with analytics
- 🚧 Patient management
- 🚧 Consultation recording interface
- 🚧 Review panel
- 🚧 Real-time features with WebSocket

### Planned

- 📋 Audio recording and streaming
- 📋 Real-time transcription display
- 📋 Document generation preview
- 📋 Notification system
- 📋 Advanced search and filtering
- 📋 Reporting and analytics

## Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow React best practices and hooks guidelines
- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations
- Use Tailwind CSS utility classes for styling

### Component Guidelines

- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper TypeScript types
- Add JSDoc comments for complex components
- Implement proper accessibility (a11y)

### State Management

- Use Zustand for global state
- Use React hooks (useState, useEffect) for local state
- Persist auth state to localStorage
- Implement proper error boundaries

## API Integration

The frontend communicates with the backend API at `http://localhost:8080/api`.

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Patients

- `GET /api/patients` - List patients
- `GET /api/patients/:id` - Get patient details
- `POST /api/patients` - Create patient
- `PUT /api/patients/:id` - Update patient

### Consultations

- `POST /api/consultations` - Start consultation
- `GET /api/consultations/:id` - Get consultation details
- `PUT /api/consultations/:id/end` - End consultation

### WebSocket

Real-time updates are handled via WebSocket connection at `ws://localhost:8080/ws`.

Events:

- `transcript:update` - Real-time transcription updates
- `agent:status` - Agent processing status
- `document:generated` - Document generation complete

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## License

Copyright © 2026 AfiyaPulse. All rights reserved.
