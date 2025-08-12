import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import prisma from "../config/prisma";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });

        const token = header.split(" ")[1];
        const payload = verifyToken(token); // sẽ ném nếu invalid

        if (!payload || !payload.id) return res.status(401).json({ message: "Invalid token payload" });

        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: { id: true, email: true, role: true }
        });

        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (err: any) {
        if (err.name === "TokenExpiredError") return res.status(401).json({ message: "Token expired" });
        return res.status(403).json({ message: "Invalid token" });
    }
};
