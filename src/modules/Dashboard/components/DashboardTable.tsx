"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@modules/ui/table";

import { CONVERT_MONEY } from "@modules/shared/utils/convertMoney";
import { format } from "date-fns";
import { DashboardActions } from "./DashboardActions";
import { useDashboardEmployeeFiltersStore } from "@modules/Dashboard/store/dahsEmployeeFiltersStore";
import { useEmployeeFiltersInit } from "@modules/Dashboard/hooks/useEmployeeFiltersInit";
import { EmployeesTableSkeleton } from "@modules/shared/skeletons/TableSkeleton";

export const DashboardTable = () => {
  // Inicializar el store
  useEmployeeFiltersInit();

  // Usar el store global
  const { employees, loading, error, activeFilters } =
    useDashboardEmployeeFiltersStore();

  const formattedDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  const TABLE_HEAD = [
    "ID",
    "Vacante",
    "Industria",
    "Ubicación",
    "Rango Salarial",
    "Fecha",
    "Acciones",
  ];

  if (loading || !employees || employees?.length === 0) {
    return <EmployeesTableSkeleton />;
  }

  if (error) {
    return <EmployeesTableSkeleton />;
  }

  if (!employees && activeFilters) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-500">
          No se encontraron empleados con los filtros aplicados
        </div>
      </div>
    );
  }

  return (
    <Table className="table-auto">
      <TableHeader className="bg-zinc-100 p-2">
        <TableRow className="border-y border-zinc-200 px-2">
          {TABLE_HEAD.map((head) => (
            <TableHead key={head} className="py-4">
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees?.map((item) => (
          <TableRow key={item.id} className="border-zinc-200">
            <TableCell className="py-4">{item.code}</TableCell>
            <TableCell className="py-4">{item.vacancy}</TableCell>
            <TableCell className="py-4">{item.industry}</TableCell>
            <TableCell className="py-4">{item.location}</TableCell>
            <TableCell className="py-4">
              {CONVERT_MONEY(item.min_salary)} -{" "}
              {CONVERT_MONEY(item.max_salary)}
            </TableCell>
            <TableCell className="py-4">
              {formattedDate(item.created_at)}
            </TableCell>
            <TableCell className="py-4">
              <DashboardActions id={item.id} slug={item.slug} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
