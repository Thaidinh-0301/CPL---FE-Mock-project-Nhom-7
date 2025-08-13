import app from "./app";
import { PORT } from "./config/dotenv";
import prisma from "./config/prisma";

const server = app.listen(Number(PORT), () => {
    console.log(`Server listening on port ${PORT}`);
});

// Graceful shutdown
const shutdown = async () => {
    console.log("Shutting down server...");
    server.close(async () => {
        await prisma.$disconnect();
        console.log("Prisma disconnected. Bye.");
        process.exit(0);
    });

    // force exit after timeout
    setTimeout(() => {
        console.error("Forcing shutdown...");
        process.exit(1);
    }, 10000);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
