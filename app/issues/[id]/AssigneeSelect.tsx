import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AssigneeSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign to..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="light">Jasper Nguyen</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AssigneeSelect;
