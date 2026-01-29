'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { useShopStore, useAuthStore } from '@/lib/store';
import toast from 'react-hot-toast';

export default function ShopPage() {
  const items = useShopStore((state) => state.items);
  const ownedItems = useShopStore((state) => state.ownedItems);
  const user = useAuthStore((state) => state.user);
  const addOwnedItem = useShopStore((state) => state.addOwnedItem);
  const setUser = useAuthStore((state) => state.setUser);

  if (!user) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <p>Please sign in to access the shop</p>
        </div>
      </Layout>
    );
  }

  const handleBuyItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    if (user.xp < item.cost) {
      toast.error('Not enough XP!');
      return;
    }

    // Deduct XP from user
    const newXP = user.xp - item.cost;
    setUser({ ...user, xp: newXP });

    // Add to owned items
    const newItem = {
      ...item,
      active: false,
      expiresAt: item.effect.includes('xp') 
        ? new Date(Date.now() + 60 * 60 * 1000).toISOString() 
        : undefined,
    };
    addOwnedItem(newItem);

    toast.success(`Purchased ${item.name}!`);
  };

  return (
    <Layout>
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Shop</h1>
        <p className="text-gray-400 mb-8">
          Spend your XP on power-ups and cosmetics
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Shop Items */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Items</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="card border-2 border-primary-700 flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Effect: {item.effect.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBuyItem(item.id)}
                    className={`btn whitespace-nowrap ${
                      user.xp >= item.cost ? 'btn-primary' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {item.cost} XP
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Owned Items */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Items ({ownedItems.length})</h2>
            {ownedItems.length === 0 ? (
              <div className="card text-center py-12 text-gray-400">
                <p>You haven't purchased any items yet!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {ownedItems.map((item) => (
                  <div key={item.id} className="card border-2 border-accent-blue">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.active && (
                          <p className="text-sm text-accent-blue font-semibold">🟢 Active</p>
                        )}
                        {item.expiresAt && (
                          <p className="text-xs text-gray-400 mt-1">
                            Expires: {new Date(item.expiresAt).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Premium Section */}
        <div className="mt-12 card border-2 border-accent-purple bg-accent-purple/10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">⭐ Premium Plan</h3>
              <p className="text-gray-300">
                Unlimited AI usage, XP boosts, and deeper explanations
              </p>
            </div>
            <button className="btn btn-primary px-8 py-3">
              Upgrade • $2.99 / 30 days
            </button>
          </div>
        </div>

        {/* TODO: Implement PayPal integration */}
      </div>
    </Layout>
  );
}
