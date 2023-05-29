import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const PERSISTENCE = process.env.PERSISTENCE;
export const MONGO_ATLAS = process.env.MONGO_ATLAS;
export const MONGO_LOCAL = process.env.MONGO_LOCAL;
export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const HOST_EMAIL = process.env.HOST_EMAIL;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const EMAIL = process.env.EMAIL;
export const PASS = process.env.PASS;
export const nodeVersion = process.versions.node;
export const memoryUsage = process.memoryUsage.rss();
export const execPath = process.execPath;
export const pid = process.pid;
export const fileProyect = process.env.PWD;