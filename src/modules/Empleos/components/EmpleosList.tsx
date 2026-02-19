"use client";

import { Link } from "next-view-transitions";
import { EmpleoDrawerDialog } from "./EmpleoDrawerDialog";
import { CardEmployee } from "@modules/shared/components/CardEmployee";
import { useEmployeeFiltersStore } from "@modules/Empleos/store/EmployeeFilterStore";

import { CardEmployeeSkeleton } from "@modules/shared/skeletons/CardEmployeeSkeleton";
import Pagination from "@modules/shared/components/pagination/Pagination";
import { Search } from "lucide-react";
import { useLocale } from "next-intl";
import { BackButton } from "@modules/Empleos/features/single/components/BackButton";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const EmpleosList = () => {
  const { employees, loading, pagination, page, setPage, applyFilters } =
    useEmployeeFiltersStore();
  const locale = useLocale();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Solo cargar datos iniciales si employees es null (primera carga)
    if (employees === null && !loading) {
      const newFilters: any = {};

      const regionalOffice = searchParams.get("q");
      if (regionalOffice) {
        newFilters.regionalOffice = regionalOffice.toLowerCase();
      }

      const location = searchParams.get("l");
      if (location) {
        newFilters.location = location;
      }

      const industry = searchParams.get("i");
      if (industry) {
        newFilters.industry = industry.toLowerCase();
      }

      const typeOfEmployment = searchParams.get("t");
      if (typeOfEmployment) {
        newFilters.typeOfEmployment = typeOfEmployment.toLowerCase();
      }

      const pageParam = searchParams.get("page");
      const pageNumber = pageParam ? parseInt(pageParam) : 1;

      applyFilters(newFilters, pageNumber);
    }
  }, [employees, loading, searchParams, applyFilters]);

  if (loading || !employees) {
    return (
      <section className="bg-white px-4 py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-4">
            <EmpleoDrawerDialog />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 15 }).map((_, index) => (
              <CardEmployeeSkeleton key={index} />
            ))}
          </div>
          <Pagination pagination={pagination} page={page} setPage={setPage} />
        </div>
      </section>
    );
  }

  if (employees.length === 0) {
    return (
      <section className="bg-white px-4 py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-4">
            <EmpleoDrawerDialog />
          </div>
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6 text-center">
              <div className="rounded-full bg-zinc-200 p-4">
                <Search className="h-8 w-8 text-zinc-500" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-zinc-900">
                  No se encontraron resultados
                </h3>
                <p className="text-sm text-zinc-600">
                  Intenta ajustar tus filtros o realiza una nueva búsqueda
                </p>
              </div>
            </div>
          </div>
          <Pagination pagination={pagination} page={page} setPage={setPage} />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-4 flex w-fit flex-col gap-2">
          <BackButton />
          <EmpleoDrawerDialog />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {employees?.map((employee) => (
            <Link
              key={employee.id}
              href={`/${locale}/empleos/${employee.slug}`}
            >
              <CardEmployee employee={employee} />
            </Link>
          ))}
        </div>
        <Pagination pagination={pagination} page={page} setPage={setPage} />
      </div>
    </section>
  );
};
