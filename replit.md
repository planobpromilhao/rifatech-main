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
- **Fonts**: Google Fonts (Architects Daughter, DM Sans, Fira Code, Geist Mono), Artegra Sans SC Bold Italic for specific titles
- **Icons**: Font Awesome and Lucide React
- **Development Tools**: Replit-specific plugins for error handling and debugging
- **Build Tools**: esbuild for server bundling, PostCSS for CSS processing

# Recent Changes

## September 30, 2025
- **Design Improvements**: Checkout and payment pages redesigned to match main site styling
  - Added consistent header with logo across all pages (home, checkout, payment)
  - Applied brand colors (#056ADF for accents, #00D12D for CTAs)
  - Unified footer with "Políticas de Privacidade" across all pages
  - Enhanced visual hierarchy with larger fonts and better spacing
  - Improved form styling with security badges and clear instructions
  - Payment page now features prominent QR code display with branded borders
- **HyperCash PIX Integration**: Fully implemented and tested
  - Configured HyperCash API with Basic Auth (x:API_KEY format)
  - Automatic data cleaning: removes formatting from CPF and phone before API submission
  - Complete transaction flow: checkout → PIX generation → payment display
  - Handles API errors gracefully with user-friendly Portuguese messages
  - Validates CPF using HyperCash's Brazilian algorithm
  - QR code generation: HyperCash returns PIX code as text, system generates scannable QR code image using qrcode library
  - Accepts responses with either QR code or copy-paste code
  - End-to-end tested: form submission → API call → QR code display working correctly
- Complete frontend clone built with React/TypeScript including all UI components
- Video player with interactive overlay ("Seu vídeo já começou / Clique para ouvir")
- Progress bar displaying donation metrics (R$ 20.751.492,10 / R$ 24.000.000,00, 181.950 doadores)
- Pricing cards for raffle tickets (R$ 30 to R$ 1.000) with checkout links
- All CTA buttons styled with green color (#00D12D) as specified by user
- Applied specific font "Artegra Sans SC Bold Italic" to main urgent message title using custom CSS class