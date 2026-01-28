import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="p-5 space-y-4">
      <Skeleton className="h-8 w-3/4" /> 
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" /> 
      <Skeleton className="h-4 w-4/6" /> 
      <Skeleton className="h-6 w-24" /> 
      <Skeleton className="h-4 w-32" /> 
    </div>
  );
};

export default loading;
