import { createClient } from "@/modules/shared/utils/supabase/client";
import { EmployeeType } from "@/modules/shared/types/employee.type";
import { Pagination } from "@modules/shared/types/pagination.type";

export interface FilterParams {
  regionalOffice?: string;
  industry?: string;
  location?: string;
  typeOfEmployment?: string;
  salaryMin?: number;
  salaryMax?: number;
  search?: string;
  page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export class EmpleosServices {
  static async getEmployees() {
    const supabase = await createClient();
    const { data } = await supabase
      .from("employees")
      .select("*")
      .order("created_at", { ascending: false });

    const employees = data as EmployeeType[] | null;
    return employees;
  }

  static async getEmployeeBySlug(slug: string) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("employees")
      .select("*")
      .eq("slug", slug);

    const employee = data?.[0] as EmployeeType | null;

    return employee;
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

  static async getEmployeesWithFiltersPagination(
    filters: FilterParams,
  ): Promise<PaginatedResponse<EmployeeType>> {
    const supabase = await createClient();
    const ITEMS_PER_PAGE = 15;
    const currentPage = filters.page || 1;
    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    let query = supabase
      .from("employees")
      .select("*", { count: "exact" })
      .eq("is_deleted", false);

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

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      throw new Error(`Error al filtrar empleados: ${error.message}`);
    }

    const totalRecords = count || 0;
    const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);

    return {
      data: data as EmployeeType[],
      pagination: {
        records: totalRecords,
        items_per_page: ITEMS_PER_PAGE,
        previous_page: currentPage > 1 ? currentPage - 1 : null,
        current_page: currentPage,
        next_page: currentPage < totalPages ? currentPage + 1 : null,
        total_pages: totalPages,
      },
    };
  }

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
