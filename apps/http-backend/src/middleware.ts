import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
  }

  export function middleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers["authorization"];
  
    if (!token) {
      res.status(401).json({
        message: "Unauthorized access, token is missing",
      });
      return; 
    }
  
    try {
      const decodedJWT = jwt.verify(token, "123123") as  { userId?: string };
  
      if (decodedJWT && decodedJWT.userId) {
        req.userId = decodedJWT.userId;
        next(); 
      } else {
        res.status(401).json({
          message: "Unauthorized access, invalid token",
        });
        return;
      }
    } catch (err) {
      res.status(401).json({
        message: "Unauthorized access, invalid token",
      });
      return;
    }
  }
  