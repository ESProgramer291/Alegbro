/**
 * Supabase Database Helpers
 * Functions to interact with the Supabase database
 */

import { supabase } from './supabase';

// User operations
export const createUserProfile = async (
  userId: string,
  email: string
) => {
  return await supabase.from('users').insert({
    id: userId,
    email,
    xp: 0,
    streak: 0,
    premium: false,
    created_at: new Date().toISOString(),
  });
};

export const getUserProfile = async (userId: string) => {
  return await supabase.from('users').select('*').eq('id', userId).single();
};

export const updateUserXP = async (userId: string, xpDelta: number) => {
  const { data, error } = await supabase.rpc('add_xp', {
    user_id: userId,
    xp_amount: xpDelta,
  });
  return { data, error };
};

export const updateUserStreak = async (userId: string, streak: number) => {
  return await supabase
    .from('users')
    .update({ streak })
    .eq('id', userId);
};

export const setPremium = async (
  userId: string,
  premium: boolean,
  expiryDate?: string
) => {
  return await supabase
    .from('users')
    .update({
      premium,
      premium_expiry: expiryDate || null,
    })
    .eq('id', userId);
};

// Progress operations
export const recordProgress = async (
  userId: string,
  miniGameId: string,
  earnedXP: number
) => {
  return await supabase.from('progress').upsert({
    user_id: userId,
    mini_game_id: miniGameId,
    completed: true,
    earned_xp: earnedXP,
    completed_at: new Date().toISOString(),
  });
};

export const getUserProgress = async (userId: string) => {
  return await supabase.from('progress').select('*').eq('user_id', userId);
};

// Shop operations
export const getShopItems = async () => {
  return await supabase.from('shop_items').select('*');
};

export const purchaseShopItem = async (
  userId: string,
  itemId: string,
  expiresAt?: string
) => {
  return await supabase.from('user_shop_items').insert({
    user_id: userId,
    item_id: itemId,
    expires_at: expiresAt || null,
  });
};

export const getUserShopItems = async (userId: string) => {
  return await supabase
    .from('user_shop_items')
    .select('*, item:shop_items(*)')
    .eq('user_id', userId);
};

// Game operations
export const getGames = async () => {
  return await supabase.from('games').select('*').order('order', { ascending: true });
};

export const getMiniGames = async (gameId: string) => {
  return await supabase
    .from('mini_games')
    .select('*')
    .eq('game_id', gameId)
    .order('order', { ascending: true });
};
