export type PlanType = 'free' | 'pro';

export interface UserPlan {
    type: PlanType;
    startDate: Date;
    endDate?: Date;
    isActive: boolean;
}

export interface PlanFeatures {
    aiGuidanceLimit: number | null; // null = unlimited
    xpMultiplier: number;
    streakFreezes: number;
    canUseCertificates: boolean;
    hasBonusMiniGames: boolean;
    hasChallengeModes: boolean;
    earlyGameUnlock: boolean;
}

export const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
    free: {
        aiGuidanceLimit: 5, // 5-10 guided problems per day
        xpMultiplier: 1,
        streakFreezes: 0,
        canUseCertificates: false,
        hasBonusMiniGames: false,
        hasChallengeModes: false,
        earlyGameUnlock: false,
    },
    pro: {
        aiGuidanceLimit: null, // unlimited
        xpMultiplier: 2.5, // 2-3x boost
        streakFreezes: 1, // per month (resets)
        canUseCertificates: true,
        hasBonusMiniGames: true,
        hasChallengeModes: true,
        earlyGameUnlock: true,
    },
};

export const PLAN_PRICING = {
    pro: {
        price: 2.99,
        currency: 'USD',
        billingCycle: 30, // days
    },
};
