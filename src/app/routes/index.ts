// routes / index.ts
import { Router } from "express";
import { GiftRoutes } from "../modules/Gift/gift.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();
const moduleRoutes = [
    {
        path: '/',
        route: GiftRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
]
moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;