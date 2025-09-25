"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@modules/ui/table";

import { CONVERT_MONEY } from "@/modules/shared/utils/convertMoney";
import { format } from "date-fns";
import { DashboardActions } from "./DashboardActions";
import { useEmployeeFiltersStore } from "../store/employeeFiltersStore";
import { useEmployeeFiltersInit } from "../hooks/useEmployeeFiltersInit";
import { useEffect } from "react";

export const DashboardTable = () => {
  // Inicializar el store
  useEmployeeFiltersInit();

  // Usar el store global
  const { employees, loading, error, activeFilters } =
    useEmployeeFiltersStore();

  const formattedDate = (date: string) => {
    return format(new Date(date), "dd/MM/yyyy");
  };

  const TABLE_HEAD = [
    "ID",
    "Vacante",
    "Industria",
    "Ubicación",
    "Salario",
    "Fecha",
    "Acciones",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-500">Cargando empleados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!employees || employees.length === 0) {
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
        {employees.map((item) => (
          <TableRow key={item.id} className="border-zinc-200">
            <TableCell className="py-4">{item.code}</TableCell>
            <TableCell className="py-4">{item.vacancy}</TableCell>
            <TableCell className="py-4">{item.industry}</TableCell>
            <TableCell className="py-4">{item.location}</TableCell>
            <TableCell className="py-4">{CONVERT_MONEY(item.salary)}</TableCell>
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
