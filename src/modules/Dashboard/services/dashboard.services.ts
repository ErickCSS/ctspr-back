import { createClient } from "@modules/shared/utils/supabase/client";
import { EmployeeType } from "@modules/Dashboard/types/employee.type";

export interface FilterParams {
  regionalOffice?: string;
  industry?: string;
  location?: string;
  typeOfEmployment?: string;
  salaryMin?: number;
  salaryMax?: number;
  search?: string;
}
export class DashboardServices {
  static async getEmployees() {
    const supabase = await createClient();
    const { data } = await supabase
      .from("employees")
      .select("*")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false });

    const employees = data as EmployeeType[] | null;
    return employees;
  }

  static async getEmployeesWithFilters(filters: FilterParams) {
    const supabase = await createClient();
    let query = supabase.from("employees").select("*").eq("is_deleted", false);

    // Aplicar filtros dinámicamente
    if (filters.regionalOffice) {
      query = query.eq("regionalOffice", filters.regionalOffice.toLowerCase());
    }

    if (filters.industry) {
      query = query.eq("industry", filters.industry);
    }

    if (filters.location) {
      query = query.ilike("location", `%${filters.location}%`);
    }

    if (filters.typeOfEmployment) {
      query = query.eq("typeOfEmployment", filters.typeOfEmployment);
    }

    if (filters.salaryMin) {
      query = query.gte("salary", filters.salaryMin);
    }

    if (filters.salaryMax) {
      query = query.lte("salary", filters.salaryMax);
    }

    if (filters.search) {
      query = query.or(
        `vacancy.ilike.%${filters.search}%,description.ilike.%${filters.search}%,industry.ilike.%${filters.search}%`,
      );
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      throw new Error(`Error al filtrar empleados: ${error.message}`);
    }

    const employees = data as EmployeeType[] | null;
    return employees;
  }

  static async getEmployeeById(id: number) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("employees")
      .select("*")
      .eq("id", id)
      .eq("is_deleted", false);

    const employee = data?.[0] as EmployeeType | null;

    return employee;
  }

  // Método para obtener valores únicos para filtros
  static async getFilterOptions() {
    const supabase = await createClient();

    const [regionalOffices, industries, locations, employmentTypes] =
      await Promise.all([
        supabase
          .from("employees")
          .select("regionalOffice")
          .eq("is_deleted", false),
        supabase.from("employees").select("industry").eq("is_deleted", false),
        supabase.from("employees").select("location").eq("is_deleted", false),
        supabase
          .from("employees")
          .select("typeOfEmployment")
          .eq("is_deleted", false),
      ]);

    return {
      regionalOffices: [
        ...new Set(regionalOffices.data?.map((item) => item.regionalOffice)),
      ],
      industries: [...new Set(industries.data?.map((item) => item.industry))],
      locations: [...new Set(locations.data?.map((item) => item.location))],
      employmentTypes: [
        ...new Set(employmentTypes.data?.map((item) => item.typeOfEmployment)),
      ],
    };
  }
}
