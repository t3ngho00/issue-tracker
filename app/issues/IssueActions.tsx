import { Button } from "@/components/ui/button";
import Link from "next/link";

const IssueActions = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
