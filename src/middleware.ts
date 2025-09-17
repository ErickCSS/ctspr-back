import { updateSession } from "@modules/shared/utils/supabase/middleware";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_vercel|favicon\\.ico|.*\\..*).*)",
  ],
};
