"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@modules/shared/utils/supabase/server";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { message: "Invalid credentials", success: false, error };
  }

  revalidatePath("/", "layout");
  redirect(DEFAULT_LOGIN_REDIRECT);
}
