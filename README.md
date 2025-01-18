# Tip Tracker

A modern web application for service industry workers to track their tips and shifts. Built with Next.js, TypeScript, and Drizzle ORM.

## Features
- Track daily tips and shifts
- View earnings statistics and trends
- Dark/light mode support
- Responsive design for mobile and desktop
- Modern, accessible UI built with shadcn/ui

## Tech Stack
- Next.js (App Router)
- TypeScript
- Drizzle ORM
- Tailwind CSS
- shadcn/ui components
- Docker support

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font).

## Docker Setup

  The application can be run using Docker for consistent development environments:

```bash
# Build the Docker image
docker-compose build

# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

  The Docker configuration:
- Maps port 3000 to your local machine
- Persists SQLite database in a local `./data` directory
- Sets up environment variables for database connection

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
