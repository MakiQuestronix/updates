import { create } from "zustand";

export type Workspace = {
  id: number;
  name: string;
  description?: string;
  owner: {
    id: number;
    name: string;
    email: string;
  };
  knowledgeCount: number;
  staffCount: number;
  documentCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type MemberPermissions = {
  workspaceAccess: boolean;
  uploadDocuments: boolean;
  createKnowledgeBases: boolean;
  approveDocuments: boolean;
  archiveDocuments: boolean;
  manageMembers: boolean;
};

export type WorkspaceMember = {
  id: number;
  workspaceId: number;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
  lastActive: string;
  photo: string;
  status: string;
  permissions: MemberPermissions;
};

export type ActivityItem = {
  description: string;
  timestamp: string;
};

export type TimelineSection = {
  label: string;
  items: string[];
};

export type StaffActivity = {
  memberId: number;
  stats: {
    documentsUploaded: number;
    knowledgeBases: number;
    reviewsCompleted: number;
    approvalsGiven: number;
  };
  recentActivity: ActivityItem[];
  timeline: TimelineSection[];
};

export type WorkspaceStore = {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  members: WorkspaceMember[];
  allMembers: WorkspaceMember[];
  currentStaffActivity: StaffActivity | null;
  isLoading: boolean;

  fetchWorkspaces: () => Promise<void>;
  fetchWorkspaceById: (id: number) => Promise<void>;
  fetchMembers: (workspaceId: number) => Promise<void>;
  fetchAllMembers: () => Promise<void>;
  fetchStaffActivity: (memberId: number) => Promise<void>;
};

const dummyWorkspaces: Workspace[] = [
  {
    id: 1,
    name: "HR Department",
    description: "Employee policies and onboarding documents",
    owner: { id: 1, name: "John Smith", email: "john@company.com" },
    knowledgeCount: 12,
    staffCount: 4,
    documentCount: 247,
    status: "Active",
    createdAt: "Jan 1, 2026",
    updatedAt: "Jun 15, 2026",
  },
  {
    id: 2,
    name: "Engineering Department",
    description: "Technical specifications and development guides",
    owner: { id: 5, name: "Sarah Lee", email: "sarah@company.com" },
    knowledgeCount: 27,
    staffCount: 5,
    documentCount: 189,
    status: "Active",
    createdAt: "Jan 15, 2026",
    updatedAt: "Jun 14, 2026",
  },
  {
    id: 3,
    name: "Customer Support",
    description: "Support procedures and FAQs",
    owner: { id: 10, name: "Daniel Santos", email: "daniel@company.com" },
    knowledgeCount: 9,
    staffCount: 4,
    documentCount: 134,
    status: "Active",
    createdAt: "Feb 1, 2026",
    updatedAt: "Jun 13, 2026",
  },
  {
    id: 4,
    name: "Operations Department",
    description: "Operational manuals and internal processes",
    owner: { id: 14, name: "Olivia Martinez", email: "olivia@company.com" },
    knowledgeCount: 18,
    staffCount: 4,
    documentCount: 201,
    status: "Inactive",
    createdAt: "Feb 20, 2026",
    updatedAt: "Jun 12, 2026",
  },
];

const dummyMembers: WorkspaceMember[] = [
  // HR Department
  {
    id: 1,
    workspaceId: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Owner",
    joinedAt: "Jan 10, 2026",
    lastActive: "Today, 10:34 AM",
    photo: "https://i.pravatar.cc/150?img=1",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: true,
      approveDocuments: true,
      archiveDocuments: true,
      manageMembers: true,
    },
  },
  {
    id: 2,
    workspaceId: 1,
    name: "Jane Doe",
    email: "jane.doe@company.com",
    role: "Approver",
    joinedAt: "Feb 15, 2026",
    lastActive: "Today, 09:20 AM",
    photo: "https://i.pravatar.cc/150?img=2",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: true,
      approveDocuments: true,
      archiveDocuments: true,
      manageMembers: false,
    },
  },
  {
    id: 3,
    workspaceId: 1,
    name: "Mark Cruz",
    email: "mark.cruz@company.com",
    role: "Editor",
    joinedAt: "Mar 1, 2026",
    lastActive: "Yesterday, 3:45 PM",
    photo: "https://i.pravatar.cc/150?img=3",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: false,
      approveDocuments: false,
      archiveDocuments: false,
      manageMembers: false,
    },
  },
  {
    id: 4,
    workspaceId: 1,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "Editor",
    joinedAt: "Mar 15, 2026",
    lastActive: "Today, 11:00 AM",
    photo: "https://i.pravatar.cc/150?img=4",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: false,
      approveDocuments: false,
      archiveDocuments: false,
      manageMembers: false,
    },
  },

  // Engineering Department
  {
    id: 5,
    workspaceId: 2,
    name: "Sarah Lee",
    email: "sarah.lee@company.com",
    role: "Owner",
    joinedAt: "Jan 22, 2026",
    lastActive: "Today, 08:50 AM",
    photo: "https://i.pravatar.cc/150?img=5",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: true,
      approveDocuments: true,
      archiveDocuments: true,
      manageMembers: true,
    },
  },
  {
    id: 6,
    workspaceId: 2,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Approver",
    joinedAt: "Feb 10, 2026",
    lastActive: "Today, 10:10 AM",
    photo: "https://i.pravatar.cc/150?img=6",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: true,
      approveDocuments: true,
      archiveDocuments: true,
      manageMembers: false,
    },
  },
  {
    id: 7,
    workspaceId: 2,
    name: "Robert Garcia",
    email: "robert.garcia@company.com",
    role: "Editor",
    joinedAt: "Feb 25, 2026",
    lastActive: "Yesterday, 5:30 PM",
    photo: "https://i.pravatar.cc/150?img=7",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: false,
      approveDocuments: false,
      archiveDocuments: false,
      manageMembers: false,
    },
  },
  {
    id: 8,
    workspaceId: 2,
    name: "Kevin Tan",
    email: "kevin.tan@company.com",
    role: "Editor",
    joinedAt: "Mar 1, 2026",
    lastActive: "Today, 09:00 AM",
    photo: "https://i.pravatar.cc/150?img=8",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: false,
      approveDocuments: false,
      archiveDocuments: false,
      manageMembers: false,
    },
  },
  {
    id: 9,
    workspaceId: 2,
    name: "Lisa Wong",
    email: "lisa.wong@company.com",
    role: "Editor",
    joinedAt: "Mar 10, 2026",
    lastActive: "Today, 07:45 AM",
    photo: "https://i.pravatar.cc/150?img=9",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: false,
      approveDocuments: false,
      archiveDocuments: false,
      manageMembers: false,
    },
  },

  // Customer Support
  {
    id: 10,
    workspaceId: 3,
    name: "Daniel Santos",
    email: "daniel.santos@company.com",
    role: "Owner",
    joinedAt: "Feb 1, 2026",
    lastActive: "Today, 10:34 AM",
    photo: "https://i.pravatar.cc/150?img=10",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: true,
      approveDocuments: true,
      archiveDocuments: true,
      manageMembers: true,
    },
  },
  {
    id: 11,
    workspaceId: 3,
    name: "Grace Lim",
    email: "grace.lim@company.com",
    role: "Approver",
    joinedAt: "Feb 5, 2026",
    lastActive: "Today, 08:30 AM",
    photo: "https://i.pravatar.cc/150?img=11",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: true,
      approveDocuments: true,
      archiveDocuments: true,
      manageMembers: false,
    },
  },
  {
    id: 12,
    workspaceId: 3,
    name: "Anna Reyes",
    email: "anna.reyes@company.com",
    role: "Editor",
    joinedAt: "Feb 20, 2026",
    lastActive: "Yesterday, 4:00 PM",
    photo: "https://i.pravatar.cc/150?img=12",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: false,
      approveDocuments: false,
      archiveDocuments: false,
      manageMembers: false,
    },
  },
  {
    id: 13,
    workspaceId: 3,
    name: "Chris Navarro",
    email: "chris.navarro@company.com",
    role: "Editor",
    joinedAt: "Mar 1, 2026",
    lastActive: "Today, 09:55 AM",
    photo: "https://i.pravatar.cc/150?img=13",
    status: "Active",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: false,
      approveDocuments: false,
      archiveDocuments: false,
      manageMembers: false,
    },
  },

  // Operations Department
  {
    id: 14,
    workspaceId: 4,
    name: "Olivia Martinez",
    email: "olivia.martinez@company.com",
    role: "Owner",
    joinedAt: "Feb 20, 2026",
    lastActive: "Jun 12, 2026",
    photo: "https://i.pravatar.cc/150?img=14",
    status: "Inactive",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: true,
      approveDocuments: true,
      archiveDocuments: true,
      manageMembers: true,
    },
  },
  {
    id: 15,
    workspaceId: 4,
    name: "Nathan Brooks",
    email: "nathan.brooks@company.com",
    role: "Approver",
    joinedAt: "Feb 25, 2026",
    lastActive: "Jun 11, 2026",
    photo: "https://i.pravatar.cc/150?img=15",
    status: "Inactive",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: true,
      approveDocuments: true,
      archiveDocuments: true,
      manageMembers: false,
    },
  },
  {
    id: 16,
    workspaceId: 4,
    name: "Sophia Chen",
    email: "sophia.chen@company.com",
    role: "Editor",
    joinedAt: "Mar 1, 2026",
    lastActive: "Jun 10, 2026",
    photo: "https://i.pravatar.cc/150?img=16",
    status: "Inactive",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: false,
      approveDocuments: false,
      archiveDocuments: false,
      manageMembers: false,
    },
  },
  {
    id: 17,
    workspaceId: 4,
    name: "Ethan Walker",
    email: "ethan.walker@company.com",
    role: "Editor",
    joinedAt: "Mar 15, 2026",
    lastActive: "Jun 9, 2026",
    photo: "https://i.pravatar.cc/150?img=17",
    status: "Inactive",
    permissions: {
      workspaceAccess: true,
      uploadDocuments: true,
      createKnowledgeBases: false,
      approveDocuments: false,
      archiveDocuments: false,
      manageMembers: false,
    },
  },
];

const dummyStaffActivities: StaffActivity[] = [
  {
    memberId: 1,
    stats: {
      documentsUploaded: 14,
      knowledgeBases: 5,
      reviewsCompleted: 32,
      approvalsGiven: 20,
    },
    recentActivity: [
      {
        description: "Approved Employee_Handbook.pdf",
        timestamp: "2 hours ago",
      },
      { description: "Added Jane Doe to workspace", timestamp: "Yesterday" },
      {
        description: "Created Knowledge Base: HR Policies",
        timestamp: "Yesterday",
      },
      { description: "Archived Onboarding_2023.pdf", timestamp: "3 days ago" },
    ],
    timeline: [
      { label: "Today", items: ["Approved Employee_Handbook.pdf"] },
      {
        label: "Yesterday",
        items: [
          "Added Jane Doe to workspace",
          "Created Knowledge Base: HR Policies",
        ],
      },
      {
        label: "Last Week",
        items: ["Added 3 staff members", "Archived Onboarding_2023.pdf"],
      },
    ],
  },
  {
    memberId: 2,
    stats: {
      documentsUploaded: 8,
      knowledgeBases: 23,
      reviewsCompleted: 45,
      approvalsGiven: 12,
    },
    recentActivity: [
      {
        description: "Approved Employee_Handbook.pdf",
        timestamp: "2 hours ago",
      },
      {
        description: "Created Knowledge Base: Engineering Docs",
        timestamp: "Yesterday",
      },
      { description: "Archived Policy_2024.pdf", timestamp: "3 days ago" },
    ],
    timeline: [
      { label: "Today", items: ["Approved Employee_Handbook.pdf"] },
      {
        label: "Yesterday",
        items: [
          "Created Knowledge Base: Engineering Docs",
          "Archived Policy_2024.pdf",
        ],
      },
      { label: "Last Week", items: ["Added 3 staff members"] },
    ],
  },
  {
    memberId: 3,
    stats: {
      documentsUploaded: 6,
      knowledgeBases: 2,
      reviewsCompleted: 10,
      approvalsGiven: 0,
    },
    recentActivity: [
      {
        description: "Uploaded Benefits_Overview.pdf",
        timestamp: "1 hour ago",
      },
      { description: "Edited Leave_Policy.docx", timestamp: "Yesterday" },
    ],
    timeline: [
      { label: "Today", items: ["Uploaded Benefits_Overview.pdf"] },
      { label: "Yesterday", items: ["Edited Leave_Policy.docx"] },
    ],
  },
  {
    memberId: 4,
    stats: {
      documentsUploaded: 4,
      knowledgeBases: 1,
      reviewsCompleted: 7,
      approvalsGiven: 0,
    },
    recentActivity: [
      { description: "Uploaded Org_Chart_2026.pdf", timestamp: "3 hours ago" },
    ],
    timeline: [
      { label: "Today", items: ["Uploaded Org_Chart_2026.pdf"] },
      { label: "Last Week", items: ["Created Knowledge Base: HR Docs"] },
    ],
  },
  {
    memberId: 5,
    stats: {
      documentsUploaded: 22,
      knowledgeBases: 10,
      reviewsCompleted: 58,
      approvalsGiven: 34,
    },
    recentActivity: [
      {
        description: "Approved API_Design_v2.pdf",
        timestamp: "30 minutes ago",
      },
      {
        description: "Created Knowledge Base: System Architecture",
        timestamp: "Today",
      },
      {
        description: "Added Robert Garcia to workspace",
        timestamp: "Yesterday",
      },
    ],
    timeline: [
      {
        label: "Today",
        items: [
          "Approved API_Design_v2.pdf",
          "Created Knowledge Base: System Architecture",
        ],
      },
      { label: "Yesterday", items: ["Added Robert Garcia to workspace"] },
      {
        label: "Last Week",
        items: ["Archived legacy docs", "Updated deployment guides"],
      },
    ],
  },
  {
    memberId: 6,
    stats: {
      documentsUploaded: 11,
      knowledgeBases: 6,
      reviewsCompleted: 29,
      approvalsGiven: 18,
    },
    recentActivity: [
      {
        description: "Reviewed Backend_Guidelines.pdf",
        timestamp: "1 hour ago",
      },
      { description: "Approved CI_CD_Runbook.pdf", timestamp: "Yesterday" },
    ],
    timeline: [
      { label: "Today", items: ["Reviewed Backend_Guidelines.pdf"] },
      { label: "Yesterday", items: ["Approved CI_CD_Runbook.pdf"] },
    ],
  },
  {
    memberId: 7,
    stats: {
      documentsUploaded: 9,
      knowledgeBases: 3,
      reviewsCompleted: 14,
      approvalsGiven: 0,
    },
    recentActivity: [
      {
        description: "Uploaded Database_Schema_v3.pdf",
        timestamp: "2 hours ago",
      },
    ],
    timeline: [
      { label: "Today", items: ["Uploaded Database_Schema_v3.pdf"] },
      { label: "Last Week", items: ["Updated API docs"] },
    ],
  },
  {
    memberId: 8,
    stats: {
      documentsUploaded: 5,
      knowledgeBases: 1,
      reviewsCompleted: 8,
      approvalsGiven: 0,
    },
    recentActivity: [
      {
        description: "Uploaded Frontend_Standards.pdf",
        timestamp: "Yesterday",
      },
    ],
    timeline: [
      { label: "Yesterday", items: ["Uploaded Frontend_Standards.pdf"] },
    ],
  },
  {
    memberId: 9,
    stats: {
      documentsUploaded: 7,
      knowledgeBases: 2,
      reviewsCompleted: 11,
      approvalsGiven: 0,
    },
    recentActivity: [
      { description: "Uploaded Testing_Checklist.pdf", timestamp: "Today" },
    ],
    timeline: [{ label: "Today", items: ["Uploaded Testing_Checklist.pdf"] }],
  },
  {
    memberId: 10,
    stats: {
      documentsUploaded: 16,
      knowledgeBases: 7,
      reviewsCompleted: 41,
      approvalsGiven: 26,
    },
    recentActivity: [
      { description: "Approved FAQ_v5.pdf", timestamp: "1 hour ago" },
      {
        description: "Created Knowledge Base: Escalation Procedures",
        timestamp: "Yesterday",
      },
    ],
    timeline: [
      { label: "Today", items: ["Approved FAQ_v5.pdf"] },
      {
        label: "Yesterday",
        items: ["Created Knowledge Base: Escalation Procedures"],
      },
      { label: "Last Week", items: ["Added 2 staff members"] },
    ],
  },
  {
    memberId: 11,
    stats: {
      documentsUploaded: 8,
      knowledgeBases: 4,
      reviewsCompleted: 22,
      approvalsGiven: 14,
    },
    recentActivity: [
      { description: "Reviewed SLA_Policy.pdf", timestamp: "3 hours ago" },
    ],
    timeline: [{ label: "Today", items: ["Reviewed SLA_Policy.pdf"] }],
  },
  {
    memberId: 12,
    stats: {
      documentsUploaded: 5,
      knowledgeBases: 1,
      reviewsCompleted: 9,
      approvalsGiven: 0,
    },
    recentActivity: [
      { description: "Uploaded Refund_Process.pdf", timestamp: "Yesterday" },
    ],
    timeline: [{ label: "Yesterday", items: ["Uploaded Refund_Process.pdf"] }],
  },
  {
    memberId: 13,
    stats: {
      documentsUploaded: 4,
      knowledgeBases: 1,
      reviewsCompleted: 6,
      approvalsGiven: 0,
    },
    recentActivity: [
      { description: "Uploaded Troubleshooting_Guide.pdf", timestamp: "Today" },
    ],
    timeline: [
      { label: "Today", items: ["Uploaded Troubleshooting_Guide.pdf"] },
    ],
  },
  {
    memberId: 14,
    stats: {
      documentsUploaded: 19,
      knowledgeBases: 9,
      reviewsCompleted: 47,
      approvalsGiven: 31,
    },
    recentActivity: [
      {
        description: "Approved Operations_Manual_v2.pdf",
        timestamp: "2 hours ago",
      },
      {
        description: "Created Knowledge Base: Process Docs",
        timestamp: "Yesterday",
      },
    ],
    timeline: [
      { label: "Today", items: ["Approved Operations_Manual_v2.pdf"] },
      { label: "Yesterday", items: ["Created Knowledge Base: Process Docs"] },
      { label: "Last Week", items: ["Archived outdated procedures"] },
    ],
  },
  {
    memberId: 15,
    stats: {
      documentsUploaded: 10,
      knowledgeBases: 5,
      reviewsCompleted: 28,
      approvalsGiven: 17,
    },
    recentActivity: [
      {
        description: "Approved Vendor_Contracts.pdf",
        timestamp: "4 hours ago",
      },
    ],
    timeline: [{ label: "Today", items: ["Approved Vendor_Contracts.pdf"] }],
  },
  {
    memberId: 16,
    stats: {
      documentsUploaded: 6,
      knowledgeBases: 2,
      reviewsCompleted: 10,
      approvalsGiven: 0,
    },
    recentActivity: [
      { description: "Uploaded Supply_Chain_SOP.pdf", timestamp: "Yesterday" },
    ],
    timeline: [
      { label: "Yesterday", items: ["Uploaded Supply_Chain_SOP.pdf"] },
    ],
  },
  {
    memberId: 17,
    stats: {
      documentsUploaded: 3,
      knowledgeBases: 1,
      reviewsCompleted: 5,
      approvalsGiven: 0,
    },
    recentActivity: [
      { description: "Uploaded Inventory_Guidelines.pdf", timestamp: "Today" },
    ],
    timeline: [
      { label: "Today", items: ["Uploaded Inventory_Guidelines.pdf"] },
    ],
  },
];

const mockFetchWorkspaces = (): Promise<Workspace[]> =>
  new Promise((resolve) => setTimeout(() => resolve(dummyWorkspaces)));

const mockFetchWorkspaceById = (id: number): Promise<Workspace | undefined> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(dummyWorkspaces.find((w) => w.id === id))),
  );

const mockFetchMembers = (workspaceId: number): Promise<WorkspaceMember[]> =>
  new Promise((resolve) =>
    setTimeout(() =>
      resolve(dummyMembers.filter((m) => m.workspaceId === workspaceId)),
    ),
  );

const mockFetchAllMembers = (): Promise<WorkspaceMember[]> =>
  new Promise((resolve) => setTimeout(() => resolve(dummyMembers)));

const mockFetchStaffActivity = (
  memberId: number,
): Promise<StaffActivity | undefined> =>
  new Promise((resolve) =>
    setTimeout(() =>
      resolve(dummyStaffActivities.find((a) => a.memberId === memberId)),
    ),
  );

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspaces: [],
  currentWorkspace: null,
  members: [],
  allMembers: [],
  currentStaffActivity: null,
  isLoading: false,

  fetchWorkspaces: async () => {
    set({ isLoading: true });
    try {
      // palitan for backend
      const workspaces = await mockFetchWorkspaces();

      // const res = await fetch("/api/workspaces", { credentials: "include" });
      // if (!res.ok) throw new Error("Failed to fetch workspaces");
      // const workspaces = await res.json();

      set({ workspaces });
    } catch (error) {
      console.error("Failed to fetch workspaces:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchWorkspaceById: async (id) => {
    set({ isLoading: true });
    try {
      // palitan for backend
      const workspace = await mockFetchWorkspaceById(id);
      if (!workspace) throw new Error(`Workspace ${id} not found`);

      // const res = await fetch(`/api/workspaces/${id}`, { credentials: "include" });
      // if (!res.ok) throw new Error("Failed to fetch workspace");
      // const workspace = await res.json();

      set({ currentWorkspace: workspace });
    } catch (error) {
      console.error("Failed to fetch workspace:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMembers: async (workspaceId) => {
    set({ isLoading: true });
    try {
      // palitan for backend
      const members = await mockFetchMembers(workspaceId);

      //sample
      // const res = await fetch(`/api/workspaces/${workspaceId}/members`, { credentials: "include" });

      set({ members });
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAllMembers: async () => {
    set({ isLoading: true });
    try {
      // palitan for backend
      const all = await mockFetchAllMembers();

      // const res = await fetch("/api/members", { credentials: "include" });
      // if (!res.ok) throw new Error("Failed to fetch all members");
      // const all = await res.json();

      const unique = all.filter(
        (m, i, arr) => arr.findIndex((x) => x.email === m.email) === i,
      );
      set({ allMembers: unique });
    } catch (error) {
      console.error("Failed to fetch all members:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStaffActivity: async (memberId) => {
    set({ isLoading: true });
    try {
      // palitan for backend
      const activity = await mockFetchStaffActivity(memberId);
      if (!activity)
        throw new Error(`No activity found for member ${memberId}`);

      // const res = await fetch(`/api/members/${memberId}/activity`, { credentials: "include" });
      // if (!res.ok) throw new Error("Failed to fetch staff activity");
      // const activity = await res.json();

      set({ currentStaffActivity: activity });
    } catch (error) {
      console.error("Failed to fetch staff activity:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
