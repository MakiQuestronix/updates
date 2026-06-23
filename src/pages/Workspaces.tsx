import { useEffect, useState, useMemo, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import StatCard from "../components/StatCard";

import Search from "../assets/magnifyingGlass.svg?react";
import ArrowToggle from "../assets/arrowToggle.svg?react";
import RefreshIcon from "../assets/refresh.svg?react";
import Icircle from "../assets/icircle.svg?react";

import { useWorkspaceStore } from "../store/workspaceStore";
import type { Workspace } from "../store/workspaceStore";
import CreateWorkspaceModal from "../components/CreateWorkspaceModal";

function Workspaces() {
  //UI states
  const [displayCount, setDisplayCount] = useState(4);
  const [inputValue, setInputValue] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const { workspaces, fetchWorkspaces, fetchMembers } = useWorkspaceStore();
  const workspaceCount = workspaces.length;

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
      <div className="flex px-4 py-2">
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="mb-4">
            <h1 className=" text-2xl font-semibold">Workspace Management</h1>
          </div>
          <div className="my-1 grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            {stats.map((stat) => (
              <StatCard
                key={stat.name}
                name={stat.name}
                amount={stat.amount.toString()}
                highlight={stat.name === "Active Workspaces"}
                hoverBgColor="hover:bg-fourth"
                textHoverColor="hover:text-white"
                amountSize="3xl"
              />
            ))}
          </div>
          <div className="px-4 py-2 border border-[#e0e0e0] rounded-md shadow-xs my-4">
            <div>
              <p className=" font-semibold text-md">Workspaces</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 justify-between mb-2">
              <div className="flex items-center border border-[#e0e0e0] rounded-md px-2 flex-1">
                <Search className="size-4 shrink-0" />
                <input
                  value={inputValue}
                  onChange={handleSearchChange}
                  className="w-full px-2 py-1 outline-none"
                  placeholder="Search workspaces..."
                />
              </div>
              <button
                onClick={() => setShowCreate(true)}
                className="bg-fourth py-1 px-6 rounded-md hover:bg-third hover:cursor-pointer"
              >
                <p className="text-sm text-first">+ Create</p>
              </button>
            </div>

            <div className="overflow-x-auto rounded-t-md overflow-hidden">
              <table className="w-full table-fixed text-sm min-w-100">
                <thead>
                  <tr className="bg-fourth text-first font-semibold rounded-t-md">
                    <th className="py-2 px-4 text-left w-2/5">Workspace</th>
                    <th className="py-2 px-4 text-center">
                      <button
                        onClick={handleActiveToggle}
                        className="flex items-center gap-2 mx-auto"
                      >
                        <span>Status</span>
                        <ArrowToggle className="w-4 h-4 text-first" />
                      </button>
                    </th>
                    <th className="py-2 px-4 text-center">Staff</th>
                    <th className="py-2 px-4 pr-10 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkspaces
                    .slice(0, displayCount)
                    .map((workspace) => (
                      <tr
                        key={workspace.id}
                        className="border-t border-[#e0e0e0] hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{workspace.name}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-3 py-1 rounded-full">
                            {workspace.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {workspace.staffCount}
                        </td>
                        <td className="py-3 px-4">
                          <Link
                            to={`/Layout/workspace/${workspace.id}`}
                            className="flex justify-end gap-2 hover:underline font-semibold"
                          >
                            <Icircle className="size-4" />
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {displayCount < filteredWorkspaces.length && (
              <div className="flex justify-center">
                <button
                  onClick={() => setDisplayCount(displayCount + 2)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  <RefreshIcon className="w-4 h-4 text-fourth" />
                  Load More
                </button>
              </div>
            )}
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
