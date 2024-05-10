import { Skeleton } from "@/components/ui/skeleton";

function CardSkeleton () {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
      <div className="flex justify-items-start space-y-1.5 p-4">
        <Skeleton className="h-20 w-20 rounded-full mr-2" />
        <div className="flex flex-col flex-grow space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-4/5" />
        </div>
      </div>  
    </div>  
  )
}

export default function DisplaySkeleton() {
    return (
      <div>
        <div className="pb-2">
          <CardSkeleton /> 
        </div>
        <div className="pb-2">
          <CardSkeleton /> 
        </div>
        <div className="pb-2">
          <CardSkeleton /> 
        </div>
        <div className="pb-2">
          <CardSkeleton /> 
        </div>
      </div>
    )
}