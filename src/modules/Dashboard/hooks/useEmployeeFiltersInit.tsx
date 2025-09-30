"use client";
import { useEffect } from "react";
import { useDashboardEmployeeFiltersStore } from "../store/dahsEmployeeFiltersStore";

export const useEmployeeFiltersInit = () => {
  const { applyFilters, employees } = useDashboardEmployeeFiltersStore();

  useEffect(() => {
    // Solo cargar empleados iniciales si no hay datos
    if (employees === null) {
      console.log("🚀 Inicializando store de filtros");
      applyFilters({});
    }
  }, [applyFilters, employees]);
};
