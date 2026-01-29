/**
 * Utility functions for XP calculations and game logic
 */

interface XPCalculation {
  baseXP: number;
  timeBonus: number;
  accuracyBonus: number;
  streakMultiplier: number;
  totalXP: number;
}

/**
 * Calculate XP earned based on multiple factors
 * @param baseXP - Base XP for the activity
 * @param timeSpent - Time spent in seconds
 * @param accuracy - Accuracy score (0-100)
 * @param streak - Current streak (for multiplier)
 * @param isPremium - Whether user has premium
 * @returns Calculated XP breakdown
 */
export const calculateXP = (
  baseXP: number,
  timeSpent: number,
  accuracy: number,
  streak: number = 0,
  isPremium: boolean = false
): XPCalculation => {
  // Time bonus: faster completion = more XP (capped at 50% bonus)
  const timeBonus = Math.min(baseXP * 0.5, Math.max(0, 300 - timeSpent) / 300 * (baseXP * 0.5));

  // Accuracy bonus: 90%+ accuracy gets bonus
  const accuracyBonus = accuracy >= 90 ? baseXP * 0.2 : 0;

  // Streak multiplier
  const streakMultiplier = 1 + (streak * 0.05); // 5% per streak

  // Premium bonus
  const premiumMultiplier = isPremium ? 1.5 : 1;

  const totalXP = Math.floor(
    (baseXP + timeBonus + accuracyBonus) * streakMultiplier * premiumMultiplier
  );

  return {
    baseXP,
    timeBonus: Math.floor(timeBonus),
    accuracyBonus: Math.floor(accuracyBonus),
    streakMultiplier,
    totalXP,
  };
};

/**
 * Calculate accuracy percentage from correct/total
 */
export const calculateAccuracy = (
  correct: number,
  total: number
): number => {
  if (total === 0) return 0;
  return (correct / total) * 100;
};

/**
 * Determine if streak should be maintained or reset
 * Streak resets if user doesn't play for 24 hours
 */
export const shouldResetStreak = (lastPlayTime: Date): boolean => {
  const now = new Date();
  const hours = (now.getTime() - lastPlayTime.getTime()) / (1000 * 60 * 60);
  return hours > 24;
};

/**
 * Format XP display
 */
export const formatXP = (xp: number): string => {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M`;
  } else if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`;
  }
  return xp.toString();
};

/**
 * Get level from XP (simple exponential formula)
 */
export const getLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

/**
 * Get XP needed to reach next level
 */
export const getXPForNextLevel = (currentLevel: number): number => {
  return (currentLevel * 100) ** 2;
};
