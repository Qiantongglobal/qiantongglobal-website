/**
 * Example RESTful API route.
 *
 * This file demonstrates how to create a new API route in this project.
 * Copy this file and modify it to create your own routes.
 *
 * Steps to add a new route:
 *   1. Create a new file in this directory (e.g. `todoRoutes.ts`)
 *   2. Define your routes using Express Router
 *   3. Register it in `server/index.ts`:
 *        import bookRoutes from './routes/bookRoutes.js';
 *        app.use('/api/books', bookRoutes);
 *
 * Notes:
 *   - All routes under /api are protected by the `need_login` middleware,
 *     so `req.user` (UserContext) and `req.supabase` (authenticated Supabase client)
 *     are available in every handler.
 *   - Use `req.supabase` to interact with Supabase (database, storage, etc.)
 */
import { Router } from 'express';
declare const router: Router;
export default router;
