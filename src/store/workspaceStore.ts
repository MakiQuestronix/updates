import { create } from "zustand";

export type WorkspaceRole = "OWNER" | "APPROVER" | "EDITOR";

export type WorkspaceStatus = "ACTIVE" | "ARCHIVED";

export type Workspace = {
  id: number;
  name: string;
  description?: string;

  role: WorkspaceRole;

  leadCurator: {
    id: number;
    name: string;
    email: string;
  };

  knowledgeCount: number;
  staffCount: number;

  status: WorkspaceStatus;

  createdAt: string;
  updatedAt: string;
};

export type WorkspaceStore = {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
  members: WorkspaceMember[];
  setSelectedWorkspace: (workspace: Workspace) => void;

  fetchWorkspaces: () => Promise<void>;
  fetchMembers: (workspaceId: number) => Promise<void>;
};

export type WorkspaceMember = {
  id: number;
  workspaceId: number;

  name: string;
  email: string;

  role: WorkspaceRole;

  joinedAt: string;
};

const dummyMembers: WorkspaceMember[] = [
  {
    id: 1,
    workspaceId: 1,
    name: "John Smith",
    email: "john@company.com",
    role: "OWNER",
    joinedAt: "2026-01-10",
  },
  {
    id: 2,
    workspaceId: 1,
    name: "Jane Doe",
    email: "jane@company.com",
    role: "APPROVER",
    joinedAt: "2026-02-15",
  },
  {
    id: 3,
    workspaceId: 1,
    name: "Mark Cruz",
    email: "mark@company.com",
    role: "EDITOR",
    joinedAt: "2026-03-01",
  },
  {
    id: 4,
    workspaceId: 2,
    name: "Sarah Lee",
    email: "sarah@company.com",
    role: "APPROVER",
    joinedAt: "2026-01-22",
  },
  {
    id: 5,
    workspaceId: 2,
    name: "Mike Johnson",
    email: "mike@company.com",
    role: "EDITOR",
    joinedAt: "2026-02-10",
  },
];

const dummyWorkspaces: Workspace[] = [
  {
    id: 1,
    name: "HR Department",
    description: "Employee policies and onboarding documents",

    role: "OWNER",

    leadCurator: {
      id: 1,
      name: "John Smith",
      email: "john@company.com",
    },

    knowledgeCount: 12,
    staffCount: 8,

    status: "ACTIVE",

    createdAt: "2026-01-01",
    updatedAt: "2026-06-15",
  },
  {
    id: 2,
    name: "Engineering Department",
    description: "Technical specifications and development guides",

    role: "APPROVER",

    leadCurator: {
      id: 4,
      name: "Sarah Lee",
      email: "sarah@company.com",
    },

    knowledgeCount: 27,
    staffCount: 15,

    status: "ACTIVE",

    createdAt: "2026-01-15",
    updatedAt: "2026-06-14",
  },
  {
    id: 3,
    name: "Customer Support",
    description: "Support procedures and FAQs",

    role: "EDITOR",

    leadCurator: {
      id: 6,
      name: "Robert Garcia",
      email: "robert@company.com",
    },

    knowledgeCount: 9,
    staffCount: 6,

    status: "ACTIVE",

    createdAt: "2026-02-01",
    updatedAt: "2026-06-13",
  },
  {
    id: 4,
    name: "Operations Department",
    description: "Operational manuals and internal processes",

    role: "APPROVER",

    leadCurator: {
      id: 7,
      name: "Emily Davis",
      email: "emily@company.com",
    },

    knowledgeCount: 18,
    staffCount: 10,

    status: "ACTIVE",

    createdAt: "2026-02-20",
    updatedAt: "2026-06-12",
  },
];

const mockFetchMembers = async (
  workspaceId: number,
): Promise<WorkspaceMember[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        dummyMembers.filter((member) => member.workspaceId === workspaceId),
      );
    }, 500);
  });
};

const mockFetchWorkspaces = async (): Promise<Workspace[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyWorkspaces);
    }, 500);
  });
};

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspaces: [],

  selectedWorkspace: null,

  members: [],

  setSelectedWorkspace: (workspace) => set({ selectedWorkspace: workspace }),

  fetchWorkspaces: async () => {
    try {
      const workspaces = await mockFetchWorkspaces();

      set({ workspaces });
    } catch (error) {
      console.error("Failed to fetch workspaces:", error);
    }
  },

  fetchMembers: async (workspaceId) => {
    try {
      const members = await mockFetchMembers(workspaceId);

      set({ members });
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  },
}));
