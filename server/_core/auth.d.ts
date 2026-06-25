/**
 * Authentication middleware for all /api routes.
 * Extracts Bearer token from Authorization header, validates it via Supabase,
 * and mounts req.user (UserContext) and req.supabase on the request object.
 *
 * 支持免登白名单：命中白名单的路径直接放行（有 token 时仍尝试挂载用户上下文）。
 */
export declare function need_login(req: any, res: any, next: any): Promise<any>;
/**
 * 构建登录跳转 URL。
 *
 * 将当前请求的完整 URL 作为 continue_url 参数传递给登录页，
 * 同时从 continue_url 中移除 aiapp_auth_token 参数（避免循环），
 * 如果原始请求中携带了 aiapp_auth_token 则单独透传给登录页。
 */
export declare function buildLoginRedirectUrl(req: any): string;
/**
 * 从请求中提取 token（优先 Authorization header，其次 Cookie）
 */
export declare function extractToken(req: any): string | null;
/**
 * Page-level auth middleware. Runs before express.static and SPA catch-all
 * to ensure non-public apps require authentication before serving any content.
 *
 * For public apps (X-Aiapp-Access-Type: public), requests pass through without auth.
 * For non-public apps, unauthenticated HTML page requests are 302-redirected to OAuth.
 * API routes (/api/*) are skipped here — they are handled by need_login.
 */
export declare function ensurePageAuth(req: any, res: any, next: any): any;
