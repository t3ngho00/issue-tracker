"use client";
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
  const assignIssue = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
  };
  if (error) return null;
  if (isLoading) return <Skeleton className="h-4 w-full" />;

  return (
    <Select
      onValueChange={assignIssue}
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
