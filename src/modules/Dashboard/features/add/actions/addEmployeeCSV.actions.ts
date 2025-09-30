"use server";

import { createClient } from "@/modules/shared/utils/supabase/server";
import { revalidatePath } from "next/cache";

type CsvRow = Record<string, string>;

export const addEmployeeCSVAction = async ({ data }: { data: CsvRow[] }) => {
  const supabase = await createClient();

  const { error } = await supabase.from("employees").insert(data);

  if (error) {
    console.error("Error adding employee:", error);
    throw error;
  }

  revalidatePath("/dashboard", "page");
  return true;
};
