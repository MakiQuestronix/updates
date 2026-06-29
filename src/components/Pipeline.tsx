import { Icon } from "@iconify/react";
import StatusBadge from "./StatusBadge";

interface PipelineStage {
  step: number;
  name: string;
  status: string;
  completedAt?: string;
}
interface PipelineProps {
  currentDocument: {
    pipelineStatus: string;
    pipelineStages: PipelineStage[];
    pipelineMessage?: string;
  };
}
const STAGE_CONFIG: Record<string, { bg: string; line: string; icon: string }> =
  {
    completed: { bg: "bg-[#34A853]", line: "bg-[#34A853]", icon: "mdi:check" },
    processing: {
      bg: "bg-[#f1d104]",
      line: "bg-[#f1d104]",
      icon: "mdi:loading",
    },
    pending: {
      bg: "bg-[#4285F4]",
      line: "bg-[#4285F4]",
      icon: "mdi:clock-outline",
    },
    failed: { bg: "bg-[#d20c0c]", line: "bg-[#d20c0c]", icon: "mdi:close" },
  };

export default function Pipeline({ currentDocument }: PipelineProps) {
  return (
    <div className="flex flex-1 flex-col p-4 border border-borders/34 shadow rounded-md text-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-lg">Processing Pipeline</p>
          <Icon icon="oui:i-in-circle" className="size-fit" />
        </div>
        <StatusBadge
          type="pipelineStatus"
          value={currentDocument.pipelineStatus}
        />
      </div>

      <div className="flex flex-col my-2">
        {currentDocument.pipelineStages.map((stage, index) => {
          const stageStyle =
            STAGE_CONFIG[stage.status.toLowerCase()] ?? STAGE_CONFIG.pending;
          const isLast = index !== currentDocument.pipelineStages.length - 1;

          return (
            <div key={stage.step} className="flex items-stretch gap-2">
              <div
                className={`flex flex-col items-center w-8 shrink-0 ${!isLast ? "pb-3" : ""} `}
              >
                <div
                  className={`size-8 ${stageStyle.bg} rounded-full flex items-center justify-center text-white shrink-0`}
                >
                  <Icon
                    icon={stageStyle.icon}
                    className="text-base text-first"
                  />
                </div>
                {isLast && <div className={`w-1 flex-1 ${stageStyle.line} `} />}
              </div>

              <div
                className={`flex justify-between items-center border border-borders/34 shadow rounded-md p-2 ${isLast ? "mb-3" : ""} flex-1`}
              >
                <div>
                  <p className="font-semibold">
                    {stage.step}. {stage.name}
                  </p>
                  <p className="text-[#888] text-xs">
                    {stage.completedAt &&
                      new Date(stage.completedAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge type="status" value={stage.status} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {currentDocument.pipelineMessage && (
        <div className="flex items-center gap-2 bg-[#F3CCFF]/30 rounded-md p-3 text-fourth">
          <Icon icon="oui:i-in-circle" />
          <p>{currentDocument.pipelineMessage}</p>
        </div>
      )}
    </div>
  );
}
