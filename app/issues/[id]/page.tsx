import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cache } from "react";
import DeleteIssueButton from "../_component/DeleteIssueButton";
import EditIssueButton from "../_component/EditIssueButton";
import IssueDetail from "../_component/IssueDetail";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await auth();
  const { id } = await params;
  const issue = await fetchIssue(parseInt(id));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-4">
      <div className="lg:col-span-4">
        <IssueDetail issue={issue} canEdit={!!session} />
      </div>
      {session && (
        <div className="mt-4 lg:mt-0 lg:col-span-1">
          <div className="w-full flex flex-col gap-2">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </div>
        </div>
      )}
    </div>
  );
};

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUniqueOrThrow({
    where: { id: issueId },
  }),
);

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchIssue(parseInt(id));

  return {
    title: issue?.title,
    description: "Description of " + issue?.id,
  };
}

export default IssueDetailPage;
