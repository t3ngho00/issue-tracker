import IssueStatusBadge from "@/components/IssueStatusBadge";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Issue } from "../../generated/prisma/client";
import { Card } from "@/components/ui/card";

const IssueDetail = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{issue.title}</h1>
      <div className="flex items-center gap-4 mb-6">
        <IssueStatusBadge status={issue.status} />
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
