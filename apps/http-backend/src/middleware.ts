import {NextFunction, Request , Response} from "express";
import { JWT_SECRET } from '@repo/backend-common/config';
import  jwt  from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string;
}

interface MyJwtPayload extends jwt.JwtPayload {
  userId: string;
}


export function middleware(req : AuthRequest, res : Response, next : NextFunction){
        const token = req.headers["authorization"] ?? "";
        const decoded = jwt.verify(token , JWT_SECRET) as MyJwtPayload;

        if(decoded){
            req.userId = decoded.userId;
        }else{
            res.status(403).json({
                message: "Unathorized"
            })
        }

    }