'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ALL_GAMES } from '@/lib/games';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-dark-900 border-r border-primary-800 p-6 flex flex-col overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-lg font-bold text-accent-blue mb-4">Menu</h2>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className={`block px-4 py-3 rounded-lg transition ${
              isActive('/dashboard')
                ? 'bg-primary-700 text-white'
                : 'hover:bg-dark-800 text-gray-300'
            }`}
          >
            📊 Dashboard
          </Link>
          <Link
            href="/games"
            className={`block px-4 py-3 rounded-lg transition ${
              isActive('/games')
                ? 'bg-primary-700 text-white'
                : 'hover:bg-dark-800 text-gray-300'
            }`}
          >
            🎮 Games
          </Link>
          <Link
            href="/tutor"
            className={`block px-4 py-3 rounded-lg transition ${
              isActive('/tutor')
                ? 'bg-primary-700 text-white'
                : 'hover:bg-dark-800 text-gray-300'
            }`}
          >
            🤖 AI Tutor
          </Link>
        </nav>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold text-accent-blue mb-4">Games</h2>
        <nav className="space-y-2">
          {ALL_GAMES.map((game) => (
            <Link
              key={game.id}
              href={`/games/${game.id}`}
              className={`block px-4 py-2 rounded-lg transition text-sm ${
                pathname === `/games/${game.id}`
                  ? 'bg-primary-700 text-white'
                  : 'hover:bg-dark-800 text-gray-300'
              }`}
            >
              {game.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* TODO: Add settings and help links */}
      <div className="mt-auto">
        <button className="w-full px-4 py-2 text-left text-gray-400 hover:text-white transition text-sm">
          ⚙️ Settings
        </button>
        <button className="w-full px-4 py-2 text-left text-gray-400 hover:text-white transition text-sm">
          ❓ Help
        </button>
      </div>
    </aside>
  );
}
