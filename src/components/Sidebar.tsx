import { Link, NavLink } from "react-router-dom";
import { useWorkspaceStore } from "../store/workspaceStore";

import HomeIcon from "../assets/home.svg?react";
import BriefcaseIcon from "../assets/briefcase.svg?react";
import BulbIcon from "../assets/bulb.svg?react";
import { useContext, useState, useEffect } from "react";

//Icons
import ArrowIcon from "../assets/arrow.svg?react";
import NotifIcon from "../assets/notif.svg?react";
import NotifRedIcon from "../assets/notif-red.svg?react";
import ButtonIcon from "../assets/button.svg?react";
import ShareIcon from "../assets/share.svg?react";
import profilePic from "../assets/maloi.jpg";
import { SidebarContext } from "../context/SidebarContext";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { fetchWorkspaces } = useWorkspaceStore();
  const menuItems = [
    { name: "Dashboard", icon: HomeIcon, path: "/Layout/dashboard" },
    { name: "Workspace", icon: BriefcaseIcon, path: "/Layout/workspace" },
    { name: "Knowledges", icon: BulbIcon, path: "/Layout/knowledges" },
  ];

  const [arrowPressed, setArrowPressed] = useState(false);

  const toggleArrow = () => {
    setArrowPressed(!arrowPressed);
  };

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return (
    <div
      className={`flex flex-col pt-10 justify-between pb-2 fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-white border-r border-[#E0E0E0] shadow-sm transition-transform duration-300 ease-out md:relative md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <aside className="px-4 py-6">
        <div className="flex flex-col items-center gap-2 mb-5">
          <h6 className="font-inter text-xl font-bold">Ingest IQ</h6>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-full text-sm my-1 transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "bg-second text-fourth scale-105 shadow-lg"
                      : "text-textColor hover:bg-second/20 hover:translate-x-1"
                  }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`size-5 text-fourth`} />
                  <span className="font-medium text-textColor">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex items-center justify-between mx-4 mb-4 p-2 border border-[#e0e0e0] rounded-md shadow">
        <img
          src={profilePic}
          className="h-10 w-auto rounded-full"
          alt="share"
        />
        <div>
          <p className="text-sm font-semibold truncate">Deanne Clarice Bea</p>
          <p className="text-xs font-light truncate">deannebea@company.com</p>
        </div>
        <ArrowIcon
          onClick={toggleArrow}
          className={`size-4 transition-transform ${arrowPressed ? "rotate-180" : ""}`}
        />
      </div>
    </div>
  );
}

export default Sidebar;
