"use server";

import { createClient } from "@/modules/shared/utils/supabase/server";
import { AddEmployeeSchemaType } from "@modules/Dashboard/features/add/schemas/addEmployee.schema";

export const addEmployeeAction = async ({
  data,
}: {
  data: AddEmployeeSchemaType;
}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const body = {
    ...data,
    owner_email: user?.email ?? "",
    user_id: user?.id as string | undefined,
  };

  const { error } = await supabase.from("employees").insert([body]).single();

  if (error) {
    console.error("Error adding employee:", error);
    throw error;
  }

  return true;
};
