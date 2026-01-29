'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-4 text-cyan-400">
          Alegbro
        </h1>

        <div className="mb-8 flex justify-center">
          <div className="text-9xl">🤖</div>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-white">
          Learn Math Like You&apos;re Playing a Game
        </h2>

        <p className="text-xl text-slate-300 mb-8">
          No punishment for mistakes. No XP loss. Just learning through repetition, analogy, and AI guidance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="card text-center">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="font-semibold text-white">Earn XP</h3>
            <p className="text-sm text-slate-400">Always increasing, never lost</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-2">🔥</div>
            <h3 className="font-semibold text-white">Build Streaks</h3>
            <p className="text-sm text-slate-400">Stay consistent, earn rewards</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-2">🤖</div>
            <h3 className="font-semibold text-white">AI Tutor</h3>
            <p className="text-sm text-slate-400">Step-by-step guidance</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/signup" className="btn btn-primary text-lg px-8 py-3">
            Get Started
          </Link>
          <Link href="/auth/signin" className="btn btn-secondary text-lg px-8 py-3">
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20 max-w-4xl w-full">
        <h3 className="text-2xl font-bold mb-8 text-center text-white">Why Alegbro?</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-hover">
            <h4 className="font-bold mb-2 text-cyan-400">No Fear of Mistakes</h4>
            <p className="text-slate-300">Every wrong answer is a learning opportunity, not a punishment</p>
          </div>
          <div className="card-hover">
            <h4 className="font-bold mb-2 text-cyan-400">Learn Through Analogy</h4>
            <p className="text-slate-300">Complex concepts explained with real-world comparisons</p>
          </div>
          <div className="card-hover">
            <h4 className="font-bold mb-2 text-cyan-400">Game-Like Progression</h4>
            <p className="text-slate-300">Levels, streaks, shop items, and rewards keep you motivated</p>
          </div>
          <div className="card-hover">
            <h4 className="font-bold mb-2 text-cyan-400">AI That Guides, Not Solves</h4>
            <p className="text-slate-300">Get step-by-step help without spoiling the answer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
