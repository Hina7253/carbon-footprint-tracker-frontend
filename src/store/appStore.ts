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
  setCurrentAnalysis: (analysis: Analysis) => void;
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
  toggleDarkMode: () => set((state) => {
    const newValue = !state.isDarkMode;
    localStorage.setItem('darkMode', String(newValue));
    document.documentElement.classList.toggle('dark', newValue);
    return { isDarkMode: newValue };
  }),

  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  currentAnalysis: null,
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),

  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),

  comparisonData: {
    site1: null,
    site2: null,
  },
  setComparisonData: (key, analysis) => set((state) => ({
    comparisonData: {
      ...state.comparisonData,
      [key]: analysis,
    },
  })),

  chatMessages: [],
  addChatMessage: (message) => set((state) => ({
    chatMessages: [...state.chatMessages, message],
  })),
  clearChatMessages: () => set({ chatMessages: [] }),

  leaderboard: {
    eco: [
      {
        rank: 1,
        domain: 'eco-friendly.com',
        url: 'eco-friendly.com',
        co2: 0.34,
        co2Emission: 0.34,
        pageSize: 0.45,
        loadTime: 0.8,
        improvement: 45,
        performanceScore: 95,
      },
      {
        rank: 2,
        domain: 'greentech.org',
        url: 'greentech.org',
        co2: 0.52,
        co2Emission: 0.52,
        pageSize: 0.68,
        loadTime: 1.2,
        improvement: 38,
        performanceScore: 88,
      },
      {
        rank: 3,
        domain: 'sustainable.io',
        url: 'sustainable.io',
        co2: 0.61,
        co2Emission: 0.61,
        pageSize: 0.82,
        loadTime: 1.4,
        improvement: 32,
        performanceScore: 82,
      },
    ],
    carbon: [
      {
        rank: 1,
        domain: 'heavy-site.com',
        url: 'heavy-site.com',
        co2: 2.89,
        co2Emission: 2.89,
        pageSize: 5.3,
        loadTime: 4.2,
        improvement: 12,
        performanceScore: 45,
      },
      {
        rank: 2,
        domain: 'old-tech.net',
        url: 'old-tech.net',
        co2: 2.45,
        co2Emission: 2.45,
        pageSize: 4.8,
        loadTime: 3.9,
        improvement: 18,
        performanceScore: 52,
      },
      {
        rank: 3,
        domain: 'bloated-app.io',
        url: 'bloated-app.io',
        co2: 2.12,
        co2Emission: 2.12,
        pageSize: 4.1,
        loadTime: 3.5,
        improvement: 22,
        performanceScore: 58,
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
