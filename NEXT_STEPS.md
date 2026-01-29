# 🎯 Your Next Steps

Welcome to Alegbro! Here's exactly what to do next.

## ✅ Step 1: Read the Docs (5 min)

1. **Read [BUILD_SUMMARY.md](./BUILD_SUMMARY.md)** — Understand what was built
2. **Read [README.md](./README.md)** — See the vision
3. **Read [frontend/SETUP.md](./frontend/SETUP.md)** — Setup instructions

## 🚀 Step 2: Set Up Your Environment (10 min)

### Create Supabase Project
```
1. Go to https://supabase.com
2. Click "New Project"
3. Create a PostgreSQL database
4. Copy the URL and ANON_KEY
```

### Run Database Migration
```
1. In Supabase, go to SQL Editor
2. Create a new query
3. Copy-paste from: frontend/src/lib/supabase.migration.sql
4. Run the query
5. Tables are now ready!
```

### Get API Keys
```
OpenRouter (AI):
- Go to https://openrouter.ai
- Sign up
- Create API key

PayPal (Optional for now):
- Go to https://developer.paypal.com
- Create sandbox account
- Get Client ID
```

### Create .env.local
```bash
cd frontend
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
OPENROUTER_API_KEY=sk-or-...
NEXT_PUBLIC_PAYPAL_CLIENT_ID=ABC123...
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
EOF
```

## 🧪 Step 3: Test Locally (10 min)

```bash
cd frontend

# Install dependencies
npm install

# Type check (should pass)
npm run type-check

# Start dev server
npm run dev
```

Visit `http://localhost:3000` — You should see the landing page!

## 🎮 Step 4: Test the App (15 min)

### Try These Flows

**Sign Up**
1. Go to `/auth/signup`
2. Create account (test@example.com / password123)
3. You should see the dashboard

**Play Game 1**
1. Click "Games" in sidebar
2. Click "Game 1: Variables"
3. Click on first mini-game
4. Complete the lesson
5. Check your XP increased (top right)

**Buy from Shop**
1. Click shop icon (🛍️) or go to `/shop`
2. You have 50 XP from Game 1
3. Buy "Streak Freeze" (50 XP)
4. It should appear in "Your Items"

**Check Profile**
1. Click profile icon (👤) or go to `/profile`
2. See your XP, streak, level
3. See "Free User" status

## 🚀 Step 5: Deploy to Vercel (5 min)

### Push to GitHub
```bash
cd /workspaces/Alegbro
git init
git add .
git commit -m "Alegbro MVP: Complete educational platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Alegbro.git
git push -u origin main
```

### Deploy on Vercel
```
1. Go to https://vercel.com
2. Click "Import Project"
3. Paste your GitHub repo URL
4. Select "frontend" as root directory
5. Add environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - OPENROUTER_API_KEY
   - NEXT_PUBLIC_PAYPAL_CLIENT_ID
   - NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   - NODE_ENV=production
6. Click "Deploy"
```

That's it! Your app is live. 🎉

## 📝 Step 6: Optional Customizations

### Change App Name
```bash
# frontend/src/app/layout.tsx
title: "Alegbro - Learn Math Like a Game",

# frontend/tailwind.config.js
// Change colors
```

### Add Your Own Logo
```bash
# Replace the 🤖 emoji in:
# - frontend/src/app/page.tsx
# - frontend/src/components/Navigation.tsx
# With your actual logo image
```

### Customize Colors
```bash
# Edit frontend/tailwind.config.js
# Colors section to match your brand
```

## 🎮 Step 7: Add Game 2 (Future)

When ready to add more games, follow this pattern:

1. **Define in `frontend/src/lib/games.ts`**
```typescript
export const GAME_2_DATATYPES: Game = {
  id: "game-2",
  title: "Data Types",
  miniGames: [
    // 8 mini-games...
  ]
};

export const ALL_GAMES: Game[] = [
  GAME_1_VARIABLES,
  GAME_2_DATATYPES,  // ← Add here
];
```

2. **Create database entries** (optional)
```sql
INSERT INTO games VALUES ('game-2', 'Data Types', ...);
INSERT INTO mini_games VALUES (...);
```

3. **That's it!** It automatically appears in the sidebar

## 🔑 Important Files to Know

| File | When You Need It |
|------|------------------|
| `frontend/src/lib/games.ts` | Adding games |
| `frontend/tailwind.config.js` | Changing colors |
| `frontend/src/styles/globals.css` | Global styling |
| `frontend/src/lib/store.ts` | Changing state |
| `frontend/src/app/api/tutor/route.ts` | AI tutor setup |

## 🐛 Troubleshooting

### "Can't connect to Supabase"
→ Check `.env.local` has correct URL and key

### "Next.js won't start"
→ Delete `node_modules` and `.next`, then `npm install && npm run dev`

### "OpenRouter not working"
→ Check API key is correct at https://openrouter.ai/account/api-keys

### "Game won't load"
→ Make sure you're signed in first

## 📊 Success Metrics

You'll know it's working when:

✅ You can sign up and sign in
✅ You can play all 8 Game 1 modules
✅ XP increases after each module
✅ Shop page shows your XP
✅ App deploys to Vercel
✅ Friends can visit your live URL

## 🤝 Getting Help

1. **Setup issues?** → Check [SETUP.md](./frontend/SETUP.md)
2. **Architecture questions?** → Check [BUILD_SUMMARY.md](./BUILD_SUMMARY.md)
3. **Deployment issues?** → Check [DEPLOYMENT.md](./DEPLOYMENT.md)
4. **Code questions?** → Look for `// TODO:` comments in code

## 🎉 You're Ready!

You have:
- ✅ Complete source code
- ✅ Database schema
- ✅ Documentation
- ✅ Deployment ready

**Next action**: Create Supabase project and set up environment variables.

**Time to live**: ~30 minutes

---

**Made with 🚀 for fast shipping**

**Questions?** Everything is documented. Go build! 🎯
