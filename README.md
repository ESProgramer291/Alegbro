# Alegbro 🤖

**The next-generation math learning platform where mistakes are learning opportunities.**

A production-ready educational app built with Next.js, Supabase, and OpenRouter AI.

## 🎯 Mission

Fix what traditional platforms like IXL get wrong:
- ✅ No punishment for mistakes
- ✅ No XP loss
- ✅ Learning through analogy and repetition
- ✅ AI that guides, never solves
- ✅ Game-like progression that rewards effort

## 🚀 Quick Start

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`

See [SETUP.md](./frontend/SETUP.md) for detailed setup instructions.

## 📦 What's Included

✅ **Phase 1 Complete:**
- Authentication (email + password)
- Game 1: Variables (8 interactive mini-games)
- XP system (always increasing, never lost)
- Streak counter
- Shop (power-ups & cosmetics)
- AI Tutor API (ready to integrate)
- Responsive UI (futuristic dark theme)

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenRouter API
- **Auth**: Supabase Auth
- **State**: Zustand
- **Deployment**: Vercel

## 📂 Project Structure

```
alegbro/
├── frontend/                    # Main Next.js app
│   ├── src/
│   │   ├── app/                # Pages & API routes
│   │   ├── components/         # React components
│   │   ├── lib/                # Utilities, stores, games
│   │   └── styles/             # Global CSS
│   ├── README.md               # Full documentation
│   ├── SETUP.md                # Setup instructions
│   └── package.json
└── backend/                    # Placeholder for future backend
    ├── api.js                  # OpenRouter integration
    └── supabaseClient.js       # Database client
```

## 📋 Features

### Core (Done)
- ✅ User authentication
- ✅ Game 1 with 8 mini-games
- ✅ XP/level/streak system
- ✅ Shop with power-ups
- ✅ User dashboard
- ✅ Profile page

### AI Tutor (Ready)
- ✅ API endpoint for OpenRouter
- ✅ System prompt configured
- ✅ Chat UI (needs API connection)

### TODO (Phase 2+)
- [ ] More games
- [ ] Premium subscription (PayPal)
- [ ] Practice mode (infinite questions)
- [ ] Certificates
- [ ] Tutor marketplace
- [ ] Mobile app
- [ ] Leaderboards

## 🎮 Game 1: Variables (Complete)

Learn through 8 interactive mini-games:
1. What is a Variable?
2. Analogy: Variables are Cups
3. Naming Variables (interactive)
4. Assigning Values (interactive)
5. Changing Values (interactive)
6. Variables with Decimals (interactive)
7. Analogy: Smoothie Mix
8. Practice: Build Your Variables

Each lesson rewards XP with no punishment for mistakes.

## 🤖 AI Tutor System

**Principles:**
1. NEVER give complete answers
2. Guide step-by-step, wait for student response
3. Use analogies to explain concepts
4. Celebrate mistakes as learning
5. Adapt to student understanding

**API Endpoint:** `POST /api/tutor`

## 🔐 Security

- API keys in `.env.local` (not committed)
- Supabase RLS policies enabled
- No secrets exposed client-side
- Server-side payment validation (TODO)

## 📊 XP System

XP increases based on:
- **Base XP**: Set per activity
- **Time Bonus**: Faster completion = more XP
- **Accuracy Bonus**: 90%+ accuracy = +20%
- **Streak Multiplier**: 5% per streak day
- **Premium Multiplier**: 1.5x

Formula: `(baseXP + timeBonus + accuracyBonus) × streakMultiplier × premiumMultiplier`

## 💻 Development

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Type check
npm run type-check

# Build
npm run build

# Production
npm run start
```

## 📝 Environment Variables

Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# OpenRouter AI
OPENROUTER_API_KEY=sk-or-...

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=ABC...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
git push origin main  # Auto-deploys
```

### Manual
```bash
npm run build
npm run start
```

## 📚 Documentation

- [Full README](./frontend/README.md) — Complete feature documentation
- [Setup Guide](./frontend/SETUP.md) — Step-by-step setup
- [Database Schema](./frontend/src/lib/supabase.migration.sql) — SQL migrations

## 🎨 Design System

**Theme**: Futuristic dark (black + deep blue)

**Colors:**
- Primary: Deep blue (#3d3fff, #5b6cff)
- Accent: Cyan (#00d4ff), Purple (#7b2cbf), Pink (#ff006e)
- Dark: Black (#0f0f2e), Dark gray (#1a1a4d)

**Components:**
- `.card` — Content container
- `.btn`, `.btn-primary`, `.btn-secondary` — Buttons
- `.fade-in`, `.slide-in` — Animations

## 🧠 Philosophy

1. **Effort > Perfection** — Reward consistency, not just correctness
2. **Mistakes = Learning** — Never shame, always guide
3. **Games > School** — Make learning fun
4. **Simple > Complex** — Start small, scale smart
5. **AI that Teaches** — Guide thinking, not give answers

## 🤝 Contributing

When adding features:
1. Keep components focused
2. Use existing utilities
3. Add `// TODO:` comments for future work
4. Test on mobile
5. Follow the design system

## 📞 Questions?

See the code comments for TODOs. Most features have clear next steps.

---

**Made with 🚀 for the love of learning**

*Because math should feel like a game, not punishment.*
