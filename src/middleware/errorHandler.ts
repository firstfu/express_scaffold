import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  // 根據環境決定是否發送詳細錯誤信息
  const errorMessage = process.env.NODE_ENV === "production" ? "伺服器內部錯誤" : err.message;

  res.status(500).json({ error: errorMessage });
};

export default errorHandler;
