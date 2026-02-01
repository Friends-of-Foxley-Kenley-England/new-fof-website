# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is the Friends of Foxley website - a Gatsby-based static site for a volunteer group that manages Foxley Wood Local Nature Reserve in Kenley, Surrey. The site uses Contentful as a headless CMS for dynamic content like news articles and work day information.

## Development Commands

Project uses yarn not npm. You can use npx, but not npm.

### Initial Setup

```bash
# Copy environment file and configure Contentful credentials
cp .env.example .env
# Edit .env with Contentful Space ID, Environment, and Access Token

# Enable corepack and install dependencies
corepack enable
yarn install
```

### Core Development

```bash
# Start development server (runs on http://localhost:8000)
yarn start
# Alternative: yarn develop

# Build for production
yarn build

# Serve production build locally
yarn serve

# Clean Gatsby cache and public folder
yarn clean
```

### Code Quality

```bash
# Format all code with Prettier
yarn format

# Check for unused dependencies
yarn find-unused-deps
```

### Development Tools

- GraphQL playground: `http://localhost:8000/___graphql`
- Node version specified in `.nvmrc` (v18.x)

## Architecture Overview

### Content Strategy

The site uses a hybrid content approach:

- **Static content**: Hardcoded pages for infrequently changing content (History, Trees, Contact, etc.)
- **Dynamic content**: Contentful CMS for frequently updated content (News articles, Work days, Resources)

### Key Gatsby Configuration

- **Data Sources**: Contentful CMS integration via `gatsby-source-contentful`
- **Image Processing**: Gatsby Image with Sharp for optimized images
- **SEO**: React Helmet for metadata management
- **PWA Features**: Offline plugin with precached critical pages
- **Markdown**: Remark transformer with syntax highlighting via Prism

### Source Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout.js        # Main layout wrapper with header/footer
│   ├── seo.js           # SEO component with React Helmet
│   ├── site-header.js   # Navigation header
│   └── hero-section.js  # Homepage hero
├── pages/               # Static route pages
├── templates/           # Dynamic page templates
│   ├── blog-post.js     # News article template
│   └── work-day-information.js # Work day detail template
├── helpers/             # Utility functions
└── hooks/               # Custom React hooks
```

### Page Generation (gatsby-node.js)

- **Dynamic Pages**: Creates pages for Contentful entries (news, work days) with pagination context
- **URL Structure**: `news/[slug]` and `work-days/[slug]`
- **Redirects**: Handles legacy URL redirections from `redirects.json`

### Contentful Content Types

Content is managed in Contentful with the following structure:

- **News**: Articles for the `/news` section
- **Work Days**: Volunteer work session information for `/work-days`
- **Resources**: Resource page content
- **Assets**: Images and files (tagged with `images` for organization)

### Environment Configuration

Required environment variables in `.env`:

- `CONTENTFUL_SPACE_ID`: Contentful space identifier
- `CONTENTFUL_ENVIRONMENT`: Contentful environment (typically 'master')
- `CONTENTFUL_DELIVERY_TOKEN`: API token for content delivery
- Optional: `CONTENTFUL_HOST` and `CONTENTFUL_PREVIEW_ACCESS_TOKEN` for preview mode

### Deployment Architecture

Dual hosting setup for reliability:

- **Primary (Production)**: Firebase hosting → `friendsoffoxley.co.uk`
- **Backup**: Netlify hosting → `friends-of-foxley.netlify.app`

Deployment triggers:

- PR opens → Firebase preview channel
- Push to main → Firebase production + Netlify deployment
- Firebase has 3 preview channel limit

### Third-Party Integrations

- **What3Words**: Location display component (display-only, no API calls)
- **Web Vitals**: Optional performance monitoring via Reshepe
- **Social**: Facebook page integration

## Development Notes

- Uses Yarn 3.x with corepack
- Prettier configuration for consistent formatting
- CSS modules for component-specific styles
- GraphQL queries for static metadata and Contentful content
- Progressive Web App capabilities with offline support for key pages
- Sitemap generation with legacy URL exclusions

## Additional Documentation

The `docs/` folder contains supplementary documentation for specific topics:

- `adding-contentful-content.md` - Guide for managing Contentful content and media assets
- `deployment.md` - Detailed deployment information for Firebase and Netlify hosting
- `development-frameworks.md` - In-depth information about Gatsby, Contentful, and other frameworks used
- `redirects.md` - Information about redirects
- `web-vitals.md` - Web performance monitoring setup with Reshepe integration

## Content Management

For content editors, refer to the project wiki: https://github.com/Friends-of-Foxley-Kenley-England/new-fof-website/wiki

Contentful space: https://app.contentful.com/spaces/jnd8s5ezvg4b/home
