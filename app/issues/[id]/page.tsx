import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditIssueButton from "../EditIssueButton";
import DeleteIssueButton from "../DeleteIssueButton";
import IssueDetail from "../IssueDetail";
import AssigneeSelect from "./AssigneeSelect";
import { auth } from "@/auth";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await auth();
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-4">
      <div className="lg:col-span-4">
        <IssueDetail issue={issue} />
      </div>
      {session && (
        <div className="mt-4 lg:mt-0 lg:col-span-1">
          <div className="w-full flex flex-col gap-2">
            <AssigneeSelect />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetailPage;
