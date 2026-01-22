"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/modules/shared/utils/supabase/server";

export const deleteEmployeeAction = async ({
  employeeId,
}: {
  employeeId: number;
}) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("employees")
    .update({ is_deleted: true, deleted_at: new Date().toISOString() })
    .eq("id", employeeId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error deleting employee:", error);
    return { ok: false, message: "Este empleo no te pertenece." };
  }

  revalidatePath("/dashboard", "layout");
  revalidatePath("/dashboard", "page");
  return { ok: true, message: "Empleo eliminado exitosamente." };
};
