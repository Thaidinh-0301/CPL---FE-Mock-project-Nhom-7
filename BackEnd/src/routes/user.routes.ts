import { Router } from "express";
import { getProfile } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.get("/profile", authMiddleware, getProfile);

// admin only route
router.get("/admin-only", authMiddleware, roleMiddleware("admin"), (req, res) => {
    res.json({ secret: "admin secret", user: req.user });
});

export default router;
