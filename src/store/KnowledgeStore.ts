import { create } from "zustand";

export type SortField = "lastUpdated" | "dateAdded" | "name";

export type ProcessingStatus =
  | "Completed"
  | "Processing"
  | "Pending"
  | "Failed";
export type ApprovalStatus = "Approved" | "Pending" | "Decline";
export type DocStatus = "Active" | "Archived";

export type KnowledgeDocument = {
  id: string;
  knowledgeBaseId: string;
  name: string;
  type: string;
  size: string;
  owner: string;
  archivedBy?: string;
  archivedDate?: string;
  status: ProcessingStatus;
  approval: ApprovalStatus;
  docStatus: DocStatus;
  date: string;
};

export type KnowledgeBase = {
  id: string;
  name: string;
  status: string;
  workspace: string;
  documents: number;
  lastUpdated: string;
  createdBy: string;
};

export type KnowledgeDetails = {
  id: string;
};

export type KnowledgeBaseStore = {
  knowledgeBase: KnowledgeBase[];
  recentKnowledgeBase: KnowledgeBase[];

  currentKnowledge?: KnowledgeBase | null;
  currentDocuments: KnowledgeDocument[];

  workspaces: string[];
  stats: {
    workspaceCount: number;
    knowledgeBaseCount: number;
    documentCount: number;
  };

  fetchKnowledge: (params?: {
    sort?: SortField;
    workspace?: string;
  }) => Promise<void>;

  fetchRecentKnowledge: () => Promise<void>;
  fetchKnowledgeById: (id: string) => Promise<void>;
  fetchDocumentsByKnowledgeId: (knowledgeBaseId: string) => Promise<void>;
};

const dummyKnowledge: KnowledgeBase[] = [
  {
    id: "1",
    name: "HRD",
    status: "Active",
    workspace: "Human Resource",
    documents: 500,
    lastUpdated: "2026-06-16 09:00:00",
    createdBy: "John Doe",
  },
  {
    id: "2",
    name: "Employee Handbook",
    status: "Active",
    workspace: "Human Resource",
    documents: 124,
    lastUpdated: "2026-06-21 14:30:00",
    createdBy: "Sarah Johnson",
  },
  {
    id: "3",
    name: "Finance Policies",
    status: "Active",
    workspace: "Finance",
    documents: 342,
    lastUpdated: "2026-06-22 08:15:00",
    createdBy: "Michael Chen",
  },
  {
    id: "4",
    name: "Audit Reports",
    status: "Inactive",
    workspace: "Finance",
    documents: 89,
    lastUpdated: "2026-06-02 10:00:00",
    createdBy: "Emily Davis",
  },
  {
    id: "5",
    name: "Product Documentation",
    status: "Active",
    workspace: "Engineering",
    documents: 768,
    lastUpdated: "2026-06-23 07:45:00",
    createdBy: "Alex Rodriguez",
  },
  {
    id: "6",
    name: "API References",
    status: "Active",
    workspace: "Engineering",
    documents: 412,
    lastUpdated: "2026-06-23 03:00:00",
    createdBy: "David Kim",
  },
  {
    id: "7",
    name: "Sales Playbooks",
    status: "Active",
    workspace: "Sales",
    documents: 215,
    lastUpdated: "2026-06-18 11:00:00",
    createdBy: "Lisa Brown",
  },
  {
    id: "9",
    name: "Marketing Assets",
    status: "Active",
    workspace: "Marketing",
    documents: 936,
    lastUpdated: "2026-06-22 16:20:00",
    createdBy: "Sophia Martinez",
  },
  {
    id: "105",
    name: "Customer Contracts",
    status: "Inactive",
    workspace: "Sales",
    documents: 178,
    lastUpdated: "2025-08-23 09:00:00",
    createdBy: "Robert Wilson",
  },
  {
    id: "10",
    name: "Brand Guidelines",
    status: "Active",
    workspace: "Marketing",
    documents: 67,
    lastUpdated: "2026-06-16 13:00:00",
    createdBy: "James Anderson",
  },
  {
    id: "11",
    name: "Legal Compliance",
    status: "Active",
    workspace: "Legal",
    documents: 284,
    lastUpdated: "2026-06-09 10:30:00",
    createdBy: "Olivia Taylor",
  },
  {
    id: "12",
    name: "Vendor Agreements",
    status: "Inactive",
    workspace: "Procurement",
    documents: 153,
    lastUpdated: "2026-04-23 08:00:00",
    createdBy: "Daniel Garcia",
  },
];

const dummyDocuments: KnowledgeDocument[] = [
  // KB 1 - HRD
  {
    id: "doc-1-1",
    knowledgeBaseId: "1",
    name: "Employee_Handbook.pdf",
    type: "PDF",
    size: "2.4 MB",
    owner: "Maki Cain",
    status: "Completed",
    approval: "Approved",
    date: "2024-05-20 09:00:00",
    docStatus: "Active",
  },
  {
    id: "doc-1-2",
    knowledgeBaseId: "1",
    name: "Code_of_Conduct.pdf",
    type: "PDF",
    size: "1.1 MB",
    owner: "Lili Pad",
    status: "Processing",
    approval: "Pending",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-05-20 10:30:00",
  },
  {
    id: "doc-1-3",
    knowledgeBaseId: "1",
    name: "Leave_Policy.pdf",
    type: "PDF",
    size: "890 KB",
    owner: "Ponpon Alarcon",
    status: "Pending",
    approval: "Approved",
    date: "2024-05-19 14:00:00",
    docStatus: "Active",
  },
  {
    id: "doc-1-4",
    knowledgeBaseId: "1",
    name: "Remote_Work_Policy.docx",
    type: "DOCX",
    size: "780 KB",
    owner: "Lea Aussie",
    status: "Completed",
    approval: "Pending",
    docStatus: "Active",
    date: "2024-05-18 11:00:00",
  },
  {
    id: "doc-1-5",
    knowledgeBaseId: "1",
    name: "Dress_Code.pdf",
    type: "PDF",
    size: "650 KB",
    owner: "John Doe",
    status: "Failed",
    approval: "Decline",
    date: "2024-05-18 09:30:00",
    docStatus: "Active",
  },

  // KB 2 - Employee Handbook
  {
    id: "doc-2-1",
    knowledgeBaseId: "2",
    name: "Onboarding_Guide.pdf",
    type: "PDF",
    size: "3.2 MB",
    owner: "Sarah Johnson",
    status: "Completed",
    approval: "Approved",
    date: "2024-06-01 09:00:00",
    docStatus: "Active",
  },
  {
    id: "doc-2-2",
    knowledgeBaseId: "2",
    name: "Benefits_Overview.pdf",
    type: "PDF",
    size: "1.8 MB",
    owner: "Mark Lee",
    status: "Completed",
    approval: "Approved",
    date: "2024-05-30 14:00:00",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
  },
  {
    id: "doc-2-3",
    knowledgeBaseId: "2",
    name: "Performance_Review_Template.docx",
    type: "DOCX",
    size: "540 KB",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    owner: "Sarah Johnson",
    status: "Pending",
    approval: "Pending",
    date: "2024-05-28 10:00:00",
  },
  {
    id: "doc-2-4",
    knowledgeBaseId: "2",
    name: "Compensation_Structure.xlsx",
    type: "XLSX",
    size: "420 KB",
    owner: "Nina Reyes",
    status: "Processing",
    approval: "Pending",
    date: "2024-05-27 11:30:00",
    docStatus: "Active",
  },
  {
    id: "doc-2-5",
    knowledgeBaseId: "2",
    name: "Anti_Harassment_Policy.pdf",
    type: "PDF",
    size: "760 KB",
    owner: "Sarah Johnson",
    status: "Completed",
    approval: "Approved",
    docStatus: "Active",
    date: "2024-05-25 09:00:00",
  },

  // KB 3 - Finance Policies
  {
    id: "doc-3-1",
    knowledgeBaseId: "3",
    name: "Budget_Approval_Process.pdf",
    type: "PDF",
    size: "1.5 MB",
    owner: "Michael Chen",
    status: "Completed",
    approval: "Approved",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-06-03 09:00:00",
  },
  {
    id: "doc-3-2",
    knowledgeBaseId: "3",
    name: "Expense_Policy.pdf",
    type: "PDF",
    size: "980 KB",
    owner: "Grace Tan",
    status: "Completed",
    approval: "Approved",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-06-01 14:00:00",
  },
  {
    id: "doc-3-3",
    knowledgeBaseId: "3",
    name: "Travel_Reimbursement.docx",
    type: "DOCX",
    size: "670 KB",
    owner: "Michael Chen",
    status: "Pending",
    approval: "Pending",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-05-29 10:00:00",
  },
  {
    id: "doc-3-4",
    knowledgeBaseId: "3",
    name: "Procurement_Guidelines.pdf",
    type: "PDF",
    size: "2.1 MB",
    owner: "Albert Cruz",
    status: "Processing",
    approval: "Pending",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-05-26 11:00:00",
  },
  {
    id: "doc-3-5",
    knowledgeBaseId: "3",
    name: "Financial_Controls.xlsx",
    type: "XLSX",
    size: "1.3 MB",
    owner: "Grace Tan",
    status: "Completed",
    approval: "Approved",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-05-22 09:00:00",
  },

  // KB 4 - Audit Reports
  {
    id: "doc-4-1",
    knowledgeBaseId: "4",
    name: "Q1_2024_Audit.pdf",
    type: "PDF",
    size: "4.7 MB",
    owner: "Emily Davis",
    status: "Completed",
    approval: "Approved",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-04-15 09:00:00",
  },
  {
    id: "doc-4-2",
    knowledgeBaseId: "4",
    name: "Q2_2024_Audit.pdf",
    type: "PDF",
    size: "4.2 MB",
    owner: "Emily Davis",
    status: "Processing",
    approval: "Pending",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-04-10 14:00:00",
  },
  {
    id: "doc-4-3",
    knowledgeBaseId: "4",
    name: "Internal_Controls_Assessment.docx",
    type: "DOCX",
    size: "1.9 MB",
    owner: "Tom Nguyen",
    status: "Pending",
    approval: "Pending",
    date: "2024-03-28 10:00:00",
    docStatus: "Active",
  },
  {
    id: "doc-4-4",
    knowledgeBaseId: "4",
    name: "Risk_Register.xlsx",
    type: "XLSX",
    size: "890 KB",
    owner: "Emily Davis",
    status: "Completed",
    approval: "Decline",
    date: "2024-03-20 11:00:00",
    docStatus: "Active",
  },
  {
    id: "doc-4-5",
    knowledgeBaseId: "4",
    name: "Compliance_Checklist.pdf",
    type: "PDF",
    size: "560 KB",
    owner: "Tom Nguyen",
    docStatus: "Active",
    status: "Failed",
    approval: "Decline",
    date: "2024-03-15 09:00:00",
  },

  // KB 5 - Product Documentation
  {
    id: "doc-5-1",
    knowledgeBaseId: "5",
    name: "Product_Roadmap_2024.pdf",
    type: "PDF",
    size: "3.8 MB",
    owner: "Alex Rodriguez",
    status: "Completed",
    approval: "Approved",
    date: "2024-06-10 09:00:00",
    docStatus: "Active",
  },
  {
    id: "doc-5-2",
    knowledgeBaseId: "5",
    name: "User_Stories_v2.docx",
    type: "DOCX",
    size: "1.2 MB",
    owner: "Carla Santos",
    status: "Completed",
    docStatus: "Active",
    approval: "Approved",
    date: "2024-06-08 14:00:00",
  },
  {
    id: "doc-5-3",
    knowledgeBaseId: "5",
    name: "System_Architecture.pdf",
    type: "PDF",
    size: "5.1 MB",
    owner: "Alex Rodriguez",
    docStatus: "Active",
    status: "Processing",
    approval: "Pending",
    date: "2024-06-05 10:00:00",
  },
  {
    id: "doc-5-4",
    knowledgeBaseId: "5",
    name: "Release_Notes_v3.1.txt",
    type: "TXT",
    size: "120 KB",
    owner: "Ben Torres",
    docStatus: "Active",
    status: "Completed",
    approval: "Approved",
    date: "2024-06-01 11:00:00",
  },
  {
    id: "doc-5-5",
    knowledgeBaseId: "5",
    name: "QA_Test_Plan.xlsx",
    type: "XLSX",
    size: "2.4 MB",
    owner: "Carla Santos",
    status: "Pending",
    approval: "Pending",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-05-29 09:00:00",
  },

  // KB 6 - API References
  {
    id: "doc-6-1",
    knowledgeBaseId: "6",
    name: "REST_API_Docs_v4.pdf",
    type: "PDF",
    size: "6.3 MB",
    owner: "David Kim",
    status: "Completed",
    approval: "Approved",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-06-12 09:00:00",
  },
  {
    id: "doc-6-2",
    knowledgeBaseId: "6",
    name: "Authentication_Guide.pdf",
    type: "PDF",
    size: "1.7 MB",
    owner: "David Kim",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    status: "Completed",
    approval: "Approved",
    date: "2024-06-10 14:00:00",
  },
  {
    id: "doc-6-3",
    knowledgeBaseId: "6",
    name: "Webhook_Integration.docx",
    type: "DOCX",
    size: "980 KB",
    owner: "Faye Lin",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    status: "Processing",
    approval: "Pending",
    date: "2024-06-07 10:00:00",
  },
  {
    id: "doc-6-4",
    knowledgeBaseId: "6",
    name: "Rate_Limits_Policy.txt",
    type: "TXT",
    size: "85 KB",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    owner: "Faye Lin",
    status: "Completed",
    approval: "Approved",
    date: "2024-06-05 11:00:00",
  },
  {
    id: "doc-6-5",
    knowledgeBaseId: "6",
    name: "SDK_Changelog.pdf",
    type: "PDF",
    size: "2.2 MB",
    owner: "David Kim",
    status: "Failed",
    approval: "Decline",
    docStatus: "Active",
    date: "2024-06-01 09:00:00",
  },

  // KB 7 - Sales Playbooks
  {
    id: "doc-7-1",
    knowledgeBaseId: "7",
    name: "Enterprise_Sales_Playbook.pdf",
    docStatus: "Active",
    type: "PDF",
    size: "4.0 MB",
    owner: "Lisa Brown",
    status: "Completed",
    approval: "Approved",
    date: "2024-05-31 09:00:00",
  },
  {
    id: "doc-7-2",
    knowledgeBaseId: "7",
    name: "Cold_Outreach_Scripts.docx",
    type: "DOCX",
    docStatus: "Active",
    size: "760 KB",
    owner: "Carlos Mendez",
    status: "Completed",
    approval: "Approved",
    date: "2024-05-28 14:00:00",
  },
  {
    id: "doc-7-3",
    knowledgeBaseId: "7",
    name: "Objection_Handling_Guide.pdf",
    type: "PDF",
    docStatus: "Active",
    size: "1.4 MB",
    owner: "Lisa Brown",
    status: "Pending",
    approval: "Pending",
    date: "2024-05-25 10:00:00",
  },
  {
    id: "doc-7-4",
    knowledgeBaseId: "7",
    name: "Deal_Qualification_Checklist.xlsx",
    type: "XLSX",
    size: "310 KB",
    owner: "Carlos Mendez",
    status: "Completed",
    approval: "Approved",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-05-22 11:00:00",
  },
  {
    id: "doc-7-5",
    knowledgeBaseId: "7",
    name: "Competitive_Analysis.pptx",
    type: "PPTX",
    size: "8.5 MB",
    owner: "Lisa Brown",
    status: "Processing",
    approval: "Pending",
    date: "2024-05-20 09:00:00",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
  },

  // KB 8 - Customer Contracts
  {
    id: "doc-8-1",
    knowledgeBaseId: "8",
    name: "Master_Service_Agreement.pdf",
    type: "PDF",
    size: "2.9 MB",
    owner: "Robert Wilson",
    status: "Completed",
    approval: "Approved",
    date: "2024-04-30 09:00:00",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
  },
  {
    id: "doc-8-2",
    knowledgeBaseId: "8",
    name: "NDA_Template.docx",
    type: "DOCX",
    size: "450 KB",
    owner: "Janet Cruz",
    status: "Completed",
    approval: "Approved",
    date: "2024-04-25 14:00:00",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
  },
  {
    id: "doc-8-3",
    knowledgeBaseId: "8",
    name: "SLA_Agreement.pdf",
    type: "PDF",
    size: "1.6 MB",
    owner: "Robert Wilson",
    status: "Pending",
    approval: "Pending",
    date: "2024-04-20 10:00:00",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
  },
  {
    id: "doc-8-4",
    knowledgeBaseId: "8",
    name: "Renewal_Terms.docx",
    type: "DOCX",
    size: "620 KB",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    owner: "Janet Cruz",
    status: "Failed",
    approval: "Decline",
    date: "2024-04-15 11:00:00",
  },
  {
    id: "doc-8-5",
    knowledgeBaseId: "8",
    name: "Contract_Addendum_2024.pdf",
    type: "PDF",
    size: "880 KB",
    owner: "Robert Wilson",
    status: "Completed",
    approval: "Pending",
    date: "2024-04-10 09:00:00",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
  },

  // KB 9 - Marketing Assets
  {
    id: "doc-9-1",
    knowledgeBaseId: "9",
    name: "Q3_Campaign_Brief.pdf",
    type: "PDF",
    size: "3.5 MB",
    owner: "Sophia Martinez",
    status: "Completed",
    docStatus: "Active",
    approval: "Approved",
    date: "2024-06-11 09:00:00",
  },
  {
    id: "doc-9-2",
    knowledgeBaseId: "9",
    name: "Social_Media_Calendar.xlsx",
    type: "XLSX",
    size: "970 KB",
    owner: "Ivan Park",
    docStatus: "Active",
    status: "Completed",
    approval: "Approved",
    date: "2024-06-09 14:00:00",
  },
  {
    id: "doc-9-3",
    knowledgeBaseId: "9",
    name: "Product_Launch_Deck.pptx",
    type: "PPTX",
    size: "12.4 MB",
    owner: "Sophia Martinez",
    docStatus: "Active",
    status: "Processing",
    approval: "Pending",
    date: "2024-06-06 10:00:00",
  },
  {
    id: "doc-9-4",
    knowledgeBaseId: "9",
    name: "Content_Strategy_2024.docx",
    type: "DOCX",
    size: "1.1 MB",
    docStatus: "Active",
    owner: "Ivan Park",
    status: "Pending",
    approval: "Pending",
    date: "2024-06-03 11:00:00",
  },
  {
    id: "doc-9-5",
    knowledgeBaseId: "9",
    name: "Email_Templates.pdf",
    type: "PDF",
    size: "740 KB",
    owner: "Sophia Martinez",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    status: "Completed",
    approval: "Approved",
    date: "2024-05-30 09:00:00",
  },

  // KB 10 - Brand Guidelines
  {
    id: "doc-10-1",
    knowledgeBaseId: "10",
    name: "Brand_Identity_Guide.pdf",
    type: "PDF",
    size: "7.2 MB",
    owner: "James Anderson",
    status: "Completed",
    approval: "Approved",
    date: "2024-05-10 09:00:00",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
  },
  {
    id: "doc-10-2",
    knowledgeBaseId: "10",
    name: "Logo_Usage_Policy.pdf",
    type: "PDF",
    size: "2.8 MB",
    owner: "James Anderson",
    status: "Completed",
    approval: "Approved",
    date: "2024-05-08 14:00:00",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
  },
  {
    id: "doc-10-3",
    knowledgeBaseId: "10",
    name: "Typography_Standards.docx",
    type: "DOCX",
    size: "560 KB",
    owner: "Hana Fujimoto",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    status: "Pending",
    approval: "Pending",
    date: "2024-05-05 10:00:00",
  },
  {
    id: "doc-10-4",
    knowledgeBaseId: "10",
    name: "Color_Palette_Guide.pdf",
    type: "PDF",
    size: "4.1 MB",
    owner: "Hana Fujimoto",
    docStatus: "Active",
    status: "Completed",
    approval: "Approved",
    date: "2024-05-01 11:00:00",
  },
  {
    id: "doc-10-5",
    knowledgeBaseId: "10",
    name: "Photography_Standards.pptx",
    type: "PPTX",
    size: "9.3 MB",
    docStatus: "Active",
    owner: "James Anderson",
    status: "Processing",
    approval: "Pending",
    date: "2024-04-28 09:00:00",
  },

  // KB 11 - Legal Compliance
  {
    id: "doc-11-1",
    knowledgeBaseId: "11",
    name: "GDPR_Compliance_Policy.pdf",
    type: "PDF",
    size: "3.3 MB",
    owner: "Olivia Taylor",
    docStatus: "Active",
    status: "Completed",
    approval: "Approved",
    date: "2024-05-15 09:00:00",
  },
  {
    id: "doc-11-2",
    knowledgeBaseId: "11",
    name: "Data_Retention_Policy.pdf",
    type: "PDF",
    size: "1.2 MB",
    owner: "Olivia Taylor",
    status: "Completed",
    docStatus: "Active",
    approval: "Approved",
    date: "2024-05-12 14:00:00",
  },
  {
    id: "doc-11-3",
    knowledgeBaseId: "11",
    name: "IP_Protection_Guidelines.docx",
    type: "DOCX",
    size: "870 KB",
    owner: "Marcus Webb",
    status: "Pending",
    approval: "Pending",
    docStatus: "Active",
    date: "2024-05-09 10:00:00",
  },
  {
    id: "doc-11-4",
    knowledgeBaseId: "11",
    name: "Whistleblower_Policy.pdf",
    type: "PDF",
    size: "640 KB",
    owner: "Olivia Taylor",
    status: "Completed",
    approval: "Approved",
    docStatus: "Active",
    date: "2024-05-05 11:00:00",
  },
  {
    id: "doc-11-5",
    knowledgeBaseId: "11",
    name: "Regulatory_Updates_2024.xlsx",
    type: "XLSX",
    size: "1.5 MB",
    owner: "Marcus Webb",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    status: "Processing",
    approval: "Pending",
    date: "2024-04-30 09:00:00",
  },

  // KB 12 - Vendor Agreements
  {
    id: "doc-12-1",
    knowledgeBaseId: "12",
    name: "Vendor_Evaluation_Framework.pdf",
    type: "PDF",
    size: "2.0 MB",
    owner: "Daniel Garcia",
    status: "Completed",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    approval: "Approved",
    date: "2024-03-10 09:00:00",
  },
  {
    id: "doc-12-2",
    knowledgeBaseId: "12",
    name: "Supplier_Code_of_Conduct.pdf",
    type: "PDF",
    size: "1.1 MB",
    owner: "Rachel Lim",
    status: "Completed",
    approval: "Approved",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    date: "2024-03-05 14:00:00",
  },
  {
    id: "doc-12-3",
    knowledgeBaseId: "12",
    name: "Procurement_SLA.docx",
    type: "DOCX",
    size: "730 KB",
    owner: "Daniel Garcia",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    status: "Pending",
    approval: "Pending",
    date: "2024-02-28 10:00:00",
  },
  {
    id: "doc-12-4",
    knowledgeBaseId: "12",
    name: "Contract_Renewal_Tracker.xlsx",
    type: "XLSX",
    size: "480 KB",
    owner: "Rachel Lim",
    status: "Failed",
    docStatus: "Archived",
    archivedBy: "Deanne Bea",
    archivedDate: "2026-06-22 10:00:00",
    approval: "Decline",
    date: "2024-02-20 11:00:00",
  },
  {
    id: "doc-12-5",
    knowledgeBaseId: "12",
    name: "Approved_Vendors_List.pdf",
    type: "PDF",
    size: "860 KB",
    owner: "Daniel Garcia",
    docStatus: "Active",
    status: "Completed",
    approval: "Pending",
    date: "2024-02-15 09:00:00",
  },
];

const mockFetchKnowledges = async (params?: {
  sort?: SortField;
  workspace?: string;
}): Promise<KnowledgeBase[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...dummyKnowledge];

      if (params?.workspace && params.workspace !== "All workspaces") {
        results = results.filter((kb) => kb.workspace === params.workspace);
      }

      if (params?.sort === "name") {
        results.sort((a, b) => a.name.localeCompare(b.name));
      } else if (params?.sort === "lastUpdated") {
        results.sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime(),
        );
      } else if (params?.sort === "dateAdded") {
        results.sort((a, b) => Number(a.id) - Number(b.id));
      }

      resolve(results);
    });
  });
};

const mockFetchKnowledgeById = async (
  id: string,
): Promise<KnowledgeBase | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyKnowledge.find((kb) => kb.id === String(id)) ?? null);
    });
  });
};

const mockFetchDocumentsByKnowledgeId = async (
  knowledgeBaseId: string,
): Promise<KnowledgeDocument[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const docs = dummyDocuments
        .filter((doc) => doc.knowledgeBaseId === knowledgeBaseId)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      resolve(docs);
    });
  });
};

export const useKnowledgeStore = create<KnowledgeBaseStore>((set) => ({
  knowledgeBase: [],
  recentKnowledgeBase: [],
  workspaces: [],
  currentKnowledge: null,
  currentDocuments: [],
  stats: { workspaceCount: 0, knowledgeBaseCount: 0, documentCount: 0 },

  fetchKnowledge: async (params) => {
    try {
      // palitan pag totoong backend na
      // const res = await fetch(`/api/knowledge?sort=${params?.sort ?? ""}&workspace=${params?.workspace ?? ""}`)
      // const knowledgeBase = await res.json()

      const knowledgeBase = await mockFetchKnowledges(params);

      const allKnowledge = await mockFetchKnowledges({});
      const workspaces = [...new Set(allKnowledge.map((kb) => kb.workspace))];
      const stats = {
        workspaceCount: workspaces.length,
        knowledgeBaseCount: allKnowledge.length,
        documentCount: allKnowledge.reduce(
          (sum, kb) => sum + (kb.documents ?? 0),
          0,
        ),
      };
      set({ knowledgeBase, workspaces, stats });
    } catch (error) {
      console.error("Failed to fetch knowledge:", error);
    }
  },

  fetchRecentKnowledge: async () => {
    const recentKnowledgeBase = await mockFetchKnowledges({
      sort: "lastUpdated",
    });
    set({
      recentKnowledgeBase: recentKnowledgeBase.slice(0, 3),
    });
  },

  fetchKnowledgeById: async (id) => {
    try {
      const currentKnowledge = await mockFetchKnowledgeById(id);
      set({ currentKnowledge });
    } catch (error) {
      console.error("Failed to fetch knowledge by id:", error);
    }
  },

  fetchDocumentsByKnowledgeId: async (knowledgeBaseId) => {
    try {
      // palitan pag totoong backend na
      // const res = await fetch(`/api/knowledge/${knowledgeBaseId}/documents`)
      // const currentDocuments = await res.json()

      const currentDocuments =
        await mockFetchDocumentsByKnowledgeId(knowledgeBaseId);
      set({ currentDocuments });
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  },
}));
