'use client';

import React from 'react';
import { useAuthStore } from '@/lib/store';
import { getLevel, getXPForNextLevel } from '@/lib/gameUtils';

export default function UserStats() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const level = getLevel(user.xp);
  const nextLevelXP = getXPForNextLevel(level);
  const currentLevelXP = level > 1 ? getXPForNextLevel(level - 1) : 0;
  const xpInLevel = user.xp - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;
  const levelProgress = (xpInLevel / xpNeededForLevel) * 100;

  return (
    <div className="card">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-accent-blue">{level}</div>
          <div className="text-sm text-gray-400">Level</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-accent-pink">🔥 {user.streak}</div>
          <div className="text-sm text-gray-400">Streak</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-accent-blue">{user.xp.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total XP</div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <p className="text-sm font-semibold">Level {level} Progress</p>
          <p className="text-sm text-gray-400">{xpInLevel} / {xpNeededForLevel}</p>
        </div>
        <div className="bg-dark-900 rounded-full h-3 overflow-hidden border border-primary-700">
          <div
            className="h-full bg-gradient-blue transition-all duration-300"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      </div>

      {user.premium && (
        <div className="mt-6 p-4 bg-accent-purple/20 border border-accent-purple rounded-lg">
          <p className="text-sm font-semibold text-accent-purple">⭐ Premium Unlocked</p>
          <p className="text-xs text-gray-400 mt-1">
            Expires: {user.premium_expiry ? new Date(user.premium_expiry).toLocaleDateString() : 'Never'}
          </p>
        </div>
      )}
    </div>
  );
}
