import { updateSession } from "@modules/shared/utils/supabase/middleware";
import { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export async function proxy(request: NextRequest) {
  const intlMiddleware = createIntlMiddleware(routing);

  const intlResponse = intlMiddleware(request);

  if (intlResponse) {
    return intlResponse;
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_vercel|favicon\\.ico|.*\\..*).*)",
  ],
};
