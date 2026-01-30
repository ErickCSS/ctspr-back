"use client";
import { useState, useEffect } from "react";
import { Button } from "@modules/ui/button";
import { Input } from "@modules/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@modules/ui/select";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@modules/ui/sidebar";
import { useDashboardEmployeeFiltersStore } from "../store/dahsEmployeeFiltersStore";
import { DashboardServices } from "../services/dashboard.services";
import {
  SELECT_EMPLOYMENT,
  SELECT_INDUSTRIES,
  SELECT_LOCATION,
} from "@/modules/shared/lib/SelectInifo";
import { useTranslations } from "next-intl";

export const DashboardAdvancedFilters = () => {
  const { activeFilters, applyFilters, clearFilters } =
    useDashboardEmployeeFiltersStore();
  const [filterOptions, setFilterOptions] = useState<any>({});
  const [localFilters, setLocalFilters] = useState(activeFilters);
  const t = useTranslations("filterJobs");

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await DashboardServices.getFilterOptions();
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

  return (
    <>
      {/* Búsqueda */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-sm">{t("search")}</SidebarGroupLabel>
        <SidebarGroupContent>
          <Input
            placeholder={t("searchPlaceholder")}
            className="bg-white !text-xs shadow-none"
            value={localFilters.search || ""}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, search: e.target.value })
            }
          />
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Industria */}
      {/* <SidebarGroup>
        <SidebarGroupLabel className="text-sm">Industria</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select
            value={localFilters.industry || "all"}
            onValueChange={handleIndustryChange}
          >
            <SelectTrigger className="bg-white text-xs shadow-none">
              <SelectValue placeholder="Seleccionar industria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                Todas las industrias
              </SelectItem>
              {SELECT_INDUSTRIES?.map((industry) => (
                <SelectItem
                  key={industry.value}
                  value={industry.value}
                  className="text-xs"
                >
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SidebarGroupContent>
      </SidebarGroup> */}

      {/* Ubicación */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-sm">Ubicación</SidebarGroupLabel>
        <SidebarGroupContent>
          <Select
            value={localFilters.location || "all"}
            onValueChange={handleLocationChange}
          >
            <SelectTrigger className="bg-white text-xs shadow-none">
              <SelectValue placeholder="Seleccionar ubicación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                Todas las ubicaciones
              </SelectItem>
              {SELECT_LOCATION?.map((location) => (
                <SelectItem
                  key={location.value}
                  value={location.value}
                  className="text-xs"
                >
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Tipo de Empleo */}
      {/* <SidebarGroup>
        <SidebarGroupLabel className="text-sm">
          Tipo de Empleo
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <Select
            value={localFilters.typeOfEmployment || "all"}
            onValueChange={handleEmploymentTypeChange}
          >
            <SelectTrigger className="bg-white text-xs shadow-none">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                Todos los tipos
              </SelectItem>
              {SELECT_EMPLOYMENT?.map((type) => (
                <SelectItem
                  key={type.value}
                  value={type.value}
                  className="text-xs"
                >
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SidebarGroupContent>
      </SidebarGroup> */}

      {/* Rango Salarial */}
      {/* <SidebarGroup>
        <SidebarGroupLabel className="text-sm">
          Rango Salarial
        </SidebarGroupLabel>
        <SidebarGroupContent className="space-y-2">
          <Input
            type="number"
            placeholder="Salario mínimo"
            className="bg-white !text-xs shadow-none"
            value={localFilters.salaryMin || ""}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                salaryMin: Number(e.target.value),
              })
            }
          />
          <Input
            type="number"
            placeholder="Salario máximo"
            className="bg-white !text-xs shadow-none"
            value={localFilters.salaryMax || ""}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                salaryMax: Number(e.target.value),
              })
            }
          />
        </SidebarGroupContent>
      </SidebarGroup> */}

      {/* Botones de Acción */}
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <Button
            onClick={handleApplyFilters}
            className="bg-primaryColor hover:bg-primaryColor/90 cursor-pointer text-xs"
            size="sm"
          >
            Aplicar Filtros
          </Button>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="cursor-pointer border-zinc-300 text-xs"
            size="sm"
          >
            Limpiar Filtros
          </Button>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};
