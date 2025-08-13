import prisma from "../config/prisma";

export const getUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: { id },
        select: { id: true, email: true, role: true }
    });
};
