import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="max-w-xl">
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
};

export default loading;
