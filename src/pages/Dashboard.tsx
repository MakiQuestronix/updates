import Header from "../components/Header";
import StatCard from "../components/StatCard";
import { useEffect, useState, useCallback } from "react";
import { useDashboardStore } from "../store/DashboardStore";

import RefreshIcon from "../assets/refresh.svg?react";
import FolderIcon from "../assets/folder.svg?react";
import HamburgerButton from "../components/HamburgerButton";
import { Link } from "react-router";

import { formatRelativeDate } from "../utils/utils";

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

function Dashboard() {
  const {
    stats,
    workspaces,
    recentKnowledge,
    activityLogs,
    processingStatus,
    isLoading,
    fetchDashboardData,
  } = useDashboardStore();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedTime, setUpdatedTime] = useState(getCurrentTime());

  const refreshAll = useCallback(async () => {
    await fetchDashboardData();
    setUpdatedTime(getCurrentTime());
  }, [fetchDashboardData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);

    const start = Date.now();

    await refreshAll();

    //remove this for backend
    const elapsed = Date.now() - start;
    const minDuration = 1000;

    if (elapsed < minDuration) {
      await new Promise((resolve) =>
        setTimeout(resolve, minDuration - elapsed),
      );
    }

    setIsRefreshing(false);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    refreshAll();
    const interval = setInterval(refreshAll, 30000);
    return () => clearInterval(interval);
  }, [refreshAll]);

  return (
    <>
      <div className="px-2 sm:px-10 py-2">
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <div className="flex flex-row gap-3 justify-between">
            <h1 className="text-2xl font-semibold text-sixth">Dashboard</h1>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="group flex items-center justify-center px-3 py-2 my-2 gap-3 h-fit w-auto sm:w-40 bg-fourth rounded-lg  hover:bg-third transition-colors"
            >
              <RefreshIcon
                className={`size-4 text-first group-hover:text-black ${isRefreshing ? "animate-spin" : ""}`}
              />
              <p className="text-first text-sm group-hover:text-black">
                Refresh Now
              </p>
            </button>
          </div>

          {/* Stats */}
          <div className="my-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  name={stat.name}
                  amount={stat.amount.toString()}
                  highlight={stat.name === "Active Workspaces"}
                  hoverBgColor="hover:bg-fourth"
                  textHoverColor="hover:text-white"
                  amountSize="3xl"
                />
              ))}
            </div>
          </div>

          <div className="px-4 py-2 rounded-lg shadow-xs border border-[#e0e0e0]/50 my-2">
            <div className="flex items-center justify-between px-4 pt-2">
              <h6 className="text-sm font-semibold">Active Workspaces</h6>
              <Link
                to="/Layout/workspace/"
                className="text-sm font-semibold hover:underline"
              >
                View All <span className="text-lg">→</span>
              </Link>
            </div>
            <hr className="border-b-0.5 border-[#e0e0e0]/50 my-2 mx-2" />
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <tbody>
                  {workspaces.map((workspace) => (
                    <tr
                      key={workspace.id}
                      className="border-b border-[#e0e0e0]/30 last:border-b-0 hover:bg-second/20"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <FolderIcon className="w-5 h-5 text-seventh shrink-0" />
                          <p className="font-semibold truncate">
                            {workspace.name}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {workspace.knowledgeCount} Entries
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          className="font-semibold hover:text-third"
                          to={`/Layout/workspace/${workspace.id}`}
                        >
                          Open →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="py-2 flex flex-col gap-4 sm:flex-row items-stretch my-2">
            <div className="rounded-lg shadow-sm p-2 sm:p-3 border border-[#e0e0e0]/50 w-full sm:w-1/3">
              <p className="text-sm font-semibold">Recent Knowledge Entries</p>
              <hr className="border-b-0.5 border-[#e0e0e0]/50 my-2" />
              <div className="space-y-3">
                {recentKnowledge.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 py-1 px-2 sm:px-3 hover:bg-second rounded-md justify-between"
                  >
                    <p className="text-sm font-semibold">{item.name}</p>
                    <span
                      className={`inline-block w-4 h-4 rounded-full shadow-[inset_0_4px_4px_rgba(255,255,255,0.8)] ${
                        item.status === "Active"
                          ? "bg-status-active border border-status-active"
                          : item.status === "Inactive"
                            ? "bg-status-inactive/60 border border-status-inactive/30"
                            : "bg-status-pending border border-status-pending"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg shadow-sm p-2 sm:p-3 border border-[#e0e0e0]/50 w-full flex-1">
              <p className="text-sm font-semibold">Processing Status Summary</p>
              <hr className="border-b-0.5 border-[#e0e0e0]/50 my-2" />
              <div className="space-y-4">
                {[
                  { label: "Processing", value: processingStatus.processing },
                  { label: "Completed", value: processingStatus.completed },
                  { label: "Failed", value: processingStatus.failed },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="grid grid-cols-8 items-center gap-2 pl-2 sm:pl-4"
                  >
                    <p className="text-sm font-semibold col-span-2 sm:col-span-1">
                      {label}
                    </p>

                    <div className="col-span-5 sm:col-span-6 h-2 bg-first rounded-full overflow-hidden border border-[#e0e0e0]/34 shadow-xs">
                      <div
                        className="h-full bg-[#B148D2] rounded-full transition-all duration-500"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <p className="text-sm font-medium pl-4">{value}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 py-2 rounded-lg shadow-xs border border-[#e0e0e0]/50">
            <p className="text-sm font-semibold">System Activity Log</p>
            <hr className="border-b-0.5 border-[#e0e0e0]/50 my-2" />

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-125">
                <thead>
                  <tr className="text-left border-b border-[#e0e0e0]/50">
                    <th className="py-2 font-semibold w-2/5">Name</th>
                    <th className="py-2 px-4 font-semibold w-16">Size</th>
                    <th className="py-2 font-semibold text-center w-24">
                      Status
                    </th>
                    <th className="py-2 font-semibold text-center w-24">
                      Owner
                    </th>
                    <th className="py-2 px-4 font-semibold text-right w-28">
                      Last Modified
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activityLogs.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#e0e0e0]/30 last:border-b-0"
                    >
                      <td className="py-3 font-semibold">{item.name}</td>

                      <td className="py-3  px-4">{item.size.toFixed(2)} MB</td>

                      <td className="py-3 text-center">
                        <span
                          className={`inline-block py-1 px-3 rounded-full text-xs text-center font-semibold whitespace-nowrap ${
                            item.status === "Complete"
                              ? "bg-status-active/20 text-status-active"
                              : item.status === "Pending"
                                ? "bg-[#4285F4]/20 text-[#4285F4]"
                                : item.status === "Processing"
                                  ? "bg-status-pending/20 text-status-pending"
                                  : "bg-status-inactive/20 text-status-inactive"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-3 text-center">{item.owner}</td>

                      <td className="py-3 text-right  px-4">
                        {formatRelativeDate(item.lastModified)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="py-4">
            <p className="text-sm">Last Updated: {updatedTime}</p>
            <p className="text-xs">Auto refreshes every 30 seconds</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
