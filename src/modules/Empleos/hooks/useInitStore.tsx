"use client";
import { useEffect } from "react";
import { useEmployeeFiltersStore } from "../store/EmployeeFilterStore";

export const useInitStore = () => {
  const { applyFilters, employees } = useEmployeeFiltersStore();

  useEffect(() => {
    // Solo cargar empleados iniciales si no hay datos
    if (employees === null) {
      console.log("🚀 Inicializando store de filtros");
      applyFilters({});
    }
  }, [applyFilters, employees]);
};
