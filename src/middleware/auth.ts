import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "未提供認證令牌" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
    (req as any).userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "無效的認證令牌" });
  }
};
