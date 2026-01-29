'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { formatXP } from '@/lib/gameUtils';

export default function Navigation() {
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="bg-dark-900 border-b border-primary-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-2xl font-bold bg-gradient-blue bg-clip-text text-transparent">
          Alegbro
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <div className="flex items-center gap-2 bg-dark-800 px-4 py-2 rounded-lg border border-primary-700">
              <span className="text-accent-blue">⚡</span>
              <span className="font-semibold">{formatXP(user.xp)} XP</span>
            </div>

            <div className="flex items-center gap-2 bg-dark-800 px-4 py-2 rounded-lg border border-primary-700">
              <span className="text-accent-pink">🔥</span>
              <span className="font-semibold">{user.streak}</span>
            </div>

            {user.premium && (
              <div className="px-3 py-1 bg-accent-purple rounded-full text-sm font-semibold">
                ⭐ Premium
              </div>
            )}

            <Link href="/shop" className="p-2 hover:bg-dark-800 rounded-lg transition">
              🛍️
            </Link>

            <Link href="/profile" className="p-2 hover:bg-dark-800 rounded-lg transition">
              👤
            </Link>
          </>
        ) : (
          <div className="flex gap-3">
            <Link href="/auth/signin" className="btn btn-secondary">
              Sign In
            </Link>
            <Link href="/auth/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
