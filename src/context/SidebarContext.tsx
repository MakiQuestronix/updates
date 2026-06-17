import { createContext } from "react";

export type SidebarContextValue = {
  openSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);
