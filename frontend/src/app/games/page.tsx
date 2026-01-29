'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { ALL_GAMES } from '@/lib/games';
import GameProgress from '@/components/GameProgress';

export default function GamesPage() {
  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Games</h1>
        <p className="text-gray-400 mb-8">
          Learn mathematics through interactive games and mini-lessons
        </p>

        <div className="space-y-8">
          {ALL_GAMES.map((game) => (
            <GameProgress key={game.id} game={game} />
          ))}
        </div>

        {/* TODO: Add more games section */}
        <div className="mt-12 p-8 rounded-lg border-2 border-dashed border-primary-700 text-center">
          <p className="text-gray-400 text-lg">More games coming soon...</p>
          <p className="text-sm text-gray-500 mt-2">
            Game 2: Data Types • Game 3: Arrays • Game 4: Functions
          </p>
        </div>
      </div>
    </Layout>
  );
}
