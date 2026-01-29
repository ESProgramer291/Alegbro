# Getting Started with Alegbro

## Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Create `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
OPENROUTER_API_KEY=sk-or-...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=ABC123...
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Set Up Supabase Database

**Create a Free Supabase Project:**
- Go to https://supabase.com
- Click "New Project"
- Create a new PostgreSQL database
- Copy `URL` and `ANON_KEY` to `.env.local`

**Import Database Schema:**
- In Supabase, go to SQL Editor
- Create new query
- Copy-paste content from `src/lib/supabase.migration.sql`
- Run the query

### 4. Get API Keys

**OpenRouter** (AI):
- Go to https://openrouter.ai
- Sign up for free
- Create API key
- Add to `.env.local`

**PayPal** (Optional for now):
- Go to https://developer.paypal.com
- Create sandbox account
- Get Client ID (not needed immediately)

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` — You're live! 🎉

## What Works Right Now

✅ **Authentication**
- Sign up at `/auth/signup`
- Sign in at `/auth/signin`
- See your profile at `/profile`

✅ **Game 1: Variables**
- Dashboard shows the game
- Click to start learning
- Work through 8 interactive mini-games
- Earn XP with every completion

✅ **XP & Progression**
- Top-right shows XP and streak
- Complete lessons to earn XP
- Level up automatically

✅ **Shop**
- Visit `/shop`
- Buy power-ups with XP
- See your inventory

✅ **AI Tutor** (Placeholder)
- Visit `/tutor`
- Chat interface ready
- TODO: Connect to OpenRouter API

## Key Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Check code quality
npm run type-check   # TypeScript validation
```

## Project Structure for Developers

### Adding a New Game

1. **Define in `src/lib/games.ts`**
```typescript
export const GAME_2_DATATYPES: Game = {
  id: "game-2",
  title: "Data Types",
  miniGames: [
    { id: "2-1", title: "What is a String?", ... },
    { id: "2-2", title: "Numbers vs Strings", ... },
    // ...
  ]
};
```

2. **Add to `ALL_GAMES` array**
```typescript
export const ALL_GAMES: Game[] = [
  GAME_1_VARIABLES,
  GAME_2_DATATYPES,  // ← Add here
];
```

3. **Update database** (optional, for persistence)
```sql
INSERT INTO games (id, title, "order") VALUES ('game-2', 'Data Types', 2);
INSERT INTO mini_games (...) VALUES (...);
```

### Adding a Shop Item

**In `src/lib/store.ts`:**
```typescript
{
  id: "4",
  name: "Awesome Item",
  cost: 200,
  effect: "new_effect",
  active: false,
}
```

Then in the shop UI, it automatically appears!

### Creating a Component

```typescript
// src/components/MyComponent.tsx
'use client';

import React from 'react';

export default function MyComponent() {
  return (
    <div className="card">
      {/* Your content */}
    </div>
  );
}
```

Use Tailwind classes from `tailwind.config.js`:
- Colors: `bg-primary-700`, `text-accent-blue`
- Components: `card`, `btn`, `btn-primary`
- Animations: `fade-in`, `slide-in`, `pulse-glow`

## Common Issues

### "Supabase connection failed"
→ Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### "Next.js won't start"
→ Delete `node_modules` and `.next`, then:
```bash
npm install
npm run dev
```

### "OpenRouter API not working"
→ Make sure `OPENROUTER_API_KEY` is set in `.env.local`

### Database operations not working
→ Run the migration SQL again, check RLS policies are enabled

## Next Steps

1. **Test the auth flow** — Sign up, sign in, check profile
2. **Play Game 1** — Try all 8 mini-games
3. **Test the shop** — Earn XP and buy items
4. **Connect OpenRouter** — Make the AI tutor work
5. **Add Game 2** — Implement another game

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [OpenRouter API](https://openrouter.ai/docs)
- [TypeScript](https://www.typescriptlang.org)

## Code Quality

```bash
# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build
```

All must pass before committing!

## Questions?

Check the comments marked with `TODO:` throughout the code — they indicate incomplete features.

Happy coding! 🚀
