import { useEffect, useState, useMemo, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import StatCard from "../components/StatCard";

import Search from "../assets/magnifyingGlass.svg?react";
import ArrowToggle from "../assets/arrowToggle.svg?react";
import RefreshIcon from "../assets/refresh.svg?react";

import { useWorkspaceStore } from "../store/workspaceStore";
import type { Workspace } from "../store/workspaceStore";
import CreateWorkspaceModal from "../components/CreateWorkspaceModal";

function Workspaces() {
  //UI states
  const [displayCount, setDisplayCount] = useState(5);
  const [inputValue, setInputValue] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const { workspaces, members, fetchWorkspaces, fetchMembers } =
    useWorkspaceStore();
  const workspaceCount = workspaces.length;

  const sentenceCase = (role: string) => {
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  const filteredWorkspaces = useMemo(() => {
    const query = inputValue.toLowerCase().trim();

    if (!query) return workspaces;

    const getScore = (workspace: Workspace) => {
      const name = workspace.name.toLowerCase();
      const status = workspace.status;

      if (name === query) return 0;
      if (name.startsWith(query)) return 1;
      if (name.includes(query)) return 2;
      if (status.includes(query)) return 3;
      if (String(workspace.staffCount).includes(query)) return 4;
      return 5;
    };

    return workspaces
      .filter((workspace) => getScore(workspace) < 5)
      .sort((a, b) => getScore(a) - getScore(b));
  }, [workspaces, inputValue]);

  const activeWorkspaceCount = useMemo(
    () => workspaces.filter((w) => w.status === "ACTIVE").length,
    [workspaces],
  );

  const totalStaffCount = useMemo(
    () => workspaces.reduce((total, w) => total + w.staffCount, 0),
    [workspaces],
  );

  const totalKnowledgeBases = workspaces.reduce(
    (sum, workspace) => sum + workspace.knowledgeCount,
    0,
  );

  const stats = [
    {
      name: "Workspaces",
      amount: workspaceCount,
    },
    {
      name: "Knowledge Bases",
      amount: totalKnowledgeBases,
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
      <div className="sticky top-0 z-10 bg-white">
        <Header />
      </div>
      <div className="flex flex-col h-screen sm:text-base">
        <div className="flex-1 overflow-y-auto pt-2 pb-10 px-4 py-10">
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
              <div className="px-4 py-2 border border-[#E0E0E0] rounded-md shadow-xs">
                <div>
                  <p className="font-semibold text-md">Workspaces</p>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center border border-[#e0e0e0] rounded-md px-2">
                    <Search className="size-4" />
                    <input
                      value={inputValue}
                      onChange={handleSearchChange}
                      className="w-full px-2 py-1 outline-none"
                      placeholder="Search staff..."
                    />
                  </div>
                  <button
                    onClick={() => setShowCreate(true)}
                    className="bg-black py-1 px-10 m-2 rounded-md hover:bg-[#454545] hover:cursor-pointer"
                  >
                    <p className="text-white">+ Create</p>
                  </button>
                </div>
                <div className="grid grid-cols-4 bg-black text-white py-2 px-4 font-semibold items-center rounded-t-md">
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
                    className="grid grid-cols-4 px-4 py-3 items-center border-t border-[#E0E0E0] hover:bg-gray-50"
                  >
                    <p className="pl-8">{workspace.name}</p>
                    <p className="justify-self-center">
                      <span className="px-3 py-1 rounded-full">
                        {sentenceCase(workspace.status)}
                      </span>
                    </p>
                    <p className="justify-self-center">
                      {workspace.staffCount}
                    </p>
                    <Link
                      to={`/Layout/workspace/${workspace.id}`}
                      className="justify-self-center hover:underline cursor-pointer font-bold"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
                {displayCount < filteredWorkspaces.length && (
                  <div className="flex justify-center ">
                    <button
                      onClick={() => setDisplayCount(displayCount + 2)}
                      className="flex items-center gap-2 px-4 py-2  hover:bg-gray-200 rounded-lg font-medium transition-colors"
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
        {showCreate && (
          <CreateWorkspaceModal onClose={() => setShowCreate(false)} />
        )}
      </div>
    </>
  );
}

export default Workspaces;
