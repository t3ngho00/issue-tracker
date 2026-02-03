import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { assignedToUser: true },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Issues</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="flex items-center justify-between pb-4 border-b border-border last:border-b-0"
          >
            <div className="flex-1">
              <Link
                href={`/issues/${issue.id}`}
                className="text-sm font-medium hover:underline"
              >
                {issue.title}
              </Link>
              <div className="mt-1">
                <IssueStatusBadge status={issue.status} />
              </div>
            </div>
            {issue.assignedToUser && (
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={issue.assignedToUser.image || ""}
                  alt={issue.assignedToUser.name || ""}
                />
                <AvatarFallback>
                  {issue.assignedToUser.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LatestIssues;
