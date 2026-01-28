import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditIssueButton from "../EditIssueButton";
import IssueDetail from "../IssueDetail";
interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div className="p-5 max-w-2xl lg:max-w-none grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
      <div>
        <IssueDetail issue={issue} />
      </div>
      <div className="mt-4 lg:mt-0">
        <EditIssueButton issueId={issue.id} />
      </div>
    </div>
  );
};

export default IssueDetailPage;
