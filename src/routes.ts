export const AUTH_ROUTES = ["/login"];
export const PRIVATE_ROUTES = ["/dashboard"];
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
export const DEFAULT_HOME_REDIRECT = "/";
export const DEFAULT_LOGOUT_REDIRECT = "/login";

export const isAuthRoute = (path: string) => AUTH_ROUTES.includes(path);
export const isPrivateRoute = (path: string) =>
  PRIVATE_ROUTES.some((route) => path.startsWith(route));
