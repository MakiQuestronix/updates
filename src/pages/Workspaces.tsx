import { useEffect, useState, type ChangeEvent } from "react";

import Header from "../components/Header";
import StatCard from "../components/StatCard";

import Search from "../assets/magnifyingGlass.svg?react";
import ArrowToggle from "../assets/arrowToggle.svg?react";
import RefreshIcon from "../assets/refresh.svg?react";

import { useWorkspaceStore } from "../store/workspaceStore";

function Workspaces() {
  const { workspaces, members, fetchWorkspaces, fetchMembers } =
    useWorkspaceStore();
  const [displayCount, setDisplayCount] = useState(3);
  const [inputValue, setInputValue] = useState("");

  const workspaceCount = workspaces.length;
  const filteredWorkspaces = workspaces
    .filter((workspace) => {
      const query = inputValue.toLowerCase().trim();
      if (!query) return true;

      return (
        workspace.name.toLowerCase().includes(query) ||
        workspace.status.toLowerCase().includes(query) ||
        String(workspace.staffCount).includes(query)
      );
    })
    .sort((a, b) => {
      const query = inputValue.toLowerCase().trim();
      if (!query) return 0;
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });

  const activeWorkspaceCount = workspaces.filter(
    (workspace) => workspace.status === "ACTIVE",
  ).length;

  const totalStaffCount = workspaces.reduce(
    (total, workspace) => total + workspace.staffCount,
    0,
  );

  const stats = [
    {
      name: "Workspaces",
      amount: workspaceCount,
    },
    {
      name: "Knowledge Bases",
      amount: 23, //change later if may backend na
    },
    {
      name: "Staff",
      amount: totalStaffCount,
    },
    {
      name: "Active Workspaces",
      amount: activeWorkspaceCount,
    },
  ];

  const handleActiveToggle = () => {
    //move items to show active/inactive first
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setDisplayCount(3);
  };

  useEffect(() => {
    fetchWorkspaces();
    fetchMembers(1);
  }, [fetchWorkspaces, fetchMembers]);

  return (
    <>
      <div className="flex flex-col h-screen text-sm sm:text-base">
        <Header />
        <div className="flex-1 overflow-y-auto pt-5 pb-10 px-4 py-10">
          <div className="px-4 py-2">
            <h1 className=" text-xl sm:text-2xl font-semibold">
              Workspace Management
            </h1>
            <div className="px-4 py-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-2">
                {stats.map((stat) => (
                  <StatCard
                    key={stat.name}
                    name={stat.name}
                    amount={stat.amount}
                    highlight={stat.name === "Active Workspaces"}
                  />
                ))}
              </div>
              <div className="px-4 py-2 border border-[#E0E0E0] rounded-md">
                <div>
                  <p className="font-semibold text-md">Workspaces</p>
                </div>
                <div className="flex justify-between gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                    <input
                      value={inputValue}
                      onChange={handleSearchChange}
                      className="border border-[#e0e0e0] rounded-md py-1 pl-10 pr-3 my-2"
                      placeholder="Search..."
                    />
                  </div>
                  <button className="bg-black p-2 px-10 m-2 rounded-md">
                    <p className="text-white text-sm">+ Create</p>
                  </button>
                </div>
                <div className="grid grid-cols-4 bg-black text-white py-2 px-4 font-semibold items-center rounded-t-md text-sm">
                  <p className="justify-self-center">Workspace</p>
                  <div className="flex items-center gap-2 justify-self-center">
                    <p>Status</p>
                    <ArrowToggle className="w-4 h-4 text-white" />
                  </div>
                  <p className="justify-self-center">Staff</p>
                  <p className="justify-self-center">Action</p>
                </div>
                {filteredWorkspaces.slice(0, displayCount).map((workspace) => (
                  <div
                    key={workspace.id}
                    className="grid grid-cols-4 px-4 py-3 items-center border-t border-[#E0E0E0] text-sm hover:bg-gray-50"
                  >
                    <p className="justify-self-center font-medium">
                      {workspace.name}
                    </p>
                    <p className="justify-self-center">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold">
                        {workspace.status}
                      </span>
                    </p>
                    <p className="justify-self-center">
                      {workspace.staffCount}
                    </p>
                    <a
                      href={`/workspace/${workspace.id}`}
                      className="justify-self-center hover:underline cursor-pointer font-bold"
                    >
                      View Details
                    </a>
                  </div>
                ))}
                {displayCount < filteredWorkspaces.length && (
                  <div className="flex justify-center ">
                    <button
                      onClick={() => setDisplayCount(displayCount + 2)}
                      className="flex items-center gap-2 px-4 py-2  hover:bg-gray-200 rounded-lg font-medium text-sm transition-colors"
                    >
                      <RefreshIcon className="w-4 h-4 text-black" />
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Workspaces;
