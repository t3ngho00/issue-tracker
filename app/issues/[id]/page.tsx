import IssueStatusBadge from "@/components/IssueStatusBadge";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
    <div className="p-5 max-w-2xl lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-4">
      <div>
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
        <div className="lg:hidden mt-4">
          <Button variant="outline">
            <Pencil className="w-4 h-4" />
            Edit issue
          </Button>
        </div>
      </div>
      <div className="hidden lg:block">
        <Button variant="outline" className="mb-4">
          <Pencil className="w-4 h-4" />
          <Link href={`/issues/${issue.id}/edit`}>Edit issue</Link>
        </Button>
      </div>
    </div>
  );
};

export default IssueDetailPage;
