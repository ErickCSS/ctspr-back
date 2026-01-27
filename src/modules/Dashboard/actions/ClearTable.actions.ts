"use server";

import { createClient } from "@modules/shared/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const clearTable = async () => {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from("employees").delete().neq("id", 0);

    if (error) {
      console.error("Error al limpiar la tabla:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error inesperado:", error);
    return { success: false, error: "Error inesperado al limpiar la tabla" };
  }
};
