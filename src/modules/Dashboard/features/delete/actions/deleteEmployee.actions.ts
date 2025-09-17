"use server";

import { createClient } from "@/modules/shared/utils/supabase/server";

export const deleteEmployeeAction = async ({
  employeeId,
}: {
  employeeId: number;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("employees")
    .delete()
    .eq("id", employeeId)
    .maybeSingle();

  if (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }

  if (!data) {
    return { ok: false, message: "No encontrado o sin permiso." };
  }

  return { ok: true, message: "Empleo eliminado exitosamente." };
};
