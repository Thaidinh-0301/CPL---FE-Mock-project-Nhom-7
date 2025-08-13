import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req.user && req.user.id) as number;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const user = await userService.getUserById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user });
    } catch (err) {
        next(err);
    }
};
