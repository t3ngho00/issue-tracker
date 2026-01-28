import { Skeleton } from "@/components/ui/skeleton";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-xl">
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-92 w-full" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
};

export default IssueFormSkeleton;
