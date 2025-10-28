# Mood Room

A 3D personality visualization experience built with Next.js, React Three Fiber, and Zustand.

## Tech Stack

- **Next.js 14** (App Router) - React framework
- **React Three Fiber** - 3D rendering
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Vitest** - Unit testing
- **Playwright** - E2E testing

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run E2E tests
npm run test:e2e
```

## Project Structure

```
├── app/
│   ├── (marketing)/
│   │   └── page.tsx          # Landing page
│   ├── configurator/
│   │   └── page.tsx           # Main 3D configurator
│   └── layout.tsx
├── components/
│   └── canvas/
│       └── SceneCanvas.tsx    # R3F Canvas wrapper
├── features/
│   ├── mood/
│   │   ├── useMoodStore.ts    # Zustand store
│   │   └── moodPresets.ts     # Preset configurations
│   ├── room/
│   │   ├── Room.tsx           # Room geometry
│   │   └── ProceduralProps.tsx # Procedural decorations
│   └── ui/
│       ├── MoodQuiz.tsx       # Quiz component
│       └── Toolbar.tsx        # Mood selection UI
├── lib/
│   ├── urlState.ts            # URL syncing
│   ├── analytics.ts           # Event tracking (stub)
│   └── a11y.ts                # Accessibility helpers
└── styles/
    └── globals.css            # Global styles
```

## Features

- **3D Visualization**: Interactive 3D room that reflects your mood
- **Mood Presets**: Switch between different atmospheres (Serene, Energetic, Focused, Cozy, Creative)
- **Interactive Quiz**: Discover your ideal mood through guided questions
- **Keyboard Accessible**: Full keyboard navigation support
- **URL Sharing**: Share your mood configuration via URL (TODO: to be connected)
- **Performance**: Lazy-loading and suspense boundaries for optimized 3D rendering

## Code Style

- TypeScript strict mode
- Functional React components with hooks
- RSC-friendly (server components by default, client components where needed)
- Accessibility-first (keyboard navigation, ARIA attributes)
- Performance-conscious (lazy-loading, suspense boundaries)
- Minimal working code over placeholders
- "Thought Logic" comments explaining why, not what

## Next Steps (TODOs)

- [ ] Connect URL state sync in useMoodStore
- [ ] Implement Sentry integration in analytics.ts
- [ ] Add error boundaries
- [ ] Create Playwright E2E tests
- [ ] Add KTX2/Draco compression for 3D assets
- [ ] Implement custom mood creation
- [ ] Add room decorator props
- [ ] Implement fog and atmosphere effects

