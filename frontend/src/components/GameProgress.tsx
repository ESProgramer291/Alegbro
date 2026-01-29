'use client';

import React from 'react';
import { Game } from '@/lib/games';
import { useGameStore } from '@/lib/store';
import Link from 'next/link';

interface GameProgressProps {
  game: Game;
}

export default function GameProgress({ game }: GameProgressProps) {
  const isCompleted = useGameStore((state) => state.isCompleted);

  const completedMiniGames = game.miniGames.filter((mg) => isCompleted(mg.id));
  const completionPercentage = Math.round(
    (completedMiniGames.length / game.miniGames.length) * 100
  );

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
          <p className="text-gray-400">{game.description}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-accent-blue">{completionPercentage}%</div>
          <div className="text-sm text-gray-400">
            {completedMiniGames.length} / {game.miniGames.length}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-dark-900 rounded-full h-3 overflow-hidden border border-primary-700">
          <div
            className="h-full bg-gradient-blue transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {game.miniGames.map((miniGame) => {
          const completed = isCompleted(miniGame.id);
          return (
            <Link
              key={miniGame.id}
              href={`/games/${game.id}/${miniGame.id}`}
              className={`block p-4 rounded-lg border-2 transition ${
                completed
                  ? 'border-accent-blue bg-accent-blue/5 cursor-pointer'
                  : 'border-primary-700 bg-dark-800 hover:border-primary-600 cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{miniGame.title}</h4>
                  <p className="text-sm text-gray-400">{miniGame.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-accent-blue">+{miniGame.xpReward} XP</span>
                  {completed && <span className="text-xl">✓</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-primary-800 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Total XP available</p>
          <p className="text-2xl font-bold text-accent-blue">{game.totalXP} XP</p>
        </div>
        <button className="btn btn-primary">
          {completionPercentage === 100 ? 'Practice Mode' : 'Continue Learning'}
        </button>
      </div>
    </div>
  );
}
