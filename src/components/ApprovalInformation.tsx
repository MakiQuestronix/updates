import StatusBadge from "./StatusBadge";
import { Icon } from "@iconify/react";

interface ApprovalHistoryItem {
  id: string;
  action: string;
  actorName: string;
  actorRole: string;
  timestamp: string;
  isApproved: boolean;
}

interface ApprovalInfo {
  status: string;
  approvedBy?: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  approvedOn?: string;
  comments?: string;
  history: ApprovalHistoryItem[];
}

interface ApprovalInformationProps {
  approval: string;
  approvalInfo: ApprovalInfo;
}
export default function ApprovalInformation({
  approval,
  approvalInfo,
}: ApprovalInformationProps) {
  return (
    <div className="flex flex-col gap-4 my-2">
      <div className="flex flex-col border border-borders/34 shadow rounded-md px-4 py-2 mb-3">
        <p className="font-semibold text-lg text-fourth my-2">
          Approval Information
        </p>

        <div className="px-4 grid grid-cols-4">
          <div className="flex flex-col gap-2">
            <p className="text-[#454545]/75 text-sm">Status</p>
            <p>
              <StatusBadge
                type="approval"
                value={approval}
                styling="text-xs p-1 w-fit"
              />
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#454545]/75 text-sm">Approved by</p>
            <div className="flex items-center gap-4">
              <img
                src={approvalInfo.approvedBy?.avatarUrl}
                className="rounded-full w-8"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold">
                  {approvalInfo.approvedBy?.name}
                </p>
                <p className="text-xs text-[#454545]/75">
                  {approvalInfo.approvedBy?.role}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#454545]/75 text-sm">Approved on</p>
            <p className="text-sm">
              {approvalInfo.approvedOn &&
                new Date(
                  approvalInfo.approvedOn.replace(" ", "T"),
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#454545]/75 text-sm">Comments</p>
            <p className="text-sm">{approvalInfo.comments}</p>
          </div>
        </div>
        <hr className="border-b border-borders/50 my-2 mx-2" />
        <p className="font-semibold text-fourth my-2">Approval History</p>

        <div className="flex flex-col">
          {approvalInfo.history.map((item, index) => {
            return (
              <div key={item.id} className="grid grid-cols-[auto_1fr] gap-4">
                <div className="flex flex-col items-center justify-center mx-auto w-10">
                  <div
                    className={`rounded-full flex items-center justify-center text-white shrink-0 z-10 ${index === 0 ? "bg-[#34A853] size-8" : "bg-gray-400 size-6"}`}
                  >
                    {index === 0 && (
                      <Icon
                        icon={item.isApproved ? "mdi:check" : "mdi-light:clock"}
                        className="text-base z-10"
                      />
                    )}
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 items-center p-4 rounded-md my-1 border border-borders/34">
                  <p className="text-sm">{item.action}</p>
                  <p className="text-sm text-center">
                    <span className="font-bold">{item.actorName} </span>
                    <span className="text-[#454545]/75">
                      ({item.actorRole})
                    </span>
                  </p>
                  <p className="text-sm text-right text-[#454545]/75">
                    {new Date(item.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
