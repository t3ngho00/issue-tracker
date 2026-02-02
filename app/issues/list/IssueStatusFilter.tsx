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
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status !== "All") params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list/" + query);
      }}
      defaultValue={searchParams.get("status") || "All"}
    >
      <SelectTrigger>
        <SelectValue />
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
