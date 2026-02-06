"use client";

import { updateIssueStatus } from "@/app/actions/issues";
import { Status } from "@/app/generated/prisma/enums";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { toast } from "sonner";

const statusOptions: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const statusColors: Record<Status, string> = {
  OPEN: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  IN_PROGRESS:
    "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  CLOSED: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
};

interface Props {
  issueId: number;
  currentStatus: Status;
}

const IssueStatusSelect = ({ issueId, currentStatus }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (status: Status) => {
    startTransition(async () => {
      try {
        await updateIssueStatus(issueId, status);
        toast.success(
          `Status updated to ${status.replace("_", " ").toLowerCase()}`,
        );
      } catch {
        toast.error("Failed to update status");
      }
    });
  };

  return (
    <Select
      defaultValue={currentStatus}
      onValueChange={handleStatusChange}
      disabled={isPending}
    >
      <SelectTrigger className={`w-35 ${statusColors[currentStatus]}`}>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default IssueStatusSelect;
