import { create } from "zustand";

export type Knowledge = {
  id: number;
  name: string;
  status: number;
};

export type KnowledgeStore = {
  knowledge: Knowledge[];
  setKnowledge: (stats: Knowledge[]) => void;
  fetchKnowledge: () => Promise<void>;
};

const dummyKnowledge: Knowledge[] = [
  { id: 1, name: "API_Guide.pdf", status: 2 },
  { id: 2, name: "Policy_v2.docx", status: 0 },
  { id: 3, name: "Manual.pdf", status: 2 },
  { id: 4, name: "FAQ.docx", status: 0 },
];

const mockFetchKnowledges = async (): Promise<Knowledge[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyKnowledge);
      //change to backend API call
    }, 500);
  });
};

export const useKnowledgeStore = create<KnowledgeStore>((set) => ({
  knowledge: [],
  setKnowledge: (knowledge: Knowledge[]) => set({ knowledge }),
  fetchKnowledge: async () => {
    try {
      const knowledge = await mockFetchKnowledges();
      set({ knowledge });
    } catch (error) {
      console.error("Failed to fetch knowledge:", error);
    }
  },
}));
