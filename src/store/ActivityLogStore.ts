import { create } from "zustand";

export type ActivityLog = {
  id: number;
  name: string;
  size: number;
  status: number;
  owner: string;
  lastModified: string;
};

export type ActivityLogStore = {
  activityLogs: ActivityLog[];
  setActivityLogs: (logs: ActivityLog[]) => void;
  fetchActivityLog: () => Promise<void>;
};

export const getTimePassed = (timestamp: number) => {
  const now = Date.now();
  const diffMs = now - timestamp;

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    hours,
    minutes,
    label: hours > 0 ? `${hours}h ${minutes}m ago` : `${minutes}m ago`,
  };
};
const KB_TO_MB = 1024;
const dummyActivityLog: ActivityLog[] = [
  {
    id: 1,
    name: "EmployeeGuide.pdf",
    size: 2400 / KB_TO_MB, //kb
    status: 1,
    owner: "admin",
    lastModified: "2026-06-15 14:30",
  },
  {
    id: 2,
    name: "Contract.docx",
    size: 1100 / KB_TO_MB,
    status: 1,
    owner: "admin",
    lastModified: "2026-06-15 17:27",
  },
  {
    id: 3,
    name: "ProductSpecs.pdf",
    size: 5800 / KB_TO_MB,
    status: 1,
    owner: "admin",
    lastModified: "2026-06-13 14:30",
  },
  {
    id: 4,
    name: "FAQ.docx",
    size: 900 / KB_TO_MB,
    status: 1,
    owner: "admin",
    lastModified: "2026-08-15 14:40",
  },
];

const mockFetchActivityLog = async (): Promise<ActivityLog[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyActivityLog);
      //change to backend API call
    }, 500);
  });
};

export const useActivityLogStore = create<ActivityLogStore>((set) => ({
  activityLogs: [],

  setActivityLogs: (logs) => set({ activityLogs: logs }),

  fetchActivityLog: async () => {
    try {
      const logs = await mockFetchActivityLog();
      set({ activityLogs: logs });
    } catch (error) {
      console.error("Failed to fetch Activity Log:", error);
    }
  },
}));
