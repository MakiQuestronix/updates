import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWorkspaceStore } from "../store/workspaceStore";

type Tab = "profile" | "activity" | "permissions";

function WorkspaceStaff() {
  const { id, staffId } = useParams();
  const {
    fetchStaffActivity,
    currentWorkspace,
    members,
    fetchWorkspaceById,
    fetchMembers,
    currentStaffActivity,
  } = useWorkspaceStore();

  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const tabs: { label: string; value: Tab }[] = [
    { label: "Profile", value: "profile" },
    { label: "Workspace Activity", value: "activity" },
    { label: "Permissions", value: "permissions" },
  ];

  useEffect(() => {
    if (!id) return;
    const numericId = Number(id);
    const numericStaffId = Number(staffId);
    fetchWorkspaceById(numericId);
    fetchMembers(numericId);
    fetchStaffActivity(numericStaffId);
  }, [id]);

  const sentenceCase = (role: string) => {
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const member = members.find((m) => m.id === Number(staffId));

  if (!member) return <p className="p-4 text-sm">Staff member not found.</p>;

  return (
    <div className="my-4">
      <div className="flex px-4 py-2">
        <div className="flex-1 overflow-y-auto">
          <div className="py-2 px-4">
            <div className="text-sm">
              <Link
                to="/Layout/workspace"
                className="hover:underline cursor-pointer"
              >
                Workspaces
              </Link>
              {" > "}
              <Link
                to={`/Layout/workspace/${id}`}
                className="hover:underline cursor-pointer"
              >
                {currentWorkspace?.name}
              </Link>
              {" > "}

              <Link
                to={`/Layout/workspace/${id}`}
                className="hover:underline cursor-pointer"
              >
                Staff
              </Link>
              {" > "}

              <span className="font-bold">{member.name}</span>
            </div>
            <div className="flex flex-row gap-4 mt-6 border border-[#e0e0e0] rounded-md p-2 px-2 items-start">
              <div className="pt-4 pl-10 flex gap-4">
                <img src={member.photo} className="size-20 rounded-full" />
                <div>
                  <h2 className="text-lg font-bold">{member.name}</h2>
                  <p>
                    <span className="text-sm"></span>{" "}
                    {sentenceCase(member.role)}
                  </p>
                  <p>
                    <span className="text-sm underline"> {member.email}</span>
                  </p>
                </div>
              </div>

              <div className="border border-[#e0e0e0] h-30 mx-10" />

              <div className="grid grid-cols-3 gap-12 py-4 flex-1">
                <div className="flex flex-col gap-2">
                  <p className="text-md font-semibold">Status</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-4 rounded-full shadow-[inset_0_4px_4px_rgba(255,255,255,1)] ${
                        member.status === "Active"
                          ? "bg-status-active border border-status-active"
                          : "bg-status-inactive border border-status-inactive"
                      }`}
                    />
                    <p className="text-sm">{sentenceCase(member.status)}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-md font-semibold">Joined At</p>
                  <p className="text-sm">{formatDate(member.joinedAt)}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-md font-semibold">Last Active</p>
                  <p className="text-sm">{member.lastActive}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 px-4">
            <div className="flex gap-2 bg-[#F7F7F7] w-fit p-1 rounded-md">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-1.5 rounded-md text-sm transition-colors font-semibold  ${
                    activeTab === tab.value
                      ? "bg-first"
                      : "bg-[#F7F7F7] text-fourth"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 py-2 ">
            <div className="p-4 border border-[#e0e0e0] rounded-md">
              <div>
                {activeTab === "profile" && (
                  <div>
                    <p className="font-semibold text-sm">Profile Information</p>
                    <hr className="border-0.5 border-[#e0e0e0] my-2" />
                    <div className="grid grid-cols-5 font-semibold text-sm mt-4">
                      <p>Full Name</p>
                      <p>Email</p>
                      <p>Role</p>
                      <p>Workspace</p>
                      <p>Join Date</p>
                    </div>

                    <div className="grid grid-cols-5 text-sm mt-4">
                      <p>{member.name}</p>
                      <p>{member.email}</p>
                      <p>{sentenceCase(member.role)}</p>
                      <p>{currentWorkspace?.name}</p>
                      <p>{formatDate(member.joinedAt)}</p>
                    </div>
                  </div>
                )}
                {activeTab === "activity" && (
                  <div>
                    <div className="flex flex-row justify-between gap-4">
                      <div className="flex flex-col gap-6 w-2/5">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-first border border-[#e0e0e0] rounded-xl p-5">
                            <p className="font-semibold text-sm text-fourth">
                              Documents Uploaded
                            </p>
                            <p className="font-bold text-4xl mt-2">
                              {currentStaffActivity?.stats.documentsUploaded}
                            </p>
                          </div>

                          <div className="bg-[#f0f0f0] rounded-xl p-5">
                            <p className="font-semibold text-sm text-gray-600">
                              Knowledge Bases
                            </p>
                            <p className="font-bold text-4xl mt-2">
                              {currentStaffActivity?.stats.knowledgeBases}
                            </p>
                          </div>

                          <div className="bg-[#E79AFF]/60 rounded-xl p-5">
                            <p className="font-semibold text-sm text-fourth">
                              Reviews Completed
                            </p>
                            <p className="font-bold text-4xl mt-2 text-fourth">
                              {currentStaffActivity?.stats.reviewsCompleted}
                            </p>
                          </div>

                          <div className="bg-fourth rounded-xl p-5">
                            <p className="font-semibold text-sm text-first">
                              Approvals Given
                            </p>
                            <p className="font-bold text-4xl mt-2 text-first">
                              {currentStaffActivity?.stats.approvalsGiven}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border border-[#e0e0e0] rounded-md w-3/5">
                        <p className="font-semibold">Recent Activity</p>
                        <hr className="border-0.5 border-[#e0e0e0] my-2" />
                        <ul className="list-disc pl-5 space-y-1 max-h-50 overflow-y-auto">
                          {currentStaffActivity?.recentActivity.map(
                            (activity, index) => (
                              <li key={index} className="mt-2">
                                {activity.description}
                                <span className="text-gray-400 ml-4">
                                  ({activity.timestamp})
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 p-4 border border-[#e0e0e0] rounded-md">
                      <p className="font-semibold">Activity Timeline</p>
                      <hr className="border-0.5 border-[#e0e0e0] my-2" />

                      {currentStaffActivity?.timeline.map((section, index) => (
                        <div key={index}>
                          <p className="font-bold">{section.label}</p>
                          <ul className="list-disc pl-5 space-y-1 mt-1 mb-8">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "permissions" && (
                  <div>
                    <div className="mt-4 p-4 border border-[#e0e0e0] rounded-md w-1/3   ">
                      <p className="font-semibold">Permissions</p>
                      <hr className="border-0.5 border-[#e0e0e0] my-2" />

                      {[
                        {
                          label: "Workspace Access",
                          value: member.permissions.workspaceAccess,
                        },
                        {
                          label: "Upload Documents",
                          value: member.permissions.uploadDocuments,
                        },
                        {
                          label: "Create Knowledge Bases",
                          value: member.permissions.createKnowledgeBases,
                        },
                        {
                          label: "Approve Documents",
                          value: member.permissions.approveDocuments,
                        },
                        {
                          label: "Archive Documents",
                          value: member.permissions.archiveDocuments,
                        },
                        {
                          label: "Manage Members",
                          value: member.permissions.manageMembers,
                        },
                      ].map((permission) => (
                        <div
                          key={permission.label}
                          className="flex items-center justify-between gap-8 py-2 w-full"
                        >
                          <p>{permission.label}</p>
                          <input
                            type="checkbox"
                            checked={permission.value}
                            readOnly
                            className="accent-fourth size-4"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-6 justify-center items-center my-4">
            <button className="w-45 px-4 py-2 border border-[#e0e0e0] shadow rounded-md text-sm hover:bg-second hover:cursor-pointer">
              Edit Role
            </button>
            <button className="w-45 px-4 py-2 border border-[#e0e0e0] shadow rounded-md text-sm hover:bg-status-inactive hover:cursor-pointer">
              Remove Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceStaff;
