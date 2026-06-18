import { create } from "zustand";

export type WorkspaceRole = "OWNER" | "APPROVER" | "EDITOR";
export type WorkspaceStatus = "ACTIVE" | "INACTIVE";

export type MemberPermissions = {
  workspaceAccess: boolean;
  uploadDocuments: boolean;
  createKnowledgeBases: boolean;
  approveDocuments: boolean;
  archiveDocuments: boolean;
  manageMembers: boolean;
};

export type ActivityItem = {
  description: string;
  timestamp: string;
};

export type TimelineSection = {
  label: string;
  items: string[];
};

export type Workspace = {
  id: number;
  name: string;
  description?: string;
  leadCurator: {
    id: number;
    name: string;
    email: string;
  };
  knowledgeCount: number;
  staffCount: number;
  documentCount: number;
  status: WorkspaceStatus;
  createdAt: string;
  updatedAt: string;
};

export type WorkspaceMember = {
  id: number;
  workspaceId: number;
  name: string;
  email: string;
  role: WorkspaceRole;
  joinedAt: string;
  lastActive: string;
  photo: string;
  status: WorkspaceStatus;
  permissions: MemberPermissions;
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
  staffActivities: StaffActivity[];
  currentStaffActivity: StaffActivity | null;

  fetchWorkspaces: () => Promise<void>;
  fetchWorkspaceById: (id: number) => Promise<void>;
  fetchMembers: (workspaceId: number) => Promise<void>;
  fetchAllMembers: () => Promise<void>;
  fetchStaffActivity: (memberId: number) => Promise<void>;
};

//update this based on user stories
const ownerPermissions: MemberPermissions = {
  workspaceAccess: true,
  uploadDocuments: true,
  createKnowledgeBases: true,
  approveDocuments: true,
  archiveDocuments: true,
  manageMembers: true,
};

const approverPermissions: MemberPermissions = {
  workspaceAccess: true,
  uploadDocuments: true,
  createKnowledgeBases: true,
  approveDocuments: true,
  archiveDocuments: true,
  manageMembers: false,
};

const editorPermissions: MemberPermissions = {
  workspaceAccess: true,
  uploadDocuments: true,
  createKnowledgeBases: false,
  approveDocuments: false,
  archiveDocuments: false,
  manageMembers: false,
};

const dummyMembers: WorkspaceMember[] = [
  {
    id: 1,
    workspaceId: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    role: "OWNER",
    joinedAt: "2026-01-10",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: ownerPermissions,
  },
  {
    id: 2,
    workspaceId: 1,
    name: "Jane Doe",
    email: "jane.doe@company.com",
    role: "APPROVER",
    joinedAt: "2026-02-15",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: approverPermissions,
  },
  {
    id: 3,
    workspaceId: 1,
    name: "Mark Cruz",
    email: "mark.cruz@company.com",
    role: "EDITOR",
    joinedAt: "2026-03-01",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: editorPermissions,
  },
  {
    id: 4,
    workspaceId: 1,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "EDITOR",
    joinedAt: "2026-03-15",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: editorPermissions,
  },

  // Engineering Department
  {
    id: 5,
    workspaceId: 2,
    name: "Sarah Lee",
    email: "sarah.lee@company.com",
    role: "OWNER",
    joinedAt: "2026-01-22",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: ownerPermissions,
  },
  {
    id: 6,
    workspaceId: 2,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "APPROVER",
    joinedAt: "2026-02-10",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: approverPermissions,
  },
  {
    id: 7,
    workspaceId: 2,
    name: "Robert Garcia",
    email: "robert.garcia@company.com",
    role: "EDITOR",
    joinedAt: "2026-02-25",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: editorPermissions,
  },
  {
    id: 8,
    workspaceId: 2,
    name: "Kevin Tan",
    email: "kevin.tan@company.com",
    role: "EDITOR",
    joinedAt: "2026-03-01",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: editorPermissions,
  },
  {
    id: 9,
    workspaceId: 2,
    name: "Lisa Wong",
    email: "lisa.wong@company.com",
    role: "EDITOR",
    joinedAt: "2026-03-10",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: editorPermissions,
  },

  // Customer Support
  {
    id: 10,
    workspaceId: 3,
    name: "Daniel Santos",
    email: "daniel.santos@company.com",
    role: "OWNER",
    joinedAt: "2026-02-01",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: ownerPermissions,
  },
  {
    id: 11,
    workspaceId: 3,
    name: "Grace Lim",
    email: "grace.lim@company.com",
    role: "APPROVER",
    joinedAt: "2026-02-05",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: approverPermissions,
  },
  {
    id: 12,
    workspaceId: 3,
    name: "Anna Reyes",
    email: "anna.reyes@company.com",
    role: "EDITOR",
    joinedAt: "2026-02-20",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: editorPermissions,
  },
  {
    id: 13,
    workspaceId: 3,
    name: "Chris Navarro",
    email: "chris.navarro@company.com",
    role: "EDITOR",
    joinedAt: "2026-03-01",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: editorPermissions,
  },

  // Operations Department
  {
    id: 14,
    workspaceId: 4,
    name: "Olivia Martinez",
    email: "olivia.martinez@company.com",
    role: "OWNER",
    joinedAt: "2026-02-20",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: ownerPermissions,
  },
  {
    id: 15,
    workspaceId: 4,
    name: "Nathan Brooks",
    email: "nathan.brooks@company.com",
    role: "APPROVER",
    joinedAt: "2026-02-25",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: approverPermissions,
  },
  {
    id: 16,
    workspaceId: 4,
    name: "Sophia Chen",
    email: "sophia.chen@company.com",
    role: "EDITOR",
    joinedAt: "2026-03-01",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: editorPermissions,
  },
  {
    id: 17,
    workspaceId: 4,
    name: "Ethan Walker",
    email: "ethan.walker@company.com",
    role: "EDITOR",
    joinedAt: "2026-03-15",
    photo:
      "https://th.bing.com/th/id/OIP.xqQ6gPsQK9vP4CufBeJzHgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    status: "ACTIVE",
    lastActive: "Today, 10:34 A.M.",
    permissions: editorPermissions,
  },
];

const dummyStaffActivities: StaffActivity[] = [
  // John Smith – OWNER, HR
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
      {
        label: "Today",
        items: ["Approved Employee_Handbook.pdf"],
      },
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

  // Jane Doe – APPROVER, HR (matches the UI screenshots)
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
      { description: "Added John Doe to workspace", timestamp: "Yesterday" },
      {
        description: "Created Knowledge Base: Engineering Docs",
        timestamp: "Yesterday",
      },
      { description: "Archived Policy_2024.pdf", timestamp: "3 days ago" },
    ],
    timeline: [
      {
        label: "Today",
        items: [
          "Added John Doe to workspace",
          "Created Knowledge Base: Engineering Docs",
          "Archived Policy_2024.pdf",
        ],
      },
      {
        label: "Yesterday",
        items: [
          "Added John Doe to workspace",
          "Created Knowledge Base: Engineering Docs",
          "Archived Policy_2024.pdf",
        ],
      },
      {
        label: "Last Week",
        items: ["Added 3 staff members"],
      },
    ],
  },

  // Mark Cruz – EDITOR, HR
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

  // Emily Davis – EDITOR, HR
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

  // Sarah Lee – OWNER, Engineering
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

  // Mike Johnson – APPROVER, Engineering
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

  // Robert Garcia – EDITOR, Engineering
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

  // Kevin Tan – EDITOR, Engineering
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

  // Lisa Wong – EDITOR, Engineering
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

  // Daniel Santos – OWNER, Customer Support
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

  // Grace Lim – APPROVER, Customer Support
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

  // Anna Reyes – EDITOR, Customer Support
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

  // Chris Navarro – EDITOR, Customer Support
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

  // Olivia Martinez – OWNER, Operations
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

  // Nathan Brooks – APPROVER, Operations
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

  // Sophia Chen – EDITOR, Operations
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

  // Ethan Walker – EDITOR, Operations
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

const dummyWorkspaces: Workspace[] = [
  {
    id: 1,
    name: "HR Department",
    description: "Employee policies and onboarding documents",
    leadCurator: { id: 1, name: "John Smith", email: "john@company.com" },
    knowledgeCount: 12,
    staffCount: 4,
    status: "ACTIVE",
    createdAt: "2026-01-01",
    updatedAt: "2026-06-15",
    documentCount: 247,
  },
  {
    id: 2,
    name: "Engineering Department",
    description: "Technical specifications and development guides",
    leadCurator: { id: 5, name: "Sarah Lee", email: "sarah@company.com" },
    knowledgeCount: 27,
    documentCount: 247,
    staffCount: 5,
    status: "ACTIVE",
    createdAt: "2026-01-15",
    updatedAt: "2026-06-14",
  },
  {
    id: 3,
    name: "Customer Support",
    description: "Support procedures and FAQs",
    leadCurator: { id: 10, name: "Robert Garcia", email: "robert@company.com" },
    knowledgeCount: 9,
    staffCount: 4,
    status: "ACTIVE",
    createdAt: "2026-02-01",
    documentCount: 247,
    updatedAt: "2026-06-13",
  },
  {
    id: 4,
    name: "Operations Department",
    description: "Operational manuals and internal processes",
    leadCurator: { id: 14, name: "Emily Davis", email: "emily@company.com" },
    knowledgeCount: 18,
    staffCount: 4,
    status: "ACTIVE",
    documentCount: 247,
    createdAt: "2026-02-20",
    updatedAt: "2026-06-12",
  },
];

const mockFetchMembers = (workspaceId: number): Promise<WorkspaceMember[]> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(dummyMembers.filter((m) => m.workspaceId === workspaceId)),
      500,
    ),
  );

const mockFetchWorkspaces = (): Promise<Workspace[]> =>
  new Promise((resolve) => setTimeout(() => resolve(dummyWorkspaces), 500));

const mockFetchStaffActivity = (
  memberId: number,
): Promise<StaffActivity | undefined> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(dummyStaffActivities.find((a) => a.memberId === memberId)),
      500,
    ),
  );

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  currentWorkspace: null,
  workspaces: [],
  members: [],
  allMembers: [],
  staffActivities: dummyStaffActivities,
  currentStaffActivity: null,

  fetchWorkspaces: async () => {
    try {
      const workspaces = await mockFetchWorkspaces();
      set({ workspaces });
    } catch (error) {
      console.error("Failed to fetch workspaces:", error);
    }
  },

  fetchWorkspaceById: async (id) => {
    try {
      const workspace = await new Promise<Workspace | undefined>((resolve) =>
        setTimeout(
          () => resolve(dummyWorkspaces.find((w) => w.id === id)),
          500,
        ),
      );
      if (!workspace) throw new Error("Not found");
      set({ currentWorkspace: workspace });
    } catch (error) {
      console.error("Failed to fetch workspace:", error);
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

  fetchAllMembers: async () => {
    try {
      const all = await new Promise<WorkspaceMember[]>((resolve) =>
        setTimeout(() => resolve(dummyMembers), 500),
      );
      const unique = all.filter(
        (m, i, arr) => arr.findIndex((x) => x.email === m.email) === i,
      );
      set({ allMembers: unique });
    } catch (error) {
      console.error("Failed to fetch all members:", error);
    }
  },

  // ─── Now fully implemented ──────────────────────────────────────────────────
  fetchStaffActivity: async (memberId) => {
    try {
      const activity = await mockFetchStaffActivity(memberId);
      if (!activity)
        throw new Error(`No activity found for member ${memberId}`);
      set({ currentStaffActivity: activity });
    } catch (error) {
      console.error("Failed to fetch staff activity:", error);
    }
  },
}));
