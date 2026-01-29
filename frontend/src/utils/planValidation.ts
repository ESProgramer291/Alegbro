import { PlanType, PLAN_FEATURES } from '@/types/plans';

export function canAccessFeature(
    planType: PlanType,
    feature: keyof typeof PLAN_FEATURES.free
): boolean {
    const features = PLAN_FEATURES[planType];
    const value = features[feature];

    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value > 0;
    return false;
}

export function getXpWithMultiplier(baseXp: number, planType: PlanType): number {
    const multiplier = PLAN_FEATURES[planType].xpMultiplier;
    return Math.floor(baseXp * multiplier);
}

export function getProPricePerDay(): number {
    const dailyPrice = 2.99 / 30;
    return parseFloat(dailyPrice.toFixed(2));
}
