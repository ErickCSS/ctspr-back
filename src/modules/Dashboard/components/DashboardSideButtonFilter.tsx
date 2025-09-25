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

  const handleFilter = async () => {
    const isCurrentlyActive =
      activeFilters.regionalOffice === sucursal.toLowerCase();

    if (isCurrentlyActive) {
      await removeFilter("regionalOffice");
    } else {
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
