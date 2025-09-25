# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository Overview

This is a personal portfolio assets repository for keanrosales.com containing React components, static assets, and media files. The repository serves as a collection of portfolio-related code and resources.

## Repository Structure

- `assets/` - Main directory containing all portfolio resources
  - `code/` - React components and development resources
    - `Landing.js` - Main landing page component with typewriter animation
    - `Proficiencies.js` - Skills showcase component with scroll-based animations
    - `ProficienciesTerminal.js` - Terminal-themed version of proficiencies
    - `colors.md` - Portfolio color palette documentation
  - Various media files (images, audio, PDFs) for portfolio content
- `my-website/` - React application with Tailwind CSS and ScrollStack
  - `src/` - Source code
    - `components/` - React components
    - `styles/` - CSS and styling files
    - `lib/` - Utility functions
  - Configuration files: `tailwind.config.js`, `craco.config.js`, `jsconfig.json`
- `.git/` - Git version control

## Common Tasks

### Development Commands

This repository contains both portfolio assets and a React application. Common tasks include:

**Portfolio Assets:**
```bash
# View recent changes
git log --oneline -10

# Check repository status
git status

# Add and commit new assets
git add assets/
git commit -m "Add new portfolio assets"

# Push changes
git push origin main
```

**React Application (`my-website/`):**
```bash
# Navigate to React app
cd my-website

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Working with React Components

The React components in `assets/code/` are standalone components that can be copied to other projects:

- `Landing.js` - Uses custom components `LetterGlitch` and `TextType` for animations
- `Proficiencies.js` - Uses custom `ScrollStack` component for scroll-based interactions

### Color Palette

The portfolio uses a consistent green-themed color palette defined in `assets/code/colors.md`. When working with design elements, reference these CSS custom properties:
- Primary greens: `--mint`, `--sea-green`, `--dartmouth-green`
- Light variants: `--nyanza`, `--celadon`
- Dark variants: `--brunswick-green`, `--dark-green`

## Code Patterns

### Component Structure
React components follow these patterns:
- Functional components with hooks (useState, useEffect, useRef)
- CSS modules imported alongside components
- Custom animation implementations using Web APIs
- Accessibility considerations (aria-label attributes)

### CSS Configuration
All CSS files should follow this standard configuration:

**Global Styles (`src/styles/globals.css` or similar):**
```css
@import "tailwindcss";
@import "tw-animate-css";
```

**Path Aliases:**
- Use `@/` for imports from the `src/` directory
- Example: `import '@/styles/globals.css'`

### Utility Functions

**CSS Class Name Helper (`@/lib/utils.js`):**
```javascript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

This utility function combines `clsx` for conditional classes and `tailwind-merge` for proper Tailwind class merging.

### Animation Approach
Components use:
- Native Web Animation API for simple animations
- Custom scroll-based animation components
- Typewriter effects with configurable timing
- Smooth transitions and easing
- Tailwind CSS classes for styling and animations

## Repository Management

This repository follows a simple main branch workflow:
- Direct commits to `main` branch
- Remote repository: `https://github.com/keanlouis30/keanrosales.com.git`
- Contains portfolio assets that may be referenced by the main portfolio website
