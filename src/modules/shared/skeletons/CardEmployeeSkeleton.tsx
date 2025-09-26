"use client";

import { Skeleton } from "@/modules/ui/skeleton";
import { Card, CardContent, CardHeader } from "@modules/ui/card";
import { Separator } from "@/modules/ui/separator";
import { cn } from "@modules/shared/lib/utils";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@modules/shared/hooks/useMediaQuery.hooks";

export const CardEmployeeSkeleton = () => {
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Card
      className={cn(
        "justify-between shadow-sm",
        isDashboard ? "h-fit" : "h-full",
      )}
    >
      <CardHeader>
        {/* Header - Título y Código */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>

        {/* Sub-header: Location, Date, Regional Office */}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Separator className="mb-4" />

        <div
          className={cn(
            "flex items-center justify-between gap-4",
            isDesktop ? "" : "flex-wrap",
          )}
        >
          {/* Badges */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20 rounded-lg" />
            <Skeleton className="h-6 w-24 rounded-lg" />
          </div>

          {/* Salario */}
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};
