import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IssueActions from "./list/IssueActions";

const loading = () => {
  return (
    <div className="p-5">
      <Table className="mb-5">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Issue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="align-middle">
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <IssueActions />
    </div>
  );
};

export default loading;
