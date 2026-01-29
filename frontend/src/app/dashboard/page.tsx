'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import UserStats from '@/components/UserStats';
import { ALL_GAMES } from '@/lib/games';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to continue</h1>
          <Link href="/auth/signin" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.email?.split('@')[0]}! 👋</h1>
          <p className="text-gray-400">Keep learning and building your streak</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UserStats />
          </div>

          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Games</h2>
              <div className="space-y-4">
                {ALL_GAMES.map((game) => (
                  <Link
                    key={game.id}
                    href={`/games/${game.id}`}
                    className="block p-6 rounded-lg border-2 border-primary-700 bg-dark-800 hover:bg-dark-700 hover:border-primary-600 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                        <p className="text-gray-400">{game.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent-blue">{game.totalXP} XP</p>
                        <p className="text-sm text-gray-400">{game.miniGames.length} modules</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* TODO: Add more games section */}
            <div className="mt-6 p-6 rounded-lg border-2 border-dashed border-primary-700 text-center">
              <p className="text-gray-400">More games coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
