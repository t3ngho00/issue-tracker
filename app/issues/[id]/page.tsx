import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
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
    <div className="p-5 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
      <div className="flex items-center gap-4 mb-6">
        <IssueStatusBadge status={issue.status} />
        <p className="text-sm text-muted-foreground">
          Created on {issue.createdAt.toDateString()}
        </p>
      </div>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </div>
    </div>
  );
};

export default IssueDetailPage;
