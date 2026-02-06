"use client";
import { assignIssue, updateIssue } from "@/app/actions/issues";
import { Issue, User } from "@/app/generated/prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, isLoading, error } = useUser();
  const onAssignIssue = async (userId: string) => {
    try {
      await assignIssue(issue.id, userId === "unassigned" ? null : userId);
      toast.success("Updated assignee");
    } catch {
      toast.error("Change couldn't be made");
    }
  };
  if (error) return null;
  if (isLoading) return <Skeleton className="h-4 w-full" />;

  return (
    <Select
      onValueChange={onAssignIssue}
      defaultValue={issue.assignedToUserId || "unassigned"}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign to..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="unassigned">Unassigned</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const useUser = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      return axios.get<User[]>("/api/users").then((res) => res.data);
    },
    staleTime: 60 * 1000, // 60s
  });
};

export default AssigneeSelect;
