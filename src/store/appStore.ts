import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Resource {
  id: string;
  url: string;
  type: 'image' | 'script' | 'stylesheet' | 'font' | 'video' | 'other';
  size: number;
  carbon: number;
}

export interface Analysis {
  url: string;
  pageSize: number;
  co2Emission: number;
  loadTime: number;
  totalResources: number;
  performanceScore: number;
  resources: Resource[];
}

export interface LeaderboardEntry {
  rank: number;
  domain: string;
  url?: string;
  co2: number;
  co2Emission?: number;
  pageSize: number;
  loadTime: number;
  improvement: number;
  performanceScore?: number;
}

export interface TrendData {
  day: string;
  co2: number;
  pageSize: number;
}

interface AppStore {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  currentAnalysis: Analysis | null;
  setCurrentAnalysis: (analysis: any) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  comparisonData: {
    site1: Analysis | null;
    site2: Analysis | null;
  };
  setComparisonData: (key: 'site1' | 'site2', analysis: Analysis) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChatMessages: () => void;
  leaderboard: {
    eco: LeaderboardEntry[];
    carbon: LeaderboardEntry[];
  };
  weeklyTrends: TrendData[];
}

export const useAppStore = create<AppStore>((set) => ({

  isDarkMode: localStorage.getItem('darkMode') === 'true' || false,

  setIsDarkMode: (value) => {
    localStorage.setItem('darkMode', String(value));
    document.documentElement.classList.toggle('dark', value);
    set({ isDarkMode: value });
  },

  toggleDarkMode: () =>
    set((state) => {
      const newValue = !state.isDarkMode;
      localStorage.setItem('darkMode', String(newValue));
      document.documentElement.classList.toggle('dark', newValue);
      return { isDarkMode: newValue };
    }),

  isSidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  currentAnalysis: null,

  // 🔥 MAIN FIX (BACKEND → FRONTEND MAPPING)
  setCurrentAnalysis: (analysis: any) => {

    const mappedAnalysis: Analysis = {
      url: analysis.websiteUrl,

      pageSize: analysis.resourceSummary?.totalTransferBytes
        ? analysis.resourceSummary.totalTransferBytes / (1024 * 1024)
        : 0,

      co2Emission: analysis.carbonMetrics?.co2PerVisitGrams || 0,

      loadTime: 2.5, // dummy

      totalResources:
        analysis.resourceSummary?.totalResourceCount || 0,

      performanceScore:
        analysis.grade === 'A' ? 90 :
        analysis.grade === 'B' ? 75 :
        analysis.grade === 'C' ? 60 : 40,

      resources: (analysis.hotspots || []).map((r: any, index: number) => ({
        id: String(index),
        url: r.url,
        type: (r.type || 'other').toLowerCase(),
        size: r.sizeBytes || 0,
        carbon: r.co2Grams || 0,
      })),
    };

    set({ currentAnalysis: mappedAnalysis });
  },

  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),

  comparisonData: {
    site1: null,
    site2: null,
  },

  setComparisonData: (key, analysis) =>
    set((state) => ({
      comparisonData: {
        ...state.comparisonData,
        [key]: analysis,
      },
    })),

  chatMessages: [],
  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    })),

  clearChatMessages: () => set({ chatMessages: [] }),

  leaderboard: {
    eco: [
      {
        rank: 1,
        domain: 'eco-friendly.com',
        co2: 0.34,
        pageSize: 0.45,
        loadTime: 0.8,
        improvement: 45,
        performanceScore: 95,
      },
    ],
    carbon: [
      {
        rank: 1,
        domain: 'heavy-site.com',
        co2: 2.89,
        pageSize: 5.3,
        loadTime: 4.2,
        improvement: 12,
        performanceScore: 45,
      },
    ],
  },

  weeklyTrends: [
    { day: 'Mon', co2: 1.4, pageSize: 2.1 },
    { day: 'Tue', co2: 1.3, pageSize: 2.0 },
    { day: 'Wed', co2: 1.2, pageSize: 1.9 },
    { day: 'Thu', co2: 1.6, pageSize: 2.3 },
    { day: 'Fri', co2: 1.1, pageSize: 1.8 },
    { day: 'Sat', co2: 0.9, pageSize: 1.5 },
    { day: 'Sun', co2: 0.95, pageSize: 1.6 },
  ],
}));