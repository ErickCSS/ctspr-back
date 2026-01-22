"use client";

import { useFilterEmpleo } from "@modules/Empleos/hooks/useFilterEmpleo";
import { Input } from "@modules/ui/input";
import { IconLoader2, IconSearch } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@modules/ui/select";
import {
  SELECT_REGIONAL_OFFICE,
  SELECT_LOCATION,
} from "@modules/shared/lib/SelectInifo";
import { Button } from "@/modules/ui/button";
import { Link } from "next-view-transitions";

export const EmpleoFilterHero = () => {
  const {
    localFilters,
    handleApplyFilters,
    handleRegionalOfficeChange,
    handleLocationChange,
    loading,
    setLocalFilters,
    formProps,
    inputProps,
    autocompleteState,
    panelRef,
    autocomplete,
  } = useFilterEmpleo();

  return (
    <div className="mt-4 hidden max-w-4xl md:block">
      <div className="flex items-center gap-2 rounded-md bg-white p-3">
        <div className="relative flex w-1/3 items-center gap-1">
          <IconSearch stroke={1.5} size={20} className="absolute left-2" />
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
              className="min-h-12 w-full border-none bg-white pl-10 text-base shadow-none placeholder:text-base focus-visible:ring-0 focus-visible:outline-none"
              {...(inputProps as unknown as React.InputHTMLAttributes<HTMLInputElement>)}
            />

            {autocompleteState.isOpen && (
              <div
                className="absolute top-16 w-[350px] rounded-lg bg-white shadow-md"
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
                                <Link
                                  href={`/empleos/${item.slug}`}
                                  className="w-full !justify-between gap-3 text-left"
                                >
                                  <span>{item.vacancy}</span>
                                  <span className="text-xs text-zinc-500">
                                    #{item.code}
                                  </span>
                                </Link>
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
        <div className="h-[28px] !w-[1px] bg-zinc-300" />
        <div className="flex w-1/3 items-center gap-1">
          <Select
            value={localFilters.regionalOffice}
            onValueChange={handleRegionalOfficeChange}
          >
            <SelectTrigger className="min-h-12 w-full border-none bg-white text-base shadow-none">
              <SelectValue
                placeholder="Buscar por oficina de CTS"
                className="text-base text-zinc-400"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-sm">
                Todas las oficinas
              </SelectItem>
              {SELECT_REGIONAL_OFFICE.map((location, index) => (
                <SelectItem
                  key={index}
                  value={location.value}
                  className="text-sm"
                >
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="h-[28px] !w-[1px] bg-zinc-300" />
        <div className="flex w-1/3 items-center gap-1">
          <Select
            value={localFilters.industry}
            onValueChange={handleLocationChange}
          >
            <SelectTrigger className="min-h-12 w-full border-none bg-white text-base shadow-none">
              <SelectValue
                placeholder="Ubicación del Empleo"
                className="text-base text-zinc-400"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"all"} className="text-sm">
                Todas las ubicaciones
              </SelectItem>
              {SELECT_LOCATION.map((location) => (
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
        <Button
          onClick={handleApplyFilters}
          disabled={loading}
          size="lg"
          className="bg-primaryColor/90 hover:bg-primaryColor h-full min-h-12 flex-1 cursor-pointer text-sm font-bold sm:flex-none"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <IconLoader2 className="mr-2 h-4 w-4 animate-spin" /> Buscando
            </div>
          ) : (
            "Buscar"
          )}
        </Button>
      </div>
    </div>
  );
};
