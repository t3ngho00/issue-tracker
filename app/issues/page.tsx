import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Issues</h1>
        <Button asChild>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>

      {issues.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No issues found.</p>
          <Button asChild>
            <Link href="/issues/new">Create your first issue</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{issue.title}</h2>
                  <p className="text-muted-foreground line-clamp-2">
                    {issue.description}
                  </p>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Created {new Date(issue.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="ml-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Open
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IssuesPage;
