import { Status } from "@/app/generated/prisma/enums";
import { Badge } from "./ui/badge";

const statusMap: Record<Status, { label: string; className: string }> = {
  OPEN: {
    label: "Open",
    className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className:
      "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  CLOSED: {
    label: "Closed",
    className:
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge className={statusMap[status].className}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
