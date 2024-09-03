import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {

    const token = req.cookies.token;
    if (!token) {
        res.status(404);
        return res.json({ message: "Unauthorized access, Try login again" });
    }

    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        req.userId = decode.userId;
        next();

    } catch (error) {
        return res.json({message: "Failed to validate user, try login again"});
    }

}