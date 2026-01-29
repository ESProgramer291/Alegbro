/**
 * Supabase Migration SQL
 * 
 * Run this in the Supabase SQL editor to set up the database schema
 */

/*
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  premium BOOLEAN DEFAULT FALSE,
  premium_expiry TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  "order" INTEGER NOT NULL,
  total_xp INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mini_games table
CREATE TABLE IF NOT EXISTS mini_games (
  id TEXT PRIMARY KEY,
  game_id TEXT NOT NULL REFERENCES games(id),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('concept', 'interactive', 'analogy', 'practice')),
  content TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 0,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create progress table
CREATE TABLE IF NOT EXISTS progress (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mini_game_id TEXT NOT NULL REFERENCES mini_games(id),
  completed BOOLEAN DEFAULT FALSE,
  earned_xp INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, mini_game_id)
);

-- Create shop_items table
CREATE TABLE IF NOT EXISTS shop_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  cost INTEGER NOT NULL,
  effect TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_shop_items table
CREATE TABLE IF NOT EXISTS user_shop_items (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL REFERENCES shop_items(id),
  active BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_mini_game_id ON progress(mini_game_id);
CREATE INDEX IF NOT EXISTS idx_user_shop_items_user_id ON user_shop_items(user_id);

-- Insert shop items
INSERT INTO shop_items (id, name, cost, effect) VALUES
  ('1', 'Streak Freeze', 50, 'freeze_streak'),
  ('2', 'XP Doubler (1 hour)', 100, 'double_xp'),
  ('3', 'XP Tripler (30 min)', 150, 'triple_xp')
ON CONFLICT (id) DO NOTHING;

-- Insert Game 1: Variables
INSERT INTO games (id, title, description, "order", total_xp) VALUES
  ('game-1', 'Variables — The Building Blocks', 'Learn how variables work through interactive analogies and practice problems', 1, 500)
ON CONFLICT (id) DO NOTHING;

-- Insert mini-games for Game 1
INSERT INTO mini_games (id, game_id, title, description, type, content, xp_reward, "order") VALUES
  ('1-1', 'game-1', 'What is a Variable?', 'Understand the concept of variables', 'concept', 'A variable is a named container that holds a value.', 50, 1),
  ('1-2', 'game-1', 'Analogy: Variables are Cups', 'Understand variables through an analogy', 'analogy', 'Imagine you have a cup with a label on it.', 50, 2),
  ('1-3', 'game-1', 'Naming Variables', 'Learn how to name variables correctly', 'interactive', 'Which of these are valid variable names?', 75, 3),
  ('1-4', 'game-1', 'Assigning Values', 'Learn how to assign values to variables', 'interactive', 'Understand variable assignment', 75, 4),
  ('1-5', 'game-1', 'Changing Values', 'Learn how to update variable values', 'interactive', 'Variables can change!', 75, 5),
  ('1-6', 'game-1', 'Variables with Decimals', 'Working with decimal/float values', 'interactive', 'Numbers can have decimal points', 75, 6),
  ('1-7', 'game-1', 'Analogy: Smoothie Mix', 'Learn about different types with an analogy', 'analogy', 'Different variables can hold different types of things!', 50, 7),
  ('1-8', 'game-1', 'Practice: Build Your Variables', 'Create variables for a scenario', 'practice', 'You are creating a game character. What variables would you need?', 100, 8)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_shop_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can read their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can read their own progress" ON progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON progress FOR UPDATE USING (auth.uid() = user_id);
*/
