'use client';

import React, { useState } from 'react';
import { supabase, signUp } from '@/lib/supabase';
import { useAuthStore } from '@/lib/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await signUp(email, password);

      if (error) {
        toast.error(error.message);
        return;
      }

      // Create user profile in database
      if (data.user) {
        const { error: dbError } = await supabase.from('users').insert({
          id: data.user.id,
          email: data.user.email,
          xp: 0,
          streak: 0,
          premium: false,
          premium_expiry: null,
          created_at: new Date().toISOString(),
        });

        if (dbError) {
          toast.error('Failed to create user profile');
          return;
        }

        // Set user in store
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          xp: 0,
          streak: 0,
          premium: false,
          premium_expiry: null,
          created_at: new Date().toISOString(),
        });

        toast.success('Account created! Welcome to Alegbro 🎉');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-blue bg-clip-text text-transparent mb-2">
            Alegbro
          </h1>
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-gray-400 mt-2">Join the learning revolution</p>
        </div>

        <form onSubmit={handleSignUp} className="card space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-primary-700 focus:border-primary-500 focus:outline-none transition text-white placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-primary-700 focus:border-primary-500 focus:outline-none transition text-white placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-primary-700 focus:border-primary-500 focus:outline-none transition text-white placeholder-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-primary-400 hover:text-primary-300 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
