# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## todo.md

Inside of the `tasks` directory, there is a `todo.md` file that contains a list of tasks that need to be completed. please read the file and follow the instructions. as you work through the tasks, please update the file to reflect the progress. once done, please check in with me. 

after each section of tasks, please create a new commit with a relevant mesage. that way we can go back if needed.

## Development Commands

- `npm run dev` - Start development server with Turbopack (opens on http://localhost:3000)
- `npm run build` - Build production version
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint for code quality

## Architecture Overview

This is a Next.js 15 application using the App Router architecture with TypeScript and Tailwind CSS.

**Key Technologies:**
- Next.js 15 with App Router (`app/` directory structure)
- TypeScript with strict configuration
- Tailwind CSS v4 for styling
- shadcn/ui components (configured in `components.json`)
- Lucide React for icons

**Project Structure:**
- `app/` - Next.js App Router pages and layouts
- `lib/` - Shared utilities (includes `cn()` helper for class merging)
- `components/` - Reusable React components (aliased as `@/components`)
- `public/` - Static assets

**Import Aliases:**
- `@/*` maps to root directory
- `@/components` for components
- `@/lib/utils` for utilities
- `@/components/ui` for UI components

The project uses shadcn/ui component system with "new-york" style, CSS variables enabled, and neutral base color.