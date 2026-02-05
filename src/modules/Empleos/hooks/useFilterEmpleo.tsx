"use client";

import { useEmployeeFiltersStore } from "@modules/Empleos/store/EmployeeFilterStore";
import { EmpleosServices } from "@modules/Empleos/services/empleos.services";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useDialogStore } from "@modules/Empleos/store/DialogStore";
import { useSearchParams, useRouter } from "next/navigation";
import {
  BaseItem,
  createAutocomplete,
  AutocompleteState,
} from "@algolia/autocomplete-core";
import { EmployeeType } from "@/modules/shared/types/employee.type";
import { useTranslations } from "next-intl";
import { SELECT_LOCATION } from "@modules/shared/lib/SelectInifo";

export const useFilterEmpleo = () => {
  const t = useTranslations("filterJobs");
  const { activeFilters, applyFilters, clearFilters, loading, setPage } =
    useEmployeeFiltersStore();
  const { open, setOpen } = useDialogStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const isUserAction = useRef(false);

  const [filterOptions, setFilterOptions] = useState<any>({});
  const [sanitizedLocations, setSanitizedLocations] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [localFilters, setLocalFilters] = useState<any>({});
  const [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<EmployeeType>
  >({
    collections: [],
    isOpen: false,
    activeItemId: null,
    query: "",
    completion: null,
    status: "idle",
    context: {},
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete<EmployeeType>({
        placeholder: t("searchInputPlaceholder"),
        onStateChange: ({ state }) => {
          setAutocompleteState(state);
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
      }),
    [],
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await EmpleosServices.getFilterOptions();
        setFilterOptions(options);

        // Sanitizar las ubicaciones usando SELECT_LOCATION
        const sanitized = (options.locations || []).map((location: string) => {
          // Buscar la ubicación en SELECT_LOCATION
          const foundLocation = SELECT_LOCATION.find(
            (loc) => loc.value.toLowerCase() === location.toLowerCase(),
          );

          // Si existe en SELECT_LOCATION, usar su label formateado
          // Si no, usar el valor tal cual viene de la BD
          return {
            value: location,
            label: foundLocation ? foundLocation.label : location,
          };
        });

        setSanitizedLocations(sanitized);
      } catch (error) {
        console.error("Error loading filter options:", error);
      }
    };
    loadFilterOptions();
  }, []);

  useEffect(() => {
    if (isUserAction.current) {
      isUserAction.current = false;
      return;
    }

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

    setLocalFilters(newFilters);
    applyFilters(newFilters, pageNumber);
  }, [searchParams, applyFilters]);

  const handleApplyFilters = () => {
    isUserAction.current = true;
    applyFilters(localFilters);
    if (localFilters.regionalOffice === undefined) {
      params.delete("q");
    } else {
      params.set("q", localFilters.regionalOffice!);
    }
    if (localFilters.location === undefined) {
      params.delete("l");
    } else {
      params.set("l", localFilters.location!);
    }
    if (localFilters.industry === undefined) {
      params.delete("i");
    } else {
      params.set("i", localFilters.industry!);
    }
    if (localFilters.typeOfEmployment === undefined) {
      params.delete("t");
    } else {
      params.set("t", localFilters.typeOfEmployment!);
    }

    params.set("page", "1");

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
    sanitizedLocations,
    localFilters,
    handleApplyFilters,
    handleClearFilters,
    handleIndustryChange,
    handleLocationChange,
    handleEmploymentTypeChange,
    handleRegionalOfficeChange,
    loading,
    setLocalFilters,
    formProps,
    inputProps,
    autocompleteState,
    panelRef,
    autocomplete,
  };
};
