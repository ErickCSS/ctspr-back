import { create } from "zustand";
import { EmployeeType } from "@/modules/shared/types/employee.type";
import { EmpleosServices } from "@modules/Empleos/services/empleos.services";
import { Pagination } from "@modules/shared/types/pagination.type";

// Función para normalizar strings: lowercase + remover acentos + espacios a guiones
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-"); // Reemplazar espacios con guiones
};

export interface FilterParams {
  regionalOffice?: string;
  industry?: string;
  location?: string;
  typeOfEmployment?: string;
  salaryMin?: number;
  salaryMax?: number;
  search?: string;
}

interface EmployeeFiltersState {
  employees: EmployeeType[] | null;
  loading: boolean;
  error: string | null;
  activeFilters: FilterParams;
  page: number;
  pagination: Pagination;

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setEmployees: (employees: EmployeeType[] | null) => void;
  setActiveFilters: (filters: FilterParams) => void;
  applyFilters: (filters: FilterParams) => Promise<void>;
  clearFilters: () => Promise<void>;
  updateFilter: (key: keyof FilterParams, value: any) => Promise<void>;
  removeFilter: (key: keyof FilterParams) => Promise<void>;
  setPage: (page: number) => Promise<void>;
}

export const useEmployeeFiltersStore = create<EmployeeFiltersState>(
  (set, get) => ({
    employees: null,
    loading: false,
    error: null,
    activeFilters: {},
    page: 1,
    pagination: {
      records: 0,
      items_per_page: 15,
      previous_page: null,
      current_page: 1,
      next_page: null,
      total_pages: 1,
    },

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setEmployees: (employees) => set({ employees }),
    setActiveFilters: (activeFilters) => set({ activeFilters }),
    setPage: async (page) => {
      set({ page });
      const { activeFilters, applyFilters } = get();
      await applyFilters(activeFilters);
    },
    applyFilters: async (filters) => {
      set({ loading: true, error: null });

      try {
        const filteredEmployees =
          await EmpleosServices.getEmployeesWithFiltersPagination({
            ...filters,
            page: get().page,
          });
        set({
          employees: filteredEmployees.data,
          activeFilters: filters,
          loading: false,
          pagination: filteredEmployees.pagination,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al filtrar empleados";
        set({ error: errorMessage, loading: false });
      }
    },

    clearFilters: async () => {
      await get().applyFilters({});
    },

    updateFilter: async (key, value) => {
      const { activeFilters, applyFilters } = get();
      // Normalizar el valor si es regionalOffice (remover acentos + espacios a guiones)
      const normalizedValue =
        key === "regionalOffice" && typeof value === "string"
          ? normalizeString(value)
          : value;
      const newFilters = { ...activeFilters, [key]: normalizedValue };
      await applyFilters(newFilters);
    },

    removeFilter: async (key) => {
      const { activeFilters, applyFilters } = get();
      const newFilters = { ...activeFilters };
      delete newFilters[key];
      await applyFilters(newFilters);
    },
  }),
);
