import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (requiredRole: string | string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!roles.includes(user.role)) return res.status(403).json({ message: "Forbidden: insufficient role" });

        next();
    };
};
