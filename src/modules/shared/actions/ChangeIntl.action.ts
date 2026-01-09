"use server";

import { cookies } from "next/headers";

export const ChangeIntl = async (locale: string) => {
  (await cookies()).set("NEXT_LOCALE", locale, { secure: true });
};
