import { create } from "zustand";

export type Stat = {
  name: string;
  amount: number;
};

export type DashboardWorkspace = {
  id: number;
  name: string;
  knowledgeCount: number;
};

export type DashboardKnowledgeEntry = {
  id: number;
  name: string;
  status: "Active" | "Inactive" | "Pending";
};

export type DashboardActivityLog = {
  id: number;
  name: string;
  size: number;
  status: string;
  owner: string;
  lastModified: string;
};

export type ProcessingStatusSummary = {
  processing: number;
  completed: number;
  failed: number;
};

type DashboardData = {
  stats: Stat[];
  workspaces: DashboardWorkspace[];
  recentKnowledge: DashboardKnowledgeEntry[];
  activityLogs: DashboardActivityLog[];
  processingStatus: ProcessingStatusSummary;
};

export type DashboardStore = {
  stats: Stat[];
  workspaces: DashboardWorkspace[];
  recentKnowledge: DashboardKnowledgeEntry[];
  activityLogs: DashboardActivityLog[];
  processingStatus: ProcessingStatusSummary;
  isLoading: boolean;

  fetchDashboardData: () => Promise<void>;
};

// --- Dummy Data ---
const dummyDashboardData: DashboardData = {
  stats: [
    { name: "Pending Docs", amount: 128 },
    { name: "Completed Docs", amount: 432 },
    { name: "Active Workspaces", amount: 4 },
  ],

  workspaces: [
    { id: 1, name: "HR Department", knowledgeCount: 12 },
    { id: 2, name: "Engineering Department", knowledgeCount: 27 },
    { id: 3, name: "Customer Support", knowledgeCount: 9 },
    { id: 4, name: "Operations Department", knowledgeCount: 18 },
  ],

  recentKnowledge: [
    { id: 1, name: "API_Guide.pdf", status: "Active" },
    { id: 2, name: "Policy_v2.docx", status: "Inactive" },
    { id: 3, name: "Manual.pdf", status: "Pending" },
    { id: 4, name: "FAQ.docx", status: "Pending" },
  ],

  activityLogs: [
    {
      id: 1,
      name: "EmployeeGuide.pdf",
      size: 2400 / 1024,
      status: "Complete",
      owner: "John Smith",
      lastModified: "2026-06-15 14:30",
    },
    {
      id: 2,
      name: "Contract.docx",
      size: 1100 / 1024,
      status: "Failed",
      owner: "Jane Doe",
      lastModified: "2026-06-15 17:27",
    },
    {
      id: 3,
      name: "ProductSpecs.pdf",
      size: 5800 / 1024,
      status: "Pending",
      owner: "Sarah Lee",
      lastModified: "2026-06-13 14:30",
    },
    {
      id: 4,
      name: "FAQ.docx",
      size: 900 / 1024,
      status: "Complete",
      owner: "Mark Cruz",
      lastModified: "2026-06-12 09:40",
    },
  ],

  processingStatus: {
    processing: 20,
    completed: 75,
    failed: 5,
  },
};

//remove for backend
const mockFetchDashboardData = (): Promise<DashboardData> =>
  new Promise((resolve) => setTimeout(() => resolve(dummyDashboardData), 500));

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: [],
  workspaces: [],
  recentKnowledge: [],
  activityLogs: [],
  processingStatus: { processing: 0, completed: 0, failed: 0 },
  isLoading: false,

  fetchDashboardData: async () => {
    set({ isLoading: true });
    try {
      //alisin for backend and switch for real api call
      const data = await mockFetchDashboardData();

      set({
        stats: data.stats,
        workspaces: data.workspaces,
        recentKnowledge: data.recentKnowledge,
        activityLogs: data.activityLogs,
        processingStatus: data.processingStatus,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
