"use client";
import { Status } from "@/app/generated/prisma/enums";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select
      onValueChange={(status) => {
        const query = status === "All" ? "" : `/?status=${status}`;
        router.push("/issues/list/" + query);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Filter issues by status..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses?.map((status) => (
            <SelectItem key={status.label} value={status.value || "All"}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default IssueStatusFilter;
