"use client";
import { Button } from "@modules/ui/button";
import { useEmployeeFiltersStore } from "../store/employeeFiltersStore";
import { useEffect } from "react";

export const DashboardSideButtonFilter = ({
  sucursal,
  isActive = false,
  onFilterApplied,
}: {
  sucursal: string;
  isActive?: boolean;
  onFilterApplied?: () => void;
}) => {
  const { updateFilter, removeFilter, activeFilters } =
    useEmployeeFiltersStore();

  // Log para debugging
  useEffect(() => {
    console.log(
      `🏢 SideButtonFilter (${sucursal}) (Store) - Filtros activos:`,
      activeFilters,
    );
  }, [activeFilters, sucursal]);

  const handleFilter = async () => {
    console.log(`🏢 SideButtonFilter (${sucursal}) (Store) - Click en filtro`);
    const isCurrentlyActive =
      activeFilters.regionalOffice === sucursal.toLowerCase();

    if (isCurrentlyActive) {
      // Si ya está activo, remover el filtro
      console.log(
        `🏢 SideButtonFilter (${sucursal}) (Store) - Removiendo filtro`,
      );
      await removeFilter("regionalOffice");
    } else {
      // Si no está activo, aplicar el filtro
      console.log(
        `🏢 SideButtonFilter (${sucursal}) (Store) - Aplicando filtro`,
      );
      await updateFilter("regionalOffice", sucursal.toLowerCase());
    }

    onFilterApplied?.();
  };

  const isFilterActive =
    activeFilters.regionalOffice === sucursal.toLowerCase();

  return (
    <Button
      variant={isFilterActive ? "default" : "outline"}
      size="sm"
      onClick={handleFilter}
      className={`cursor-pointer text-xs shadow-none transition-all ${
        isFilterActive
          ? "border-primaryColor bg-primaryColor text-white"
          : "border-zinc-300 bg-transparent hover:bg-zinc-50"
      }`}
    >
      {sucursal}
    </Button>
  );
};
