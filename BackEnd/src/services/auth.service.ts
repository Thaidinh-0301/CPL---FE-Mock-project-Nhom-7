import prisma from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/password";
import { signAccessToken } from "../utils/jwt";

export const registerService = async (email: string, password: string, role = "user") => {
    const existing = await prisma.user.findUnique({ where: { email }});
    if (existing) throw new Error("Email already registered");

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
        data: { username : "User1101",email, password: hashed, role }
    });

    const token = signAccessToken({ id: user.id, email: user.email, role: user.role });
    return { user: { id: user.id, email: user.email, role: user.role }, token };
};

export const loginService = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) throw new Error("User not found");

    const ok = await comparePassword(password, user.password);
    if (!ok) throw new Error("Invalid credentials");

    const token = signAccessToken({ id: user.id, email: user.email, role: user.role });
    return { user: { id: user.id, email: user.email, role: user.role }, token };
};
