"use client"
import { User } from "@/app/generated/prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign to..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {users.map(user =>
            <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
          )}

        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AssigneeSelect;
