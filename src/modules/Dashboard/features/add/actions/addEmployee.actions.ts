"use server";

import { createClient } from "@/modules/shared/utils/supabase/server";
import { AddEmployeeSchemaType } from "@modules/Dashboard/features/add/schemas/addEmployee.schema";

export const addEmployeeAction = async ({
  data,
}: {
  data: AddEmployeeSchemaType;
}) => {
  const supabase = await createClient();

  const { error } = await supabase.from("employees").insert([data]).single();

  if (error) {
    console.error("Error adding employee:", error);
    throw error;
  }

  return true;
};
