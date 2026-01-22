import { Skeleton } from "@/modules/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@modules/ui/card";

export const BlogCardSkeleton = () => {
  return (
    <Card className="rounded-none border-zinc-100 pt-0">
      <CardHeader className="p-0">
        <Skeleton className="h-[300px] w-full rounded-none" />
      </CardHeader>

      <CardContent className="flex-1">
        <Skeleton className="mt-4 h-8 w-full rounded-md" />
        <Skeleton className="mt-6 h-4 w-full rounded-md" />
        <Skeleton className="mt-2 h-4 w-5/6 rounded-md" />
      </CardContent>

      <CardFooter className="justify-between gap-5">
        <Skeleton className="h-4 w-20 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
};
