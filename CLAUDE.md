# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development
- `bun run dev` - Start development server at http://localhost:5173
- `bun run start` - Start Wrangler development server
- `bun run build` - Build for production
- `bun run typecheck` - Run TypeScript type checking and generate route types
- `bun run test` - Run Vitest tests
- `bun run format` - Format code with Biome (includes linting and fixing)

### Deployment
- `bun run deploy` - Build and deploy to production (Cloudflare Workers)
- `bun run wrangler` - Deploy to Cloudflare Workers (requires existing build)
- `bunx wrangler versions upload` - Deploy preview URL
- `bunx wrangler versions deploy` - Promote version to production

## Project Architecture

This is a personal website built with React Router v7, deployed on Cloudflare Workers. The architecture follows modern React patterns with server-side rendering support.

### Key Architecture Components

**Framework**: React Router v7 with SSR enabled
- Routes are file-based and defined in `app/routes.ts`
- Server-side rendering configured in `react-router.config.ts`
- Cloudflare Workers integration via `workers/app.ts`

**Styling**: Tailwind CSS v4 with custom animations
- Dark mode support with `dark:` classes
- Typography plugin for prose content

**Content Structure**:
- Main routes include AI guides, Linux tutorials, Docker guides, and PHP snippets
- Each route is a self-contained TSX file with meta() exports for SEO
- Structured data (JSON-LD) implemented for rich snippets

**Components**:
- `NavBar` - Main navigation with hamburger menu
- `Footer` - Site footer with links
- `SocialLinks` - Social media icon links
- `CodeSnippet` - Code highlighting component
- `ThemeSwitch` - Dark/light mode toggle

### Build Configuration

**Vite**: Production builds use esbuild with aggressive optimization
- Console/debugger statements dropped in production
- Source maps disabled for production builds
- Assets inlined up to 4KB

**TypeScript**: Strict mode enabled with separate configs
- Main config references `tsconfig.node.json` and `tsconfig.cloudflare.json`
- Type generation handled by React Router CLI

**Biome**: Code formatting and linting
- Double quotes, 120 character line width
- Import organization enabled
- CSS modules support

### Deployment Infrastructure

**Cloudflare Workers**:
- Main deployment target configured in `wrangler.toml`
- Static assets served from `build/client/`
- Server bundle at `build/server/index.js`
- Observability logging enabled

**Build Process**:
1. `bun run build` compiles React Router app
2. Server bundle includes Cloudflare Workers handler
3. Static assets optimized and fingerprinted
4. Deploy via Wrangler CLI

### Data and Content

**Route Structure**: Guides content organized by topic (ai/, linux/, docker/, php/) under a parent navigation "Guides"
- Each route exports default component and meta() function
- SEO metadata and structured data included per route
- Prefetch hints used for internal navigation

**Static Data**:
- Email address and social links centralized in `app/data/`
- Images stored in `public/` and `app/images/`
- Travel photos organized by location

### Key Development Patterns

**Custom Hooks**:
- `useFontsReady` - Font loading detection for animations
- `useLocalStorage` - Persistent client-side storage

**Animation**: Progressive reveal using CSS animations with JavaScript-controlled delays

**SEO**: Comprehensive meta tags, Open Graph, Twitter Cards, and JSON-LD structured data

**Accessibility**: Skip links, semantic HTML, proper heading hierarchy, and keyboard navigation support
