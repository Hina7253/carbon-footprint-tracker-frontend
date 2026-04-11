// src/lib/api.ts
import axios from 'axios';


const api = axios.create({
  baseURL:  'http://localhost:8080/api',
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const carbonApi = {

  // ====================== ANALYSIS ======================
  
  startAnalysis: async (url: string, monthlyVisits: number = 10000) => {
    const response = await api.post('/analyses', {
      url: url,                    
      monthlyVisits: monthlyVisits
    });
    return response.data;
  },

  /** find analysis from id */
  getAnalysisById: async (id: number) => {
    const response = await api.get(`/analyses/${id}`);
    return response.data;
  },

  /** History  */
  getHistory: async () => {
    const response = await api.get('/analyses/history');
    return response.data;
  },

  // ====================== TRENDS ======================
  /** Weekly Trend */
  getWeeklyTrend: async () => {
    const response = await api.get('/analyses/trend/weekly');
    return response.data;
  },

  /** Trend of url */
  getUrlTrend: async (url: string) => {
    const response = await api.get('/analyses/trend/url', {
      params: { url }
    });
    return response.data;
  },

  // ====================== ADVANCED FEATURES ======================
  /** Code Fixes / AI Suggestions */
  getCodeFixes: async (id: number) => {
    const response = await api.get(`/analyses/${id}/code-fixes`);
    return response.data;
  },

  /** AI Chat */
  sendChatMessage: async (id: number, question: string) => {
    const response = await api.post(`/analyses/${id}/chat`, { question });
    return response.data;
  },

  /** Savings Calculation */
  getSavings: async (id: number) => {
    const response = await api.get(`/analyses/${id}/savings`);
    return response.data;
  },

  // ====================== COMPARISON ======================
  /** compare  */
  compareWebsites: async (url1: string, url2: string, monthlyVisits = 10000) => {
    const response = await api.post('/analyses/compare', {
      url1,
      url2,
      monthlyVisits
    });
    return response.data;
  },

  // ====================== LEADERBOARD ======================
  getLeaderboard: async () => {
    const response = await api.get('/analyses/leaderboard');
    return response.data;
  },

  getCleanestWebsites: async () => {
    const response = await api.get('/analyses/leaderboard/cleanest');
    return response.data;
  },

  getDirtiestWebsites: async () => {
    const response = await api.get('/analyses/leaderboard/dirtiest');
    return response.data;
  },

  // ====================== REPORT & EMAIL ======================
  downloadPdf: async (id: number) => {
    const response = await api.get(`/analyses/${id}/pdf`, {
      responseType: 'blob'
    });
    return response.data;
  },

  sendReportEmail: async (id: number, email: string) => {
    const response = await api.post(`/analyses/${id}/send-report`, { email });
    return response.data;
  },

  sendTipsEmail: async (id: number, email: string) => {
    const response = await api.post(`/analyses/${id}/send-tips`, { email });
    return response.data;
  },

  // ====================== UTILITY ======================
  healthCheck: async () => {
    const response = await api.get('/analyses/health');
    return response.data;
  }
};

export default carbonApi;