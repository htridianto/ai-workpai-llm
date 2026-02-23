# RAG for Campaigns (rag-campaign-v1)

A modern, campaign-oriented system based on RAG (Retrieval-Augmented Generation). Built with Next.js 16 (App Router) and Tailwind CSS v4, this platform allows you to manage campaigns with dedicated Knowledge Bases, handle WhatsApp "Troop" registrations, and organize your Channels seamlessly.

## Key Features

- **Campaign Workspaces**: Organize your data into dynamic workspaces, each acting as a standalone campaign.
- **Knowledge Base**: Upload files, link websites, or connect databases to create a robust context for your RAG pipeline.
- **Troops Management**: Create WhatsApp-integrated folders to register "Troops" (WhatsApp groups and contacts), synced effortlessly via QR code or dummy data simulations.
- **AI Assistant**: Interact directly with your campaign's context using a built-in AI assistant powered by Google Gemini API.
- **Next.js App Router**: Leveraging the latest Next.js 16 features for optimal performance and routing.
- **Secure Authentication**: NextAuth.js (v5) powered cookie-based authentication with Prisma integration.
- **Modern UI**: Styled with Tailwind CSS v4 and a dark-mode first aesthetic.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: TypeScript
- **Database ORM**: Prisma (configured with LibSQL for libSQL / Turso)
- **Auth**: NextAuth.js (v5)
- **Object Storage**: MinIO
- **AI Integration**: Google Gemini API

## Getting Started

### Prerequisites

- Node.js 18+ installed

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` (or `.env.local`) file in the root directory and add your required keys:

```bash
# Database Config
DATABASE_URL="file:./dev.db" 

# NextAuth Config (Use `npx auth secret` to generate)
AUTH_SECRET=your_auth_secret_here

# LLM Config
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Minio Config (if required by your setup)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=your_minio_access_key
MINIO_SECRET_KEY=your_minio_secret_key
```

### 3. Initialize the Database

Push the Prisma schema to your local database to set up the tables:

```bash
npm run db:push
npm run db:generate
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser (note the port is 3001 by default based on the package.json).

## Default Credentials

Use the following credentials to log in to the local admin account (if seeding script exists or was manually seeded):

- **Email**: `admin@local.host`
- **Password**: `password`

## Project Structure

```bash
src/
├── app/                  # Next.js App Router Pages
│   ├── (protected)/      # Authenticated Dashboard & Campaign UI
│   │   ├── dashboard/    # Global Dashboard Context and UI
│   │   └── workspaces/   # Campaign, Knowledge Base, & Troops Management
│   ├── login/            # Authentication
│   └── restapi/          # API Routes for Folders, Files, LLM, etc.
├── client/               # Frontend Services, Components, & Shared UI
├── server/               # Backend Logic, Database Libs, Models
└── shared/               # Shared TS Types
```