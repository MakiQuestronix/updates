import { create } from "zustand";

export type Stat = {
  name: string;
  amount: number;
};

export type DashboardStore = {
  // State
  mainStats: Stat[];

  // Actions
  setMainStats: (stats: Stat[]) => void;
  fetchDashboardData: () => Promise<void>;
};

// Dummy data
const dummyMainStats: Stat[] = [
  { name: "Pending Docs", amount: 128 },
  { name: "Completed Docs", amount: 432 },
  { name: "Active Workspaces", amount: 12 },
];

//remove this for backend
const mockFetchDashboardData = async (): Promise<{ stats: Stat[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ stats: dummyMainStats });
    }, 500);
  });
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  mainStats: [],

  setMainStats: (stats: Stat[]) => set({ mainStats: stats }),

  fetchDashboardData: async () => {
    try {
      //change this for backeeeend
      const data = await mockFetchDashboardData();
      set({ mainStats: data.stats });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  },
}));
