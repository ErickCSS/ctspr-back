import { EmpleoSingleContentSkeleton } from "@modules/Empleos/features/single/skeleton/SinglePageSkeleton";
import { EmpleoSingleHeroSkeleton } from "@modules/Empleos/features/single/skeleton/SinglePageSkeleton";

export default function Loading() {
  return (
    <>
      <EmpleoSingleHeroSkeleton />
      <EmpleoSingleContentSkeleton />
    </>
  );
}
