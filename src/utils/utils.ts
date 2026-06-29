import { formatDistanceToNow, differenceInDays } from "date-fns";

export function formatRelativeDate(timestamp: string): string {
  const date = new Date(timestamp.replace(" ", "T"));
  const days = differenceInDays(new Date(), date);

  if (days >= 30) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return formatDistanceToNow(date, { addSuffix: true });
}

export const getFileIconName = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "pdf":
      return "vscode-icons:file-type-pdf2";

    case "docx":
      return "vscode-icons:file-type-word";

    case "md":
      return "vscode-icons:file-type-markdown";

    case "pptx":
      return "vscode-icons:file-type-powerpoint";

    case "xlsx":
      return "vscode-icons:file-type-excel";

    case "csv":
      return "vscode-icons:file-type-excel";

    case "txt":
      return "vscode-icons:file-type-text";

    default:
      return "vscode-icons:default-file";
  }
};
