import { create } from "zustand";

interface UserProfile {
  id: string;
  email: string;
  xp: number;
  streak: number;
  premium: boolean;
  premium_expiry: string | null;
  created_at: string;
}

interface AuthStore {
  user: UserProfile | null;
  loading: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  setPremium: (premium: boolean, expiryDate?: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  addXP: (amount) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, xp: state.user.xp + amount }
        : null,
    })),
  incrementStreak: () =>
    set((state) => ({
      user: state.user
        ? { ...state.user, streak: state.user.streak + 1 }
        : null,
    })),
  resetStreak: () =>
    set((state) => ({
      user: state.user ? { ...state.user, streak: 0 } : null,
    })),
  setPremium: (premium, expiryDate) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, premium, premium_expiry: expiryDate || null }
        : null,
    })),
}));

// Game progress store
interface GameProgress {
  gameId: string;
  miniGameId: string;
  completed: boolean;
  earnedXP: number;
}

interface GameStore {
  progress: GameProgress[];
  addProgress: (progress: GameProgress) => void;
  isCompleted: (miniGameId: string) => boolean;
}

export const useGameStore = create<GameStore>((set, get) => ({
  progress: [],
  addProgress: (progress) =>
    set((state) => ({
      progress: [...state.progress, progress],
    })),
  isCompleted: (miniGameId) => {
    const found = get().progress.find((p) => p.miniGameId === miniGameId);
    return found?.completed || false;
  },
}));

// Shop store
interface ShopItem {
  id: string;
  name: string;
  cost: number;
  effect: string;
  active: boolean;
  expiresAt?: string;
}

interface ShopStore {
  items: ShopItem[];
  ownedItems: ShopItem[];
  addOwnedItem: (item: ShopItem) => void;
  activateItem: (itemId: string) => void;
  removeExpiredItems: () => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  items: [
    {
      id: "1",
      name: "Streak Freeze",
      cost: 50,
      effect: "freeze_streak",
      active: false,
    },
    {
      id: "2",
      name: "XP Doubler (1 hour)",
      cost: 100,
      effect: "double_xp",
      active: false,
    },
    {
      id: "3",
      name: "XP Tripler (30 min)",
      cost: 150,
      effect: "triple_xp",
      active: false,
    },
  ],
  ownedItems: [],
  addOwnedItem: (item) =>
    set((state) => ({
      ownedItems: [...state.ownedItems, item],
    })),
  activateItem: (itemId) =>
    set((state) => ({
      ownedItems: state.ownedItems.map((item) =>
        item.id === itemId ? { ...item, active: true } : item
      ),
    })),
  removeExpiredItems: () =>
    set((state) => ({
      ownedItems: state.ownedItems.filter(
        (item) => !item.expiresAt || new Date(item.expiresAt) > new Date()
      ),
    })),
}));
