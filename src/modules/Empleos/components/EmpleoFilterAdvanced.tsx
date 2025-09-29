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
import { useEmployeeFiltersStore } from "@modules/Empleos/store/EmployeeFilterStore";
import { EmpleosServices } from "@modules/Empleos/services/empleos.services";
import { IconLoader2 } from "@tabler/icons-react";
import {
  REGIONAL_OFFICE,
  SELECT_INDUSTRIES,
} from "@modules/shared/lib/SelectInifo";
import { useDialogStore } from "@modules/Empleos/store/DialogStore";

export const EmpleoFilterAdvanced = () => {
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

  return (
    <div className="bg-white">
      <div className="flex flex-col space-y-4">
        {/* Búsqueda */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Búsqueda</label>
          <Input
            placeholder="Buscar en vacantes..."
            className="min-h-12 bg-white text-sm shadow-none focus-visible:ring-0 focus-visible:outline-none"
            value={localFilters.search || ""}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, search: e.target.value })
            }
          />
        </div>

        {/* Industria */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Industria
            </label>
            <Select
              value={localFilters.industry || "all"}
              onValueChange={handleIndustryChange}
            >
              <SelectTrigger className="min-h-12 w-full bg-white text-sm shadow-none">
                <SelectValue placeholder="Seleccionar industria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"all"} className="text-sm">
                  Todas las industrias
                </SelectItem>
                {SELECT_INDUSTRIES?.map((industry) => (
                  <SelectItem
                    key={industry.value}
                    value={industry.value}
                    className="text-sm"
                  >
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ubicación */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Ubicación
            </label>
            <Select
              value={localFilters.location || "all"}
              onValueChange={handleLocationChange}
            >
              <SelectTrigger className="min-h-12 w-full bg-white text-sm shadow-none">
                <SelectValue placeholder="Seleccionar ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm">
                  Todas las ubicaciones
                </SelectItem>
                {filterOptions.locations?.map((location: string) => (
                  <SelectItem
                    key={location}
                    value={location}
                    className="text-sm"
                  >
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Empleo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tipo de Empleo
            </label>
            <Select
              value={localFilters.typeOfEmployment || "all"}
              onValueChange={handleEmploymentTypeChange}
            >
              <SelectTrigger className="min-h-12 w-full bg-white text-sm shadow-none">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm">
                  Todos los tipos
                </SelectItem>
                {filterOptions.employmentTypes?.map((type: string) => (
                  <SelectItem key={type} value={type} className="text-sm">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sucursal */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Sucursal
            </label>
            <Select
              value={localFilters.regionalOffice || "all"}
              onValueChange={handleRegionalOfficeChange}
            >
              <SelectTrigger className="min-h-12 w-full bg-white text-sm shadow-none">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm">
                  Todas las Sucursales
                </SelectItem>
                {REGIONAL_OFFICE?.map((office) => (
                  <SelectItem
                    key={office.value}
                    value={office.value}
                    className="text-sm"
                  >
                    {office.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Rango Salarial */}
        <div className="space-y-2 md:col-span-2 lg:col-span-1">
          <label className="text-sm font-medium text-gray-700">
            Rango Salarial
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Salario mínimo"
              className="min-h-12 bg-white text-sm shadow-none focus-visible:ring-0 focus-visible:outline-none"
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
              className="min-h-12 bg-white text-sm shadow-none focus-visible:ring-0 focus-visible:outline-none"
              value={localFilters.salaryMax || ""}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  salaryMax: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row md:justify-between">
        <Button
          variant="ghost"
          onClick={handleClearFilters}
          className="flex-1 cursor-pointer border-gray-300 text-sm font-bold sm:flex-none"
        >
          Limpiar Filtros
        </Button>

        <Button
          onClick={handleApplyFilters}
          disabled={loading}
          size="lg"
          className="bg-primaryColor/90 hover:bg-primaryColor flex-1 cursor-pointer py-5 text-sm font-bold sm:flex-none"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <IconLoader2 className="mr-2 h-4 w-4 animate-spin" /> Aplicando
              filtros
            </div>
          ) : (
            "Aplicar Filtros"
          )}
        </Button>
      </div>
    </div>
  );
};
