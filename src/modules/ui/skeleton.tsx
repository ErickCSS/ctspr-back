<<<<<<< HEAD:src/components/ui/skeleton.tsx
import { cn } from "@/lib/utils"
=======
import { cn } from "@modules/shared/lib/utils";
>>>>>>> fase2-developer:src/modules/ui/skeleton.tsx

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
<<<<<<< HEAD:src/components/ui/skeleton.tsx
  )
}

export { Skeleton }
=======
  );
}

export { Skeleton };
>>>>>>> fase2-developer:src/modules/ui/skeleton.tsx
