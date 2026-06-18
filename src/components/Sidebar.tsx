import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useWorkspaceStore } from "../store/workspaceStore";

//assets
import logo from "../assets/Logo.svg";
import HomeIcon from "../assets/home.svg?react";
import BriefcaseIcon from "../assets/briefcase.svg?react";
import BulbIcon from "../assets/bulb.svg?react";
import DocIcon from "../assets/doc.svg?react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { workspaces, fetchWorkspaces } = useWorkspaceStore();
  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/Layout/dashboard" },
    { name: "Workspace", icon: BriefcaseIcon, path: "/Layout/workspace" },
    { name: "Knowledges", icon: BulbIcon, path: "/Layout/knowledges" },
    { name: "Documents", icon: DocIcon, path: "/Layout/documents" },
  ];

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white border-r border-[#E0E0E0] shadow-sm transition-transform duration-300 ease-out md:relative md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <aside className="px-4 py-6">
        <div className="flex flex-col items-center gap-2 mb-5">
          <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          <h6 className="font-inter text-xl font-bold">Ingest IQ</h6>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-2xl text-sm my-1 transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "bg-black text-white scale-105 shadow-lg"
                      : "text-black hover:bg-gray-100 hover:translate-x-1"
                  }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "invert" : ""}`}
                  />
                  <span className="font-medium">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
      <hr className="w-full border-b border-[#E0E0E0]" />
      <div className="px-4 py-6">
        <h3 className="font-inter font-semibold mb-3">My Workspaces</h3>

        <nav className="flex flex-col">
          {workspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="px-4 h-fit py-2 mt-1 rounded-md cursor-pointer hover:bg-gray-100 transition"
            >
              <p className="text-sm">{workspace.name}</p>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
