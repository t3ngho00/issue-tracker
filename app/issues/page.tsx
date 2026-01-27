import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import IssueActions from "./IssueActions";
const page = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <Table className="mb-5">
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Issue</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium"><Link href={`/issues/${issue.id}`}>{issue.title}</Link></TableCell>
              <TableCell className="align-middle">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell>{issue.createdAt.toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <IssueActions />
    </div>
  );
};

export default page;
