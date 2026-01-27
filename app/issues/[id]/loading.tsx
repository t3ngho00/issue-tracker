import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="p-5 space-y-4">
      <Skeleton className="h-8 w-3/4" /> {/* Title */}
      <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
      <Skeleton className="h-4 w-5/6" /> {/* Description line 2 */}
      <Skeleton className="h-4 w-4/6" /> {/* Description line 3 */}
      <Skeleton className="h-6 w-24" /> {/* Status */}
      <Skeleton className="h-4 w-32" /> {/* Created date */}
    </div>
  );
};

export default loading;
