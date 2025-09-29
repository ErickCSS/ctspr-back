"use server";

import { createClient } from "@/modules/shared/utils/supabase/server";
import { AddEmployeeSchemaType } from "@modules/Dashboard/features/add/schemas/addEmployee.schema";
import { revalidatePath } from "next/cache";

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
    benefits: JSON.stringify(data.benefits),
    skills: JSON.stringify(data.skills),
    academicRequirements: JSON.stringify(data.academicRequirements),
    licenseRequirements: JSON.stringify(data.licenseRequirements),
    certificateRequirements: JSON.stringify(data.certificateRequirements),
    owner_email: user?.email ?? "",
    user_id: user?.id as string | undefined,
    slug:
      data.vacancy.split(" ").join("-").replace(/\s/g, "-").toLowerCase() +
      "-" +
      data.code,
  };

  const { error } = await supabase.from("employees").insert([body]).single();

  if (error) {
    console.error("Error adding employee:", error);
    throw error;
  }

  revalidatePath("/dashboard");
  return true;
};
