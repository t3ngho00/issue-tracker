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
import IssueActions from "./IssueActions";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const params = (await searchParams) || undefined;
  const orderBy = columns.map((column) => column.value).includes(params.orderBy)
    ? { [params.orderBy]: "asc" }
    : undefined;

  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });
  return (
    <div>
      <IssueActions />
      <Table className="mb-5">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.value} className={column.className}>
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
              {columns.map((column) => {
                let cellContent;
                switch (column.value) {
                  case "title":
                    cellContent = (
                      <>
                        <Link
                          href={`/issues/${issue.id}`}
                          className="text-primary hover:underline hover:text-primary/80 transition-colors"
                        >
                          {issue.title}
                        </Link>
                        <div className="md:hidden mt-1">
                          <IssueStatusBadge status={issue.status} />
                        </div>
                      </>
                    );
                    break;
                  case "status":
                    cellContent = <IssueStatusBadge status={issue.status} />;
                    break;
                  case "createdAt":
                    cellContent = issue.createdAt.toDateString();
                    break;
                  default:
                    cellContent = null;
                }
                return (
                  <TableCell
                    key={column.value}
                    className={`${column.className || ""} ${
                      column.value === "title"
                        ? "font-medium"
                        : column.value === "status"
                          ? "align-middle"
                          : ""
                    }`}
                  >
                    {cellContent}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssuePage;
export const dynamic = "force-dynamic";
