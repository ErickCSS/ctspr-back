"use client";
import { Button } from "@modules/ui/button";
import { useDashboardEmployeeFiltersStore } from "@modules/Dashboard/store/dahsEmployeeFiltersStore";

// Función para normalizar strings: lowercase + remover acentos + espacios a guiones
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-"); // Reemplazar espacios con guiones
};

export const DashboardSideButtonFilter = ({
  sucursal,
  isActive = false,
  onFilterApplied,
}: {
  sucursal: string;
  isActive?: boolean;
  onFilterApplied?: () => void;
}) => {
  // Suscribirse específicamente a regionalOffice para re-renderizar cuando cambie
  const regionalOffice = useDashboardEmployeeFiltersStore(
    (state) => state.activeFilters.regionalOffice,
  );
  const { updateFilter, removeFilter } = useDashboardEmployeeFiltersStore();

  const normalizedSucursal = normalizeString(sucursal);
  const isFilterActive =
    regionalOffice && normalizeString(regionalOffice) === normalizedSucursal;

  const handleFilter = async () => {
    // Leer el estado ACTUAL del store en el momento del click
    const currentRegionalOffice =
      useDashboardEmployeeFiltersStore.getState().activeFilters.regionalOffice;
    const currentIsActive =
      currentRegionalOffice &&
      normalizeString(currentRegionalOffice) === normalizedSucursal;

    if (currentIsActive) {
      // Si ya está activo, lo desactivamos
      await removeFilter("regionalOffice");
    } else {
      // Si no está activo, lo activamos con el valor del botón
      await updateFilter("regionalOffice", normalizedSucursal);
    }

    onFilterApplied?.();
  };

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
