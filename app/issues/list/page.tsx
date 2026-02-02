import { Issue } from "@/app/generated/prisma/client";
import { Status } from "@/app/generated/prisma/enums";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { ArrowUpIcon } from "lucide-react";
import Link from "next/link";
import IssueActions from "../IssueActions";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt" },
  ];

  const params = (await searchParams) || undefined;
  const orderBy = columns.map(column => column.value).includes(params.orderBy) ?
  { [params.orderBy]: "asc" } : undefined

  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy
  });
  return (
    <div>
      <IssueActions />
      <Table className="mb-5">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.value}>
                <Link
                  href={{
                    query: { ...params, orderBy: column.value },
                  }}
                >
                  {column.label}
                </Link>
                {column.value === params.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/issues/${issue.id}`}
                  className="text-primary hover:underline hover:text-primary/80 transition-colors"
                >
                  {issue.title}
                </Link>
              </TableCell>
              <TableCell className="align-middle">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell>{issue.createdAt.toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssuePage;
export const dynamic = "force-dynamic";
