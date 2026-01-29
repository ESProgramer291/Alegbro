'use client';

import React from 'react';
import Layout from '@/components/Layout';
import GameProgress from '@/components/GameProgress';
import { getGameById } from '@/lib/games';
import { useParams } from 'next/navigation';

export default function GameDetailPage() {
  const params = useParams();
  const gameId = params?.gameId as string;

  const game = getGameById(gameId);

  if (!game) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold">Game not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto">
        <GameProgress game={game} />
      </div>
    </Layout>
  );
}
