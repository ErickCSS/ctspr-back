"use client";

import { Button } from "@modules/ui/button";
import { Input } from "@modules/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@modules/ui/select";

import { IconLoader2 } from "@tabler/icons-react";
import {
  SELECT_REGIONAL_OFFICE,
  SELECT_INDUSTRIES,
  SELECT_LOCATION,
  SELECT_EMPLOYMENT,
} from "@modules/shared/lib/SelectInifo";
import { useFilterEmpleo } from "@modules/Empleos/hooks/useFilterEmpleo";
import { getCityLabel } from "@/modules/shared/utils";

export const EmpleoFilterAdvanced = () => {
  const {
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
    formProps,
    inputProps,
    autocompleteState,
    panelRef,
    autocomplete,
  } = useFilterEmpleo();

  return (
    <div className="bg-white">
      <div className="flex flex-col space-y-4">
        {/* Búsqueda */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Búsqueda</label>
          <div className="relative">
            <form
              onSubmit={
                formProps.onSubmit as unknown as React.FormEventHandler<HTMLFormElement>
              }
              onReset={
                formProps.onReset as unknown as React.FormEventHandler<HTMLFormElement>
              }
              role={formProps.role}
              noValidate={formProps.noValidate}
              action={formProps.action}
              className="w-full"
            >
              <Input
                placeholder="Buscar en vacantes..."
                className="min-h-12 bg-white text-sm shadow-none focus-visible:ring-0 focus-visible:outline-none"
                {...(inputProps as unknown as React.InputHTMLAttributes<HTMLInputElement>)}
              />

              {autocompleteState.isOpen && (
                <div
                  className="absolute top-14 z-50 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
                  ref={panelRef}
                  {...(autocomplete.getPanelProps() as unknown as React.HTMLAttributes<HTMLDivElement>)}
                >
                  {autocompleteState.collections.map((collection, index) => {
                    const { items } = collection;

                    return (
                      <div key={`section-${index}`}>
                        {items.length > 0 && (
                          <ul {...autocomplete.getListProps()}>
                            {items.map((item, index) => (
                              <li key={index}>
                                <Button asChild variant="ghost">
                                  <a
                                    href={`/empleos/${item.slug}`}
                                    className="w-full !justify-between gap-3 text-left"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-semibold uppercase">
                                        {item.vacancy}
                                      </span>
                                      <span className="text-xs text-zinc-500">
                                        ({getCityLabel(item.location)})
                                      </span>
                                    </div>
                                    <span className="text-xs text-zinc-500">
                                      #{item.code}
                                    </span>
                                  </a>
                                </Button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Industria */}
        <div className="grid grid-cols-2 gap-2">
          {/* <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Industria
            </label>
            <Select
              value={localFilters.industry}
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
          </div> */}

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
                {SELECT_LOCATION?.map((location) => (
                  <SelectItem
                    key={location.value}
                    value={location.value}
                    className="text-sm"
                  >
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tipo de Empleo */}
          {/* <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Tipo de Empleo
            </label>
            <Select
              value={localFilters.typeOfEmployment}
              onValueChange={handleEmploymentTypeChange}
            >
              <SelectTrigger className="min-h-12 w-full bg-white text-sm shadow-none">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm">
                  Todos los tipos
                </SelectItem>
                {SELECT_EMPLOYMENT?.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="text-sm"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

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
                {SELECT_REGIONAL_OFFICE?.map((office) => (
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
        {/* <div className="space-y-2 md:col-span-2 lg:col-span-1">
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
        </div> */}
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
