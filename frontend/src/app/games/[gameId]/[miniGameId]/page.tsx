'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import MiniGameView from '@/components/MiniGameView';
import { getMiniGameById, getGameById } from '@/lib/games';
import { useAuthStore } from '@/lib/store';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function MiniGamePage() {
  const params = useParams();
  const gameId = params?.gameId as string;
  const miniGameId = params?.miniGameId as string;
  const addXP = useAuthStore((state) => state.addXP);

  const miniGame = getMiniGameById(miniGameId);
  const game = getGameById(gameId);

  const [completed, setCompleted] = useState(false);

  if (!miniGame || !game) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold">Mini-game not found</h1>
        </div>
      </Layout>
    );
  }

  const handleMiniGameComplete = (xpEarned: number) => {
    addXP(xpEarned);
    setCompleted(true);
  };

  const nextMiniGame = game.miniGames.find(
    (mg) => mg.order === miniGame.order + 1
  );

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/games/${gameId}`}
            className="text-primary-400 hover:text-primary-300"
          >
            ← Back to {game.title}
          </Link>
        </div>

        {completed ? (
          <div className="card text-center py-12">
            <h2 className="text-3xl font-bold mb-4">🎉 Level Complete!</h2>
            <p className="text-gray-300 mb-8">
              Great job! You've completed "{miniGame.title}"
            </p>

            {nextMiniGame ? (
              <Link
                href={`/games/${gameId}/${nextMiniGame.id}`}
                className="btn btn-primary inline-block"
              >
                Continue to Next Module
              </Link>
            ) : (
              <div>
                <p className="text-accent-blue font-semibold mb-4">
                  You've completed all modules in this game!
                </p>
                <Link
                  href={`/games/${gameId}`}
                  className="btn btn-primary inline-block"
                >
                  Back to Game
                </Link>
              </div>
            )}
          </div>
        ) : (
          <MiniGameView
            miniGame={miniGame}
            onComplete={handleMiniGameComplete}
          />
        )}
      </div>
    </Layout>
  );
}
