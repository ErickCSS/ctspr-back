import { createClient } from "@/modules/shared/utils/supabase/server";
import { EmployeeType } from "@modules/Dashboard/types/employee.type";

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
}
