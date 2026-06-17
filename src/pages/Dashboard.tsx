import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import { useDashboardStore } from "../store/DashboardStore";
import { useWorkspaceStore } from "../store/workspaceStore";
import { useKnowledgeStore } from "../store/KnowledgeStore";
import { useActivityLogStore } from "../store/ActivityLogStore";

import RefreshIcon from "../assets/refresh.svg?react";
import FolderIcon from "../assets/folder.svg?react";
import { Link } from "react-router";

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

function Dashboard() {
  const { mainStats, fetchDashboardData } = useDashboardStore();
  const { workspaces, fetchWorkspaces } = useWorkspaceStore();
  const { knowledge, fetchKnowledge } = useKnowledgeStore();
  const { activityLogs, fetchActivityLog } = useActivityLogStore();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedTime, setUpdatedTime] = useState(getCurrentTime());

  const handleRefresh = async () => {
    setIsRefreshing(true);

    setUpdatedTime(getCurrentTime());

    await Promise.all([
      fetchDashboardData(),
      fetchWorkspaces(),
      fetchKnowledge(),
    ]);
    setIsRefreshing(false);
  };

  const handleOpen = () => {
    //open workspace here
  };

  //maga fetch every 30 secs
  useEffect(() => {
    const fetchAll = () => {
      fetchDashboardData();
      fetchWorkspaces();
      fetchKnowledge();
      fetchActivityLog();
      setUpdatedTime(getCurrentTime());
    };

    fetchAll();

    const interval = setInterval(() => {
      fetchAll();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchDashboardData, fetchWorkspaces, fetchKnowledge, fetchActivityLog]);

  return (
    <div className="flex flex-col h-screen text-sm sm:text-sm">
      <Header />

      <div className="flex-1 overflow-y-auto pt-2 pb-10 px-4">
        <div className="flex flex-col gap-3 md:flex-row items-start md:items-center justify-between px-4 py-2">
          <h1 className=" text-xl sm:text-2xl font-semibold">Dashboard</h1>
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center px-3 sm:px-4 py-2 gap-3 h-9 w-full sm:w-40 bg-black rounded-lg mr-0 sm:mr-4 hover:bg-gray-800 transition-colors"
          >
            <RefreshIcon
              className="size-4 text-white"
              style={{
                transform: isRefreshing ? "rotate(360deg)" : "rotate(0deg)",
                transition: "transform 0.4s linear",
              }}
            />
            <p className=" text-white text-sm">Refresh Now</p>
          </button>
        </div>

        <div className="px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {mainStats.map((stat, index) => (
              <StatCard
                key={index}
                name={stat.name}
                amount={stat.amount}
                highlight={stat.name === "Active Workspaces"}
              />
            ))}
          </div>
        </div>

        <div className="px-4 py-2 rounded-lg shadow-xs border border-[#E0E0E0] m-4">
          <div className="flex sm:flex-row items-start sm:items-center justify-between gap-3">
            <h6 className=" text-sm font-semibold">Active Workspaces</h6>
            <Link
              to={`/Layout/workspace/`}
              className="text-sm font-semibold hover:underline"
            >
              <p>
                View All <span className="text-lg">→</span>
              </p>
            </Link>
          </div>
          <hr className="border-b border-[#E0E0E0] my-2" />

          <div className="space-y-3">
            {workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="grid grid-cols-3 items-center py-2 px-2 sm:px-3 hover:bg-gray-50 rounded-md cursor-pointer"
              >
                <div className="flex justify-self-start items-center gap-2 text-sm sm:text-sm">
                  <FolderIcon className="w-5 h-5 text-black" />
                  <p className="font-inter text-sm">{workspace.name}</p>
                </div>

                <p className=" text-sm sm:text-sm justify-self-center">
                  {workspace.knowledgeCount} Entries
                </p>

                <Link
                  className="text-sm justify-self-end font-semibold hover:text-gray-600"
                  to={`/Layout/workspace/${workspace.id}`}
                >
                  <p>Open →</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-2 flex flex-col gap-4 sm:flex-row items-stretch">
          <div className="rounded-lg shadow-sm p-2 sm:p-3 border border-[#E0E0E0] w-full sm:w-1/3">
            <p className="text-sm sm:text-base font-semibold">
              Recent Knowledge Entries
            </p>
            <hr className="border-b border-[#E0E0E0] my-2" />
            <div className="space-y-3">
              {knowledge.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-1 items-center gap-2 py-1 px-2 sm:px-3 hover:bg-gray-50 rounded-md justify-between"
                >
                  <p className="text-sm sm:text-sm">{item.name}</p>

                  <span
                    className={`inline-block w-4 h-4 rounded-full shadow-[inset_0_4px_4px_rgba(255,255,255,0.8)] ${
                      item.status === 0
                        ? "bg-green-500 border border-green-500"
                        : item.status === 1
                          ? "bg-red-500 border border-red-500"
                          : "bg-[#F1D104] border border-[#F1D104] "
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg shadow-sm p-2 sm:p-3 border border-[#E0E0E0] w-full flex-1">
            <p className="text-sm sm:text-sm font-semibold">
              Processing Status Summary
            </p>

            <hr className="border-b border-[#E0E0E0] my-2" />

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm">Processing</p>
                  <p className="text-sm font-medium">80%</p>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-500"
                    style={{ width: "80%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm">Completed</p>
                  <p className="text-sm font-medium">100%</p>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-500"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              {/* Failed */}
              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-sm">Failed</p>
                  <p className="text-sm font-medium">20%</p>
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-500"
                    style={{ width: "20%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 rounded-lg shadow-xs border border-[#E0E0E0] m-4">
          <p className="text-sm sm:text-sm font-semibold">
            System Activity Log
          </p>
          <hr className="border-b border-[#E0E0E0] my-2" />
          <div className="grid grid-cols-5  items-center text-sm font-semibold pb-2">
            <p>Name</p>
            <p>Size</p>
            <p>Status</p>
            <p>Owner</p>
            <p>Last Modified</p>
          </div>
          <div>
            {activityLogs.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 py-2  items-center text-sm "
              >
                <p>{item.name}</p>
                <p>{item.size.toFixed(2)} MB</p>
                <p>
                  {item.status === 0
                    ? "Completed"
                    : item.status === 1
                      ? "Failed"
                      : "Processing"}
                </p>
                <p>{item.owner}</p>
                <p>{item.lastModified}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-2">
          <p className="text-sm">Last Updated: {updatedTime}</p>
          <p className="text-xs">Auto refereshes every 30 seconds</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
