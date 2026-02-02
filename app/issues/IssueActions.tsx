import { Button } from "@/components/ui/button";
import Link from "next/link";
import IssueStatusFilter from "./list/IssueStatusFilter";

const IssueActions = () => {
  return (
    <div className="flex justify-between mb-2">
      <IssueStatusFilter />
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
