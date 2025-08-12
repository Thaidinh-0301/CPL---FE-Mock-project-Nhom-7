import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) return res.status(400).json({ message: "email and password required" });

        const result = await authService.registerService(email, password, role);
        return res.status(201).json({ user: result.user, token: result.token });
    } catch (err: any) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "email and password required" });

        const result = await authService.loginService(email, password);
        return res.status(200).json({ user: result.user, token: result.token });
    } catch (err: any) {
        next(err);
    }
};
