import React from 'react';
import { usePlan } from '@/hooks/usePlan';

export function AiGuidanceLimit() {
    const { canUseAiGuidance, aiGuidanceRemaining, isPro } = usePlan();

    if (isPro) return null; // Pro has unlimited

    const remaining = aiGuidanceRemaining();
    if (remaining === null) return null;

    return (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm">
            <p className="text-amber-200">
                <span className="font-semibold">{remaining}</span> AI guidance{remaining === 1 ? '' : 's'} remaining today
            </p>
            {!canUseAiGuidance() && (
                <p className="text-amber-300 mt-2 text-xs">
                    Come back tomorrow or upgrade to Pro for unlimited guidance.
                </p>
            )}
        </div>
    );
}
