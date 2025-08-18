/**
 * Array of routes accessible to any user
 * Does not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/auth/new-verification"];

/**
 * Array of routes used for authentication
 * Will redirect users to the protected `/settings` route
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password"
];

/**
 * API authentication routes prefix
 * Routes that start with this prefix are used for auth.js authentication
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default login redirect route
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings";
