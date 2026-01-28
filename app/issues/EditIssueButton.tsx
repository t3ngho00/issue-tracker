import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button variant="outline">
      <Pencil className="w-4 h-4" />
      <Link href={`/issues/${issueId}/edit`}>Edit issue</Link>
    </Button>
  );
};

export default EditIssueButton;
