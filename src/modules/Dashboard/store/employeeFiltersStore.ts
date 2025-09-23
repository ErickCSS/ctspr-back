import { create } from "zustand";
import { EmployeeType } from "../types/employee.type";
import { DashboardServices } from "../services/dashboard.services";

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

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setEmployees: (employees: EmployeeType[] | null) => void;
  setActiveFilters: (filters: FilterParams) => void;
  applyFilters: (filters: FilterParams) => Promise<void>;
  clearFilters: () => Promise<void>;
  updateFilter: (key: keyof FilterParams, value: any) => Promise<void>;
  removeFilter: (key: keyof FilterParams) => Promise<void>;
}

export const useEmployeeFiltersStore = create<EmployeeFiltersState>(
  (set, get) => ({
    employees: null,
    loading: false,
    error: null,
    activeFilters: {},

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setEmployees: (employees) => set({ employees }),
    setActiveFilters: (activeFilters) => set({ activeFilters }),

    applyFilters: async (filters) => {
      set({ loading: true, error: null });

      try {
        const filteredEmployees =
          await DashboardServices.getEmployeesWithFilters(filters);
        set({
          employees: filteredEmployees,
          activeFilters: filters,
          loading: false,
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
      const newFilters = { ...activeFilters, [key]: value };
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
