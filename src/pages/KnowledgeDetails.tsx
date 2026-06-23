import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

//store
import { useKnowledgeStore } from "../store/KnowledgeStore";
import StatCard from "../components/StatCard";

//util
import { formatRelativeDate } from "../utils/utils";

//icons
import Search from "../assets/magnifyingGlass.svg?react";
import Icircle from "../assets/icircle.svg?react";
import ArrowCircle from "../assets/CircleArrow.svg?react";
import Check from "../assets/check.svg?react";
import Archive from "../assets/Archive.svg?react";
import Trash from "../assets/Trash.svg?react";
import Upload from "../assets/Upload.svg?react";
import Restore from "../assets/Restore.svg?react";
import UploadDocument from "../components/UploadDocument";

export type ProcessingStatus =
  | "Completed"
  | "Processing"
  | "Pending"
  | "Failed";
export type ApprovalStatus = "Approved" | "Pending" | "Decline";

function KnowledgeDetails() {
  const { id } = useParams();
  const {
    currentKnowledge,
    currentDocuments,
    fetchDocumentsByKnowledgeId,
    fetchKnowledgeById,
  } = useKnowledgeStore();

  //ui states

  const [showActions, setShowActions] = useState(false);
  const [doc, setDoc] = useState("");
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const actionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("Active");
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDocumentsByKnowledgeId(id);
      fetchKnowledgeById(id);
    }
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (actionRef.current && !actionRef.current.contains(e.target as Node)) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusStyles: Record<ProcessingStatus, string> = {
    Completed: "bg-green-100 text-green-600 w-full",
    Processing: "bg-yellow-100 text-yellow-600 w-full",
    Pending: "bg-[#4285F4]/20 text-[#4285F4] w-full",
    Failed: "bg-red-100 text-red-600 w-full",
  };
  const approvalStyles: Record<ApprovalStatus, string> = {
    Approved: "bg-second/78 text-third",
    Pending: "bg-yellow-100 text-yellow-600",
    Decline: "bg-red-100 text-red-600",
  };

  const handleActions = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (doc === id && showActions) {
      setShowActions(false);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const menuHeight = 180; // approximate height of the dropdown
      const spaceBelow = window.innerHeight - rect.bottom;

      const top =
        spaceBelow < menuHeight
          ? rect.top + window.scrollY - menuHeight - 4
          : rect.bottom + window.scrollY + 4;

      setMenuPos({
        top,
        left: rect.right + window.scrollX - 176,
      });
      setDoc(id);
      setShowActions(true);
    }
  };

  const handleViewDetails = () => {
    console.log("View Details:", doc);
  };
  //backend where for doc handling
  const handleReprocess = () => {
    console.log("Reprocess:", doc);
  };
  const handleApprove = () => {
    //backend here
    console.log("Approve:", doc);
  };
  const handleArchive = () => {
    //backend here
    console.log("Archive:", doc);
  };
  const handleDelete = () => {
    //backend hree
    console.log("Delete:", doc);
  };

  if (!currentKnowledge) {
    return null;
  }

  return (
    <>
      <div className="m-4 my-4">
        <div className="py-2 px-4 overflow-y-auto">
          <div className="text-md">
            <Link
              to={`/Layout/knowledges/`}
              className="hover:underline cursor-pointer"
            >
              Knowledge Management
            </Link>
            <span className="font-medium">
              {" > "} {currentKnowledge?.name}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
            <StatCard
              name="Knowledge Base"
              amount={currentKnowledge?.name}
              bgColor="bg-fourth"
              textColor="text-first"
              hoverBgColor="hover:bg-second/50"
              textHoverColor="hover:text-textColor"
              amountSize="lg"
            />
            <StatCard
              name="Workspace"
              amount={currentKnowledge?.workspace}
              bgColor="bg-third"
              textColor="text-first"
              hoverBgColor="hover:bg-second/50"
              textHoverColor="hover:text-textColor"
              amountSize="lg"
            />
            <StatCard
              name="Total Documents"
              amount={currentKnowledge?.documents.toString()}
              bgColor="bg-seventh"
              textColor="text-textColor"
              hoverBgColor="hover:bg-second/50"
              textHoverColor="hover:text-textColor"
              amountSize="2xl"
            />
            <StatCard
              name="Last Updated"
              amount={formatRelativeDate(currentKnowledge.lastUpdated)}
              bgColor="bg-seventh/40"
              textColor="text-textColor"
              hoverBgColor="hover:bg-second/50"
              textHoverColor="hover:text-textColor"
              amountSize="md"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 py-4">
            <div className="flex flex-col gap-1">
              <p>Processing Status</p>
              <select className="border border-[#e0e0e0] rounded-md p-2 shadow">
                <option>All</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <p>Approval Status</p>
              <select className="border border-[#e0e0e0] rounded-md p-2 shadow">
                <option>All</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Declined</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 col-span-2">
              <p>Date Range</p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
                <input
                  type="date"
                  className="border border-[#e0e0e0] rounded-md p-2 shadow text-sm w-full"
                />
                <p className="text-center">to</p>
                <input
                  type="date"
                  className="border border-[#e0e0e0] rounded-md p-2 shadow text-sm w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="invisible">_</p>
              <button className="text-sm bg-first rounded-md p-2 border border-[#e0e0e0] shadow">
                Clear Filters
              </button>
            </div>
            <div className="flex flex-col gap-1 col-span-2">
              <p className="invisible">_</p>
              <div className="flex items-center text-sm border border-[#e0e0e0] rounded-md p-2 shadow">
                <Search className="size-5" />
                <input
                  className="w-full min-w-0 px-2 outline-none"
                  placeholder="Search Documents"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex gap-2 bg-[#F7F7F7] w-fit p-1 rounded-md my-4 shadow">
              <button
                onClick={() => setActiveTab("Active")}
                className={`px-4 py-1.5 rounded-md text-sm transition-colors font-semibold  ${
                  activeTab === "Active"
                    ? "bg-first"
                    : "bg-[#F7F7F7] text-fourth"
                }`}
              >
                Active Documents
              </button>
              <button
                onClick={() => setActiveTab("Archived")}
                className={`px-4 py-1.5 rounded-md text-sm transition-colors font-semibold  ${
                  activeTab === "Archived"
                    ? "bg-first"
                    : "bg-[#F7F7F7] text-fourth"
                }`}
              >
                Archived Documents
              </button>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="flex gap-4 bg-fourth text-first py-2 px-4 text-sm h-fit rounded-xl items-center shadow"
            >
              <Upload className="size-3" /> Upload Documents
            </button>
          </div>
          {showUpload && (
            <UploadDocument onClose={() => setShowUpload(false)} />
          )}
          {activeTab === "Active" ? (
            <div className="overflow-x-auto w-full">
              <table className="w-full border-separate border-spacing-0 min-w-150">
                <thead>
                  <tr className="font-semibold text-fourth text-center text-sm">
                    <th className="p-2 px-4 text-left border-t border-l border-[#e0e0e0] rounded-tl-md">
                      Name
                    </th>
                    <th className="p-2 border-t border-[#e0e0e0]">Type</th>
                    <th className="p-2 border-t border-[#e0e0e0]">Size</th>
                    <th className="p-2 border-t border-[#e0e0e0]">Owner</th>
                    <th className="p-2 border-t border-[#e0e0e0]">Status</th>
                    <th className="p-2 px-4 border-t  border-[#e0e0e0] ">
                      Approval
                    </th>
                    <th className="p-2 px-4 border-t  border-[#e0e0e0]">
                      Date
                    </th>
                    <th className="p-2 px-4 border-t border-r border-[#e0e0e0] rounded-tr-md">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocuments.filter((dc) => dc.docStatus === "Active")
                    .length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="border border-[#e0e0e0] rounded-b-md"
                      >
                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                          <Upload className="size-10 text-gray-300" />
                          <p className="text-gray-500 font-medium">
                            No active documents yet
                          </p>
                          <p className="text-gray-400 text-sm">
                            Upload files to get started
                          </p>
                          <button
                            onClick={() => setShowUpload(true)}
                            className="flex gap-2 bg-fourth text-first py-2 px-4 text-sm rounded-xl items-center shadow mt-2"
                          >
                            <Upload className="size-4" /> Upload Documents
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentDocuments
                      .filter((dc) => dc.docStatus === "Active")
                      .map((dc, i, arr) => {
                        const isLast = i === arr.length - 1;
                        return (
                          <tr key={dc.id} className="text-center text-sm">
                            <td
                              className={`p-2 px-4 border-l border-t text-start border-[#e0e0e0] ${isLast ? "border-b rounded-bl-md" : ""}`}
                            >
                              {dc.name}
                            </td>
                            <td
                              className={`p-2 border-t text-center border-[#e0e0e0] ${isLast ? "border-b" : ""}`}
                            >
                              {dc.type}
                            </td>
                            <td
                              className={`p-2 border-t text-center border-[#e0e0e0] ${isLast ? "border-b" : ""}`}
                            >
                              {dc.size ?? "—"}
                            </td>
                            <td
                              className={`p-2 border-t text-center border-[#e0e0e0] ${isLast ? "border-b" : ""}`}
                            >
                              {dc.owner ?? "—"}
                            </td>
                            <td
                              className={`p-2 border-t border-[#e0e0e0] ${isLast ? "border-b" : ""} `}
                            >
                              <span
                                className={`w-24 inline-block text-center px-2 py-1 text-sm rounded-full ${statusStyles[dc.status]}`}
                              >
                                {dc.status}
                              </span>
                            </td>
                            <td
                              className={`p-2 border-t border-[#e0e0e0] ${isLast ? "border-b" : ""}`}
                            >
                              <span
                                className={`w-24 inline-block text-center px-2 py-1 text-sm rounded-full ${approvalStyles[dc.approval]}`}
                              >
                                {dc.approval}
                              </span>
                            </td>
                            <td
                              className={`p-2 border-t border-[#e0e0e0] ${isLast ? "border-b" : ""}`}
                            >
                              {formatRelativeDate(dc.date) ?? "—"}
                            </td>
                            <td
                              className={`border-t border-r border-[#e0e0e0] ${isLast ? "border-b rounded-br-md" : ""}`}
                            >
                              <div className="relative flex justify-center">
                                <button
                                  onClick={(e) => handleActions(dc?.id, e)}
                                  className="font-black rounded-full hover:bg-second/50 size-6"
                                >
                                  ⋮
                                </button>
                                {showActions && (
                                  <div
                                    ref={actionRef}
                                    style={{
                                      top: menuPos.top,
                                      left: menuPos.left,
                                    }}
                                    className="fixed z-50 w-44 bg-white border border-[#e0e0e0] rounded-xl shadow-lg py-2"
                                  >
                                    <Link
                                      to={`/Layout/knowledges/${id}/${dc.id}`}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                      <Icircle className="size-4" />
                                      View Details
                                    </Link>
                                    <button
                                      onClick={handleReprocess}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                      <ArrowCircle className="size-4" />
                                      Reprocess
                                    </button>
                                    <button
                                      onClick={handleApprove}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-green-500 hover:bg-gray-50"
                                    >
                                      <Check className="size-4" />
                                      Approve
                                    </button>
                                    <button
                                      onClick={handleArchive}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-purple-500 hover:bg-gray-50"
                                    >
                                      <Archive className="size-4" /> Archive
                                    </button>
                                    <button
                                      onClick={handleDelete}
                                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                                    >
                                      <Trash className="size-4" />
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full border-separate border-spacing-0 min-w-150">
                <thead>
                  <tr className="font-semibold text-fourth text-center text-sm">
                    <th className="p-2 px-4 text-left border-t border-l border-[#e0e0e0] rounded-tl-md">
                      Name
                    </th>
                    <th className="p-2 border-t border-[#e0e0e0]">Type</th>
                    <th className="p-2 border-t border-[#e0e0e0]">Size</th>
                    <th className="p-2 border-t border-[#e0e0e0]">
                      Archived by
                    </th>
                    <th className="p-2 border-t border-[#e0e0e0]">
                      Archived Date
                    </th>
                    <th className="p-2 px-4 border-t border-r border-[#e0e0e0] rounded-tr-md">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocuments.filter((dc) => dc.docStatus === "Archived")
                    .length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="border border-[#e0e0e0] rounded-b-md"
                      >
                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                          <Archive className="size-10 text-gray-300" />
                          <p className="text-gray-500 font-medium">
                            No archived documents
                          </p>
                          <p className="text-gray-400 text-sm">
                            Archived documents will appear here
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentDocuments
                      .filter((dc) => dc.docStatus === "Archived")
                      .map((dc, i, arr) => {
                        const isLast = i === arr.length - 1;
                        return (
                          <tr key={dc.id} className="text-center text-sm">
                            <td
                              className={`p-2 px-4 border-l border-t text-start border-[#e0e0e0] ${isLast ? "border-b rounded-bl-md" : ""}`}
                            >
                              {dc.name}
                            </td>
                            <td
                              className={`p-2 border-t text-center border-[#e0e0e0] ${isLast ? "border-b" : ""}`}
                            >
                              {dc.type}
                            </td>
                            <td
                              className={`p-2 border-t text-center border-[#e0e0e0] ${isLast ? "border-b" : ""}`}
                            >
                              {dc.size ?? "—"}
                            </td>
                            <td
                              className={`p-2 border-t text-center border-[#e0e0e0] ${isLast ? "border-b" : ""}`}
                            >
                              {dc.archivedBy}
                            </td>
                            <td
                              className={`p-2 border-t border-[#e0e0e0] ${isLast ? "border-b" : ""} `}
                            >
                              {dc.archivedDate
                                ? formatRelativeDate(dc.archivedDate)
                                : "-"}
                            </td>

                            <td
                              className={`border-t border-r border-[#e0e0e0] py-2 ${isLast ? "border-b rounded-br-md" : ""}`}
                            >
                              <div className="flex gap-6 justify-center">
                                <button
                                  onClick={(e) => handleActions(dc?.id, e)}
                                  className="bg-[#D2AFFF]/20 rounded-md px-4 py-1 items-center hover:bg-second/50 text-[#8A38F5] font-semibold flex gap-2 h-fit"
                                >
                                  <Restore className="size-4" />
                                  Restore
                                </button>
                                <button
                                  onClick={(e) => handleActions(dc?.id, e)}
                                  className="bg-[#FF7165]/20 rounded-md px-4 py-1 items-center hover:bg-second/50 text-[#D20C0C] font-semibold flex gap-2 h-fit"
                                >
                                  <Trash className="size-4" />
                                  Purge
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default KnowledgeDetails;
