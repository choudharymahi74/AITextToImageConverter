# AI Image Generator Application

## Overview

This is a full-stack AI image generation application built with React, Node.js, Express, and OpenAI's DALL-E API. The application allows users to generate high-quality images from text prompts with customizable style options, aspect ratios, and quality settings. The frontend provides an intuitive interface for image generation and gallery viewing, while the backend handles API integration and data persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API endpoints for image generation and retrieval
- **Development**: TSX for TypeScript execution in development mode
- **Production**: ESBuild for server-side bundling

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for Neon Database)
- **Schema**: Type-safe database schema with Zod validation
- **Storage Strategy**: Dual storage implementation (memory and database) via storage interface

## Key Components

### Database Schema
- **Users Table**: User authentication with username/password
- **Generated Images Table**: Stores image metadata including prompts, URLs, styles, aspect ratios, and timestamps
- **Type Safety**: Drizzle-Zod integration for runtime validation

### API Endpoints
- `POST /api/images/generate`: Generate new images via OpenAI DALL-E 3
- `GET /api/images`: Retrieve generated images gallery
- `GET /api/images/:id`: Get specific image details

### Frontend Components
- **ImageGenerator**: Form interface for prompt input and generation options
- **ImageGallery**: Grid display of generated images with download/share functionality
- **ImageModal**: Full-screen image viewing with metadata overlay
- **Header/Footer**: Navigation and branding components

### External Service Integration
- **OpenAI DALL-E 3**: Primary image generation service
- **Image Hosting**: Generated images hosted via OpenAI's temporary URLs

## Data Flow

1. **Image Generation Flow**:
   - User inputs prompt and selects generation options
   - Frontend validates input and sends POST request to `/api/images/generate`
   - Backend enhances prompt based on style selection
   - OpenAI API call generates image with specified parameters
   - Image metadata saved to database
   - Generated image returned to frontend and gallery updated

2. **Gallery Display Flow**:
   - Frontend queries `/api/images` endpoint on page load
   - Backend retrieves images from storage layer
   - Images displayed in responsive grid layout
   - Click interactions open full-screen modal view

3. **Image Download/Share Flow**:
   - User triggers download or share action
   - Frontend handles file download via blob creation
   - Share functionality uses Web Share API with clipboard fallback

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm & drizzle-kit**: Type-safe database ORM and migrations
- **openai**: Official OpenAI API client library
- **@radix-ui/***: Accessible UI component primitives

### Development Tools
- **vite**: Frontend build tool with hot module replacement
- **tsx**: TypeScript execution for development server
- **esbuild**: Production server bundling
- **tailwindcss**: Utility-first CSS framework

### Authentication & Security
- Currently using basic username/password storage
- Ready for session management implementation
- CORS and security headers configured for production

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with PostgreSQL 16
- **Dev Server**: Vite dev server with Express API proxy
- **Hot Reload**: Enabled for both frontend and backend
- **Port Configuration**: Frontend on port 5000, mapped to external port 80

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Process Management**: Single process serving both API and static content

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **OPENAI_API_KEY**: OpenAI API authentication (required)
- **NODE_ENV**: Environment detection for conditional features

## Changelog

```
Changelog:
- June 27, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```