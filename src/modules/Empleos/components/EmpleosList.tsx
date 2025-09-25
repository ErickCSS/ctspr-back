"use client";

import { Link } from "next-view-transitions";
import { EmpleoDrawerDialog } from "./EmpleoDrawerDialog";
import { CardEmployee } from "@modules/shared/components/CardEmployee";
import { useEmployeeFiltersStore } from "@modules/Empleos/store/EmployeeFilterStore";
import { IconLoader2 } from "@tabler/icons-react";
import { useInitStore } from "@modules/Empleos/hooks/useInitStore";

export const EmpleosList = () => {
  useInitStore();
  const { employees, loading } = useEmployeeFiltersStore();

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-4">
          <EmpleoDrawerDialog />
        </div>
        {loading ? (
          <div className="flex items-center justify-center">
            <IconLoader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {employees?.map((employee) => (
              <Link key={employee.id} href={`/empleos/${employee.slug}`}>
                <CardEmployee employee={employee} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
