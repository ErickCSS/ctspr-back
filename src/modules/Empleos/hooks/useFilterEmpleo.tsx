"use client";

import { useEmployeeFiltersStore } from "@modules/Empleos/store/EmployeeFilterStore";
import { EmpleosServices } from "@modules/Empleos/services/empleos.services";
import { useState, useEffect, useRef, useMemo } from "react";
import { useDialogStore } from "@modules/Empleos/store/DialogStore";
import { useSearchParams, useRouter } from "next/navigation";
import { createAutocomplete } from "@algolia/autocomplete-core";

export const useFilterEmpleo = () => {
  const { activeFilters, applyFilters, clearFilters, loading } =
    useEmployeeFiltersStore();
  const { open, setOpen } = useDialogStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const isUserAction = useRef(false);

  const [filterOptions, setFilterOptions] = useState<any>({});
  const [localFilters, setLocalFilters] = useState(activeFilters);
  const [autocompleteValue, setAutocompleteValue] = useState({});

  const autocomplete = useMemo(() => {
    createAutocomplete({
      onStateChange: ({ state }) => {
        setAutocompleteValue(state);
      },
      getSources: () => [
        {
          sourceId: "autocomplete-ctspr",
          getItems: async ({ query }) => {
            if (query) {
              const empleos =
                await EmpleosServices.getEmployeesWithFiltersPagination({
                  search: query,
                });

              return empleos.data ?? [];
            }
            return [];
          },
        },
      ],
    });
  }, []);

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

  useEffect(() => {
    if (isUserAction.current) {
      isUserAction.current = false;
      return;
    }

    const search = searchParams.get("q");
    if (search) {
      const formattedSearch = search.toLowerCase();
      const newFilters = { regionalOffice: formattedSearch };
      setLocalFilters(newFilters);
      applyFilters(newFilters);
    }
  }, [searchParams, applyFilters]);

  const handleApplyFilters = () => {
    isUserAction.current = true;
    applyFilters(localFilters);
    params.set("q", localFilters.regionalOffice || "all");
    router.push(`?${params.toString()}`, { scroll: false });
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
