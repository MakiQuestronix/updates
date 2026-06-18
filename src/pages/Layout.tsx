import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { SidebarContext } from "../context/SidebarContext";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ openSidebar: () => setSidebarOpen(true) }}
    >
      <div className="flex  h-screen overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 relative overflow-y-auto">
          <Outlet />
        </main>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </SidebarContext.Provider>
  );
}

export default Layout;
