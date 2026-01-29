'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuthStore } from '@/lib/store';

// TODO: Implement full AI tutor functionality
// This is a placeholder for the AI-guided learning mode

export default function TutorPage() {
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI tutor. I\'ll help you work through problems step by step. What would you like to learn today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <p>Please sign in to use the AI tutor</p>
        </div>
      </Layout>
    );
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // TODO: Call OpenRouter API to get AI response
    // For now, show a placeholder
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I understand. Let me break this down into steps for you. What\'s the first thing you notice about this problem?',
        },
      ]);
      setLoading(false);
    }, 500);
  };

  return (
    <Layout>
      <div className="p-8 max-w-4xl mx-auto h-full flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🤖 AI Tutor</h1>
          <p className="text-gray-400">
            Get step-by-step guidance on any problem. I'll teach, never solve.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary-700 text-white'
                    : 'bg-dark-800 border border-primary-700 text-gray-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-dark-800 border border-primary-700 px-4 py-3 rounded-lg">
                <p className="text-gray-400">Thinking...</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your question or upload a problem..."
            className="flex-1 px-4 py-3 rounded-lg bg-dark-800 border border-primary-700 focus:border-primary-500 focus:outline-none transition text-white placeholder-gray-500"
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="btn btn-primary disabled:opacity-50"
          >
            Send
          </button>
        </div>

        {!user.premium && (
          <div className="mt-6 p-4 bg-accent-purple/20 border border-accent-purple rounded-lg text-center text-sm">
            <p>⭐ Premium users get unlimited AI tutor access and deeper explanations</p>
          </div>
        )}

        {/* TODO: Add premium feature info */}
      </div>
    </Layout>
  );
}
