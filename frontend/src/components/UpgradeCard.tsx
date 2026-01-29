import React from 'react';
import { usePlan } from '@/hooks/usePlan';
import { PLAN_PRICING, PLAN_FEATURES } from '@/types/plans';

export function UpgradeCard() {
    const { isFree } = usePlan();
    const proFeatures = PLAN_FEATURES.pro;

    if (!isFree) return null;

    return (
        <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-cyan-500/30 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-2">
                ✨ Unlock Pro Features
            </h3>
            <p className="text-slate-300 text-sm mb-4">
                For just ${PLAN_PRICING.pro.price}/month, get:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-200 mb-4">
                <li>✅ Unlimited AI Guidance</li>
                <li>✅ {proFeatures.xpMultiplier}× XP Multiplier</li>
                <li>✅ Streak Freezes</li>
                <li>✅ Certificates</li>
                <li>✅ Challenge Modes</li>
                <li>✅ Detailed Analytics</li>
            </ul>
            <button className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition">
                Upgrade Now
            </button>
        </div>
    );
}
