import { Status } from "@/app/generated/prisma/enums";
import Pagination from "@/components/Pagination";
import { prisma } from "@/lib/prisma";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const params = (await searchParams) || undefined;

  const orderBy = columnNames.includes(params.orderBy)
    ? { [params.orderBy]: "asc" }
    : undefined;

  const statuses = Object.values(Status);
  const status = statuses.includes(params.status) ? params.status : undefined;
  const where = { status };

  const page = parseInt(params.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <div>
      <IssueActions />
      <IssueTable issues={issues} searchParams={params} />
      <Pagination pageSize={10} currentPage={page} itemCount={issueCount} />
    </div>
  );
};

export default IssuePage;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Issue tracker - Dashboard',
  description: 'View a all project issues'
}