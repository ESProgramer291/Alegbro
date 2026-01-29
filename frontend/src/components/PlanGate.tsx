import React from 'react';
import { usePlan } from '@/hooks/usePlan';
import { PLAN_PRICING } from '@/types/plans';

interface PlanGateProps {
    feature: string;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function PlanGate({ feature, children, fallback }: PlanGateProps) {
    const { isPro } = usePlan();

    if (isPro) {
        return <>{children}</>;
    }

    return (
        <div className="relative">
            <div className="opacity-50 pointer-events-none">
                {children}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg backdrop-blur-sm">
                <div className="bg-slate-900 border border-cyan-500/50 rounded-lg p-6 text-center max-w-sm">
                    <p className="text-white font-semibold mb-3">
                        {feature} is a Pro Feature
                    </p>
                    <p className="text-slate-400 text-sm mb-4">
                        Upgrade to Pro for ${PLAN_PRICING.pro.price}/month
                    </p>
                    <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition">
                        Upgrade to Pro
                    </button>
                </div>
            </div>
            {fallback}
        </div>
    );
}
