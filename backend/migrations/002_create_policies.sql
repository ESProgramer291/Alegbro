-- Drop existing policies (if any) then create correct policies for RLS

DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
CREATE POLICY "Users can view own progress" ON public.user_progress
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own xp log" ON public.xp_log;
CREATE POLICY "Users can view own xp log" ON public.xp_log
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own streaks" ON public.streaks;
CREATE POLICY "Users can view own streaks" ON public.streaks
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Problems are public" ON public.problems;
CREATE POLICY "Problems are public" ON public.problems
  FOR SELECT USING (TRUE);
