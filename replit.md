# Overview

This is a full-stack web application built with React and Express that appears to be a fundraising or raffle platform ("Rifa Oficial"). The application features a landing page with video content, progress tracking, and pricing options for purchasing raffle numbers. The frontend is built with modern React using TypeScript and styled with Tailwind CSS and shadcn/ui components, while the backend uses Express.js with a PostgreSQL database managed through Drizzle ORM.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for development and bundling
- **Component Structure**: Modern functional components with hooks

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Storage**: PostgreSQL-based sessions using connect-pg-simple
- **API Structure**: RESTful API with `/api` prefix for all endpoints
- **Development**: Hot reloading with Vite middleware integration

## Data Storage
- **Primary Database**: PostgreSQL via Neon Database serverless
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Migrations**: Drizzle Kit for database schema management
- **Fallback Storage**: In-memory storage implementation for development

## Authentication & Authorization
- **Session Management**: Express sessions with PostgreSQL storage
- **User Schema**: Basic user model with username/password authentication
- **Storage Interface**: Abstracted storage layer supporting both database and in-memory implementations

## External Dependencies
- **Database Provider**: Neon Database (PostgreSQL serverless)
- **UI Components**: Radix UI primitives via shadcn/ui
- **Fonts**: Google Fonts (Architects Daughter, DM Sans, Fira Code, Geist Mono)
- **Icons**: Font Awesome and Lucide React
- **Development Tools**: Replit-specific plugins for error handling and debugging
- **Build Tools**: esbuild for server bundling, PostCSS for CSS processing