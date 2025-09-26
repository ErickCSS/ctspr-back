"use client";

import { Link } from "next-view-transitions";
import { EmpleoDrawerDialog } from "./EmpleoDrawerDialog";
import { CardEmployee } from "@modules/shared/components/CardEmployee";
import { useEmployeeFiltersStore } from "@modules/Empleos/store/EmployeeFilterStore";

import { useInitStore } from "@modules/Empleos/hooks/useInitStore";
import { CardEmployeeSkeleton } from "@modules/shared/skeletons/CardEmployeeSkeleton";

export const EmpleosList = () => {
  useInitStore();
  const { employees, loading } = useEmployeeFiltersStore();

  if (loading || !employees) {
    return (
      <section className="bg-white px-4 py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-4">
            <EmpleoDrawerDialog />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardEmployeeSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-4">
          <EmpleoDrawerDialog />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {employees?.map((employee) => (
            <Link key={employee.id} href={`/empleos/${employee.slug}`}>
              <CardEmployee employee={employee} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
