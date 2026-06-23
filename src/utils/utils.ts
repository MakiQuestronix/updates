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
