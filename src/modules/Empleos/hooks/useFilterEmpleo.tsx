import { useEmployeeFiltersStore } from "@modules/Empleos/store/EmployeeFilterStore";
import { EmpleosServices } from "@modules/Empleos/services/empleos.services";
import { useState, useEffect } from "react";
import { useDialogStore } from "@modules/Empleos/store/DialogStore";

export const useFilterEmpleo = () => {
  const { activeFilters, applyFilters, clearFilters, loading } =
    useEmployeeFiltersStore();
  const { open, setOpen } = useDialogStore();

  const [filterOptions, setFilterOptions] = useState<any>({});
  const [localFilters, setLocalFilters] = useState(activeFilters);

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await EmpleosServices.getFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error("Error loading filter options:", error);
      }
    };
    loadFilterOptions();
  }, []);

  useEffect(() => {
    setLocalFilters(activeFilters);
  }, [activeFilters]);

  const handleApplyFilters = () => {
    applyFilters(localFilters);
    setOpen(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    clearFilters();
  };

  const handleIndustryChange = (value: string) => {
    const newFilters = { ...localFilters };
    if (value === "all") {
      delete newFilters.industry;
    } else {
      newFilters.industry = value;
    }
    setLocalFilters(newFilters);
  };

  const handleLocationChange = (value: string) => {
    const newFilters = { ...localFilters };
    if (value === "all") {
      delete newFilters.location;
    } else {
      newFilters.location = value;
    }
    setLocalFilters(newFilters);
  };

  const handleEmploymentTypeChange = (value: string) => {
    const newFilters = { ...localFilters };
    if (value === "all") {
      delete newFilters.typeOfEmployment;
    } else {
      newFilters.typeOfEmployment = value;
    }
    setLocalFilters(newFilters);
  };

  const handleRegionalOfficeChange = (value: string) => {
    const newFilters = { ...localFilters };
    if (value === "all") {
      delete newFilters.regionalOffice;
    } else {
      newFilters.regionalOffice = value;
    }
    setLocalFilters(newFilters);
  };

  return {
    filterOptions,
    localFilters,
    handleApplyFilters,
    handleClearFilters,
    handleIndustryChange,
    handleLocationChange,
    handleEmploymentTypeChange,
    handleRegionalOfficeChange,
    loading,
    setLocalFilters,
  };
};
