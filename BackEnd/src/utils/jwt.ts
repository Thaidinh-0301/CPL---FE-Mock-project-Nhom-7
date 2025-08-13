import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/dotenv";

export interface AccessTokenPayload {
    id: number;
    email?: string;
    role?: string;
}

export const signAccessToken = (payload: AccessTokenPayload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 });
};

export const verifyToken = (token: string): AccessTokenPayload => {
    return jwt.verify(token, JWT_SECRET) as AccessTokenPayload;
};
