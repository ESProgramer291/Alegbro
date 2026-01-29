import { useAuth } from '@/contexts/AuthContext'; // adjust path as needed
import { PLAN_FEATURES, PlanFeatures, PlanType } from '@/types/plans';

export function usePlan() {
    const { user } = useAuth();

    const planType: PlanType = user?.planType || 'free';
    const features: PlanFeatures = PLAN_FEATURES[planType];

    const hasFeature = (feature: keyof PlanFeatures): boolean => {
        const value = features[feature];
        if (typeof value === 'boolean') return value;
        if (typeof value === 'number') return value > 0;
        return false;
    };

    const aiGuidanceRemaining = (): number | null => {
        if (features.aiGuidanceLimit === null) return null;
        return Math.max(0, features.aiGuidanceLimit - (user?.aiGuidanceUsedToday || 0));
    };

    const canUseAiGuidance = (): boolean => {
        const remaining = aiGuidanceRemaining();
        if (remaining === null) return true; // unlimited
        return remaining > 0;
    };

    return {
        planType,
        features,
        hasFeature,
        canUseAiGuidance,
        aiGuidanceRemaining,
        isPro: planType === 'pro',
        isFree: planType === 'free',
    };
}
