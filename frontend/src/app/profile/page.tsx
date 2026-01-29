'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuthStore } from '@/lib/store';
import { signOut } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <p>Please sign in to view your profile</p>
        </div>
      </Layout>
    );
  }

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      setUser(null);
      toast.success('Signed out successfully');
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Member Since</label>
              <p className="text-lg font-semibold">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Status</label>
              <p className="text-lg font-semibold">
                {user.premium ? (
                  <span className="text-accent-purple">⭐ Premium</span>
                ) : (
                  <span className="text-gray-300">Free User</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6">Statistics</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-dark-900 p-4 rounded-lg border border-primary-700">
              <p className="text-sm text-gray-400">Total XP</p>
              <p className="text-3xl font-bold text-accent-blue">{user.xp.toLocaleString()}</p>
            </div>
            <div className="bg-dark-900 p-4 rounded-lg border border-primary-700">
              <p className="text-sm text-gray-400">Current Streak</p>
              <p className="text-3xl font-bold text-accent-pink">🔥 {user.streak}</p>
            </div>
            <div className="bg-dark-900 p-4 rounded-lg border border-primary-700">
              <p className="text-sm text-gray-400">Level</p>
              <p className="text-3xl font-bold text-accent-blue">
                {Math.floor(Math.sqrt(user.xp / 100)) + 1}
              </p>
            </div>
          </div>
        </div>

        {/* TODO: Add settings for preferences, notifications, etc. */}

        <button
          onClick={handleSignOut}
          disabled={loading}
          className="btn btn-danger w-full disabled:opacity-50"
        >
          {loading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </Layout>
  );
}
