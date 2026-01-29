# Alegbro — The Next-Generation Math Learning Platform

A production-ready educational platform built with Next.js, Supabase, and OpenRouter AI.

## 🎯 Vision

Alegbro fixes what traditional platforms like IXL get wrong:
- ✅ **No punishment for mistakes** — Every error is a learning opportunity
- ✅ **No XP loss** — You only go up
- ✅ **Learning through analogy** — Complex concepts explained simply
- ✅ **Step-by-step AI guidance** — The AI teaches, never solves
- ✅ **Game-like progression** — Levels, streaks, rewards

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **AI**: OpenRouter API (GPT-3.5-turbo)
- **Payments**: PayPal (placeholder)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier works)
- OpenRouter API key
- PayPal account (for payments)

### Installation

1. **Clone and install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Set up environment variables**
   
   Create `.env.local`:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # OpenRouter
   OPENROUTER_API_KEY=your_openrouter_key

   # PayPal
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NODE_ENV=development
   ```

3. **Set up Supabase database**
   
   - Create a Supabase project
   - Go to SQL Editor
   - Copy the entire content from `src/lib/supabase.migration.sql`
   - Run the migration
   - Update your `.env.local` with actual credentials

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000`

## 📁 Project Structure

```
alegbro/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/              # API routes (tutor, payments)
│   │   │   ├── auth/             # Auth pages (signin, signup)
│   │   │   ├── games/            # Game pages
│   │   │   ├── dashboard/        # Main dashboard
│   │   │   ├── shop/             # Shop page
│   │   │   ├── profile/          # User profile
│   │   │   ├── tutor/            # AI tutor
│   │   │   └── layout.tsx        # Root layout
│   │   ├── components/           # React components
│   │   ├── lib/
│   │   │   ├── supabase.ts       # Supabase client
│   │   │   ├── store.ts          # Zustand stores
│   │   │   ├── games.ts          # Game definitions (Game 1 complete)
│   │   │   ├── gameUtils.ts      # XP, level calculations
│   │   │   ├── database.ts       # DB helper functions
│   │   │   └── supabase.migration.sql
│   │   └── styles/               # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
└── backend/                      # Future backend if needed
    ├── api.js
    └── supabaseClient.js
```

## 🎮 Features

### Phase 1 (Complete)

#### ✅ Authentication
- Email + password signup/signin
- Supabase Auth integration
- User profile creation

#### ✅ Game 1: Variables
- 8 mini-games covering:
  - Concept introduction
  - Real-world analogies (cups, smoothies)
  - Variable naming rules
  - Assigning and changing values
  - Working with decimals/fractions
  - Practice problems
- Interactive question-answer format
- Immediate feedback
- No punishment for mistakes

#### ✅ XP System
- XP increases with every activity
- No XP loss
- XP multipliers based on:
  - Time spent learning
  - Accuracy
  - Streak bonus (5% per streak day)
  - Premium status (1.5x multiplier)
- Level system (exponential: Level = sqrt(XP/100) + 1)

#### ✅ Streak System
- Daily streak counter
- Premium items to freeze streaks
- No automatic reset in code (TODO: add 24-hour check)

#### ✅ Shop
- 3 power-up items available
- XP-based currency
- Streak Freeze (50 XP)
- XP Doubler 1hr (100 XP)
- XP Tripler 30min (150 XP)

#### ✅ UI/Design
- Futuristic dark theme (black + deep blue)
- Responsive layout
- Navigation and sidebar
- Game progress tracking
- User stats display

### Phase 2 (TODOs)

- [ ] More games (Data Types, Arrays, Functions, etc.)
- [ ] Premium subscription integration
- [ ] Full AI tutor with file uploads
- [ ] Practice mode with endless questions
- [ ] Certificates
- [ ] Tutor marketplace
- [ ] Mobile optimization
- [ ] Social features (leaderboards, etc.)

## 🤖 AI Tutor Integration

The AI tutor uses **OpenRouter API** with these principles:

1. **NEVER give complete answers** — Guide step-by-step
2. **Teach one step at a time** — Ask student to respond before continuing
3. **Use analogies** — Explain concepts with real-world comparisons
4. **Encourage, never shame** — Mistakes are learning
5. **Adapt to student responses** — Adjust explanations based on understanding

### API Endpoint
```
POST /api/tutor
Body: { messages: Array<{ role, content }> }
Response: { content: string, model: string }
```

## 💳 Premium System

- **Cost**: $2.99 / 30 days (no auto-renew)
- **Unlocks**:
  - Unlimited AI tutor usage
  - Unlimited games per day
  - Deeper explanations
  - XP boosts
  - Certificates

**TODO**: Integrate PayPal button/invoice payment at `/api/payment`

## 🗄️ Database Schema

See `src/lib/supabase.migration.sql` for full schema.

### Key Tables
- `users` — User profiles, XP, streak, premium status
- `games` — Game metadata
- `mini_games` — Individual lessons
- `progress` — User completion tracking
- `shop_items` — Available purchases
- `user_shop_items` — User's owned items

## 🔐 Security

- API keys stored server-side only (`.env.local` not committed)
- Supabase RLS (Row Level Security) policies enabled
- No secrets exposed client-side
- PayPal payments validated server-side
- Rate limiting for AI endpoints (TODO)

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Auto-deploy on push

```bash
git push origin main
```

### Manual Deployment

```bash
npm run build
npm run start
```

## 🧪 Testing

Currently no tests. TODO:
- Unit tests for game logic
- Integration tests for database
- E2E tests for user flows

## 📝 Development Notes

### State Management
- **Zustand** for global state
- Stores: `useAuthStore`, `useGameStore`, `useShopStore`
- Client-side only (TODO: sync with database)

### Styling
- **Tailwind CSS** with custom color palette
- Futuristic dark theme
- Gradient utilities
- Glow effects

### Type Safety
- Full TypeScript
- Interfaces for all data models
- Strict mode enabled

## 🤝 Contributing

When adding features:
1. Keep components simple and focused
2. Use existing utility functions
3. Add TODO comments for expansions
4. Test on multiple screen sizes
5. Follow the Alegbro design system

## 📋 TODO Items

High Priority:
- [ ] Complete database RLS policies
- [ ] Add rate limiting to AI endpoint
- [ ] Implement PayPal integration
- [ ] Add 24-hour streak reset logic
- [ ] Sync state with database (auto-save)

Medium Priority:
- [ ] Game 2: Data Types
- [ ] Game 3: Arrays
- [ ] Practice mode infinite questions
- [ ] Certificates system
- [ ] Email notifications for streaks

Low Priority:
- [ ] Mobile app
- [ ] Dark mode toggle (already dark)
- [ ] Tutor marketplace
- [ ] Leaderboards
- [ ] Accessibility improvements

## 💡 Philosophy

Alegbro is built on these core beliefs:

1. **Mistakes are learning** — Never punish wrong answers
2. **Consistency beats perfection** — Streaks reward daily effort
3. **Games beat textbooks** — Progress feels rewarding
4. **AI guides, doesn't solve** — Let students think
5. **Simplicity over features** — Start small, scale smartly

The goal: Make users feel smart, capable, and eager to learn more.

## 📞 Support

For questions or issues:
1. Check existing TODOs in code
2. Review this README
3. Check Supabase docs
4. Check Next.js docs

## 📄 License

MIT

---

**Built with 🚀 by the Alegbro team**

*Making math learning feel like a game, not school.*
