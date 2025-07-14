# Caribbean Temporary Services LLC (CTS PR) Website

![CTS PR Logo](https://stagingctspr.axesawebhosting9.net/wp-content/uploads/2025/07/cts-brand.webp)

## Overview

Caribbean Temporary Services, LLC. (CTS) is a local company established in 1983 with the mission of providing employment opportunities while delivering services that address client needs and contribute to their growth in Puerto Rico. This repository contains the source code for the CTS PR website, built using Next.js 15 with TypeScript.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Component Architecture](#component-architecture)
- [Form Handling](#form-handling)
- [Email Service](#email-service)
- [Styling](#styling)
- [Deployment](#deployment)
- [Best Practices](#best-practices)

## Features

- **Modern UI/UX**: Built with the latest web technologies for a responsive and interactive user experience
- **Server Components**: Leverages Next.js 15's server components for improved performance
- **Form Validation**: Robust form validation using Zod and React Hook Form
- **Email Integration**: Contact form with email notifications using Nodemailer
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **View Transitions**: Smooth page transitions using next-view-transitions
- **SEO Optimized**: Meta tags and OpenGraph data for improved search engine visibility
- **Multilingual Support**: Spanish language support for the Puerto Rican market

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with React 19
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod) validation
- **Email Service**: [Nodemailer](https://nodemailer.com/)
- **UI Components**:
  - [Radix UI](https://www.radix-ui.com/) for accessible components
  - [Lucide React](https://lucide.dev/) for icons
  - [Tabler Icons](https://tabler-icons.io/) for additional icons
- **Animation**: [Motion](https://motion.dev/) for animations
- **Carousel**: [Swiper](https://swiperjs.com/) for image sliders
- **Development Tools**:
  - [ESLint](https://eslint.org/) for code linting
  - [Prettier](https://prettier.io/) for code formatting
  - [TurboRepo](https://turbo.build/) for build optimization

## Project Structure

```
ctspr/
├── .next/               # Next.js build output
├── .vscode/             # VS Code configuration
├── public/              # Static assets
│   └── images/          # Image assets
├── src/                 # Source code
│   ├── app/             # Next.js app router
│   │   ├── (actions)/   # Server actions
│   │   ├── blog/        # Blog page
│   │   ├── contacto/    # Contact page
│   │   ├── gracias/     # Thank you page
│   │   ├── ofertas-empleo/ # Job offers page
│   │   ├── quienes-somos/ # About us page
│   │   ├── servicios/   # Services page
│   │   ├── globals.css  # Global styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Home page
│   ├── components/      # React components
│   │   ├── Blog/        # Blog components
│   │   ├── Contacto/    # Contact components
│   │   ├── Home/        # Home page components
│   │   ├── Sucursales/  # Branch offices components
│   │   ├── Wrappers/    # Page wrapper components
│   │   ├── general/     # General components (Header, Footer)
│   │   ├── shared/      # Shared components
│   │   └── ui/          # UI components
│   ├── config/          # Configuration files
│   ├── graphql/         # GraphQL queries and mutations
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # Service integrations
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── .env.local           # Environment variables
├── .gitignore           # Git ignore file
├── .prettierrc          # Prettier configuration
├── components.json      # Component configuration
├── eslint.config.mjs    # ESLint configuration
├── next-env.d.ts        # Next.js TypeScript declarations
├── next.config.ts       # Next.js configuration
├── package.json         # Project dependencies
├── postcss.config.mjs   # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ctspr
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Email configuration
   EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
   EMAIL_PORT=587
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   EMAIL_FROM=formularios@axesa.com
   EMAIL_TO=recipient1@example.com,recipient2@example.com
   ```

### Development

Start the development server with TurboRepo for faster builds:

```bash
pnpm dev
# or
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

Build the application for production:

```bash
pnpm build
# or
npm run build
```

Start the production server:

```bash
pnpm start
# or
npm start
```

## Component Architecture

The project follows a modular component architecture:

- **Wrappers**: High-level components that compose page layouts
- **Shared**: Reusable components shared across multiple pages
- **UI**: Low-level UI components (buttons, inputs, etc.)
- **Page-specific components**: Components specific to individual pages

### Example: Contact Form Flow

1. User fills out the contact form (`ContactForm.tsx`)
2. Form validation is handled by Zod schema (`contact.schema.ts`)
3. Form submission is managed by the `useContact` hook
4. Server action (`contactActions/actions.ts`) processes the form data
5. Email is sent using Nodemailer
6. User is redirected to the thank you page

## Form Handling

Forms are built using React Hook Form with Zod validation schemas:

```typescript
// Example schema (src/schemas/contact.schema.ts)
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  message: z.string().min(1, "Message is required"),
});
```

Form components use the `useContact` hook for state management and submission handling.

## Email Service

The application uses Nodemailer to send emails from the contact form:

- Configuration: AWS SES SMTP server
- Template: HTML email template with form data
- Error handling: Provides feedback on success/failure

## Styling

The project uses Tailwind CSS for styling with custom configuration:

- Custom color palette defined in the Tailwind config
- Responsive design using Tailwind's breakpoint system
- Typography plugin for rich text formatting
- Animation utilities for UI interactions

## Deployment

The application is configured for deployment on various platforms:

- **Vercel**: Optimized for deployment on Vercel (recommended)
- **AWS**: Can be deployed to AWS Amplify or EC2
- **Traditional hosting**: Can be deployed as a static site with server-side functions

## Best Practices

This project follows several best practices:

- **TypeScript**: Strong typing for improved developer experience and code quality
- **Server Components**: Uses Next.js server components for improved performance
- **Accessibility**: Implements accessible UI components using Radix UI
- **SEO**: Includes metadata and OpenGraph tags for better search engine visibility
- **Code Quality**: Enforces code quality with ESLint and Prettier
- **Performance**: Optimizes images and implements code splitting for better performance
- **Security**: Implements security best practices for form handling and API calls

---

 2025 Axesa Digital Marketing Media and Caribe Media. All rights reserved.
