type StatusType = "status" | "approval" | "activity" | "pipelineStatus";

interface StatusBadgeProps {
  type: StatusType;
  value: string;
  styling?: string;
}

const STATUS_CONFIG: Record<StatusType, Record<string, string>> = {
  status: {
    completed: "bg-[#34A853]/10 text-[#34A853]",
    complete: "bg-[#34A853]/10 text-[#34A853]",
    pending: "bg-[#4285F4]/10 text-[#4285F4]",
    processing: "bg-[#f1d104]/10 text-[#f1d104]",
    failed: "bg-[#d20c0c]/10 text-[#d20c0c]",
  },
  approval: {
    approved: "bg-[#F3CCFF]/78 text-[#691883]",
    pending: "bg-[#f1d104]/10 text-[#f1d104]",
    declined: "bg-[#d20c0c]/10 text-[#d20c0c]",
  },
  activity: {
    active: "bg-[#34A853]/10 text-[#34A853]",
    inactive: "bg-[#d20c0c]/10 text-[#d20c0c]",
  },
  pipelineStatus: {
    "all stages complete": "bg-[#34A853]/10 text-[#34A853]",
    "stages pending": "bg-[#4285F4]/10 text-[#4285F4]",
    "stages processing": "bg-[#f1d104]/10 text-[#f1d104]",
    "stages failed": "bg-[#d20c0c]/10 text-[#d20c0c]",
  },
};

export default function StatusBadge({
  type,
  value,
  styling,
}: StatusBadgeProps) {
  const styles =
    STATUS_CONFIG[type]?.[value.toLowerCase()] ?? "bg-gray-100 text-gray-500";

  return (
    <p
      className={`py-1 px-4 rounded-full font-semibold capitalize ${styles} ${styling}`}
    >
      {value}
    </p>
  );
}
