# AfiyaPulse Web Application

React-based frontend for the AfiyaPulse clinical documentation automation system.

## Overview

This is the web interface for AfiyaPulse, built with React 18, TypeScript, and Vite. It provides doctors with an intuitive interface for:

- Patient management
- Real-time consultation recording with AI transcription
- AI-generated clinical documentation review and editing
- Dashboard with analytics and insights
- Appointment scheduling
- Document generation (SOAP notes, prescriptions, referrals)

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Icons**: Heroicons

## Monorepo Integration

This app is part of the AfiyaPulse monorepo and uses shared packages:

- `@afiyapulse/shared-types` - Shared TypeScript types and interfaces
- Workspace dependencies are automatically linked via npm workspaces

## Project Structure

```
apps/web/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── layout/      # Layout components (Sidebar, MainLayout)
│   │   ├── patients/    # Patient management components
│   │   ├── review/      # Document review components
│   │   └── ui/          # Base UI components (Button, Input, etc.)
│   ├── pages/           # Page components
│   │   ├── dashboard/   # Dashboard page
│   │   ├── patients/    # Patient pages
│   │   └── settings/    # Settings page
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service layer
│   ├── store/           # Zustand stores
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Development

### Prerequisites

- Node.js 18+ and npm 9+
- Running API server (see `apps/api`)

### Environment Variables

Create a `.env` file in `apps/web/`:

```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

### Commands

From the monorepo root:

```bash
# Install dependencies
npm install

# Run web app only
npm run dev:web

# Run both API and web
npm run dev

# Build web app
npm run build:web

# Preview production build
cd apps/web && npm run preview

# Type checking
cd apps/web && npm run type-check

# Linting
cd apps/web && npm run lint
```

From `apps/web/` directory:

```bash
# Development server (port 3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Clean build artifacts
npm run clean
```

## API Integration

The web app connects to the API server via:

- **REST API**: Proxied through Vite dev server (`/api/*` → `http://localhost:3001`)
- **WebSocket**: Direct connection for real-time updates (`ws://localhost:3001`)

### API Services

All API interactions are abstracted through service modules:

- `auth.service.ts` - Authentication (login, register, logout)
- `patient.service.ts` - Patient CRUD operations
- `consultation.service.ts` - Consultation management
- `review.service.ts` - Document review and approval
- `dashboard.service.ts` - Dashboard statistics
- `pdf.service.ts` - PDF generation and download

## Features

### 1. Authentication
- JWT-based authentication
- Role-based access control (Doctor, Admin)
- Secure token storage
- Auto-refresh on token expiry

### 2. Patient Management
- Patient registration and profile management
- Medical history tracking
- Search and filtering
- Patient detail view with consultation history

### 3. Consultation Recording
- Real-time audio recording
- Live transcription display
- AI agent status monitoring
- WebSocket-based updates

### 4. Document Review Panel
- SOAP note review and editing
- Prescription review with drug database integration
- Referral letter review
- Batch approval workflow
- Real-time agent status indicators

### 5. Dashboard
- Statistics overview (patients, consultations, pending reviews)
- Recent activity feed
- Quick actions
- Performance metrics

### 6. Document Generation
- PDF generation for SOAP notes, prescriptions, referrals
- Batch PDF generation
- Download and preview functionality

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { patientService } from '@/services/patient.service';
```

Available aliases:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/pages/*` → `./src/pages/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/services/*` → `./src/services/*`
- `@/store/*` → `./src/store/*`
- `@/utils/*` → `./src/utils/*`

## State Management

Uses Zustand for lightweight state management:

- `authStore.ts` - Authentication state (user, token, login/logout)
- Additional stores can be added as needed

## Real-time Features

WebSocket integration for live updates:

- Consultation transcription updates
- Agent status changes
- Document generation progress
- System notifications

## Styling

Tailwind CSS with custom configuration:

- Custom color palette matching medical theme
- Responsive design utilities
- Custom components with consistent styling
- Dark mode support (planned)

## Type Safety

Full TypeScript coverage with:

- Shared types from `@afiyapulse/shared-types`
- Strict type checking enabled
- Zod schemas for runtime validation
- Type-safe API responses

## Testing

Testing setup (to be implemented):

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Build & Deployment

### Production Build

```bash
# From monorepo root
npm run build:web

# Or from apps/web
npm run build
```

Build output: `apps/web/dist/`

### Deployment Options

1. **Static Hosting** (Vercel, Netlify, Cloudflare Pages)
   - Deploy `dist/` folder
   - Configure environment variables
   - Set up API proxy or CORS

2. **Docker** (with nginx)
   - Build production bundle
   - Serve with nginx
   - Configure reverse proxy to API

3. **CDN** (AWS S3 + CloudFront)
   - Upload `dist/` to S3
   - Configure CloudFront distribution
   - Set up API Gateway integration

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Performance

- Code splitting with React.lazy
- Route-based lazy loading
- Optimized bundle size
- Asset optimization with Vite

## Security

- XSS protection via React
- CSRF token handling
- Secure token storage
- Input sanitization
- Content Security Policy headers

## Contributing

1. Follow the existing code structure
2. Use TypeScript for all new code
3. Follow the component naming conventions
4. Add proper TypeScript types
5. Test thoroughly before committing

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000
```

### API Connection Issues

- Verify API server is running on port 3001
- Check `.env` configuration
- Verify proxy settings in `vite.config.ts`

### Build Errors

```bash
# Clean and reinstall
npm run clean
npm install
npm run build
```

## License

Proprietary - AfiyaPulse
