import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Issue } from "../../generated/prisma/client";
import IssueStatusSelect from "./IssueStatusSelect";

interface Props {
  issue: Issue;
  canEdit?: boolean;
}

const IssueDetail = ({ issue, canEdit = false }: Props) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
      <div className="flex items-center gap-4 mb-6">
        {canEdit ? (
          <IssueStatusSelect issueId={issue.id} currentStatus={issue.status} />
        ) : (
          <IssueStatusBadge status={issue.status} />
        )}
        <p className="text-sm text-muted-foreground">
          Created on {issue.createdAt.toDateString()}
        </p>
      </div>
      <Card className="p-6">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </div>
      </Card>
    </>
  );
};

export default IssueDetail;
