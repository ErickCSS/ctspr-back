"use server";

import { createClient } from "@/modules/shared/utils/supabase/server";

export const deleteEmployeeAction = async ({
  employeeId,
}: {
  employeeId: number;
}) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("employees")
    .delete()
    .eq("id", employeeId);

  if (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }

  return true;
};
