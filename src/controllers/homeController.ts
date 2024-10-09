import { Request, Response } from "express";

export const HomeController = {
  index(req: Request, res: Response) {
    try {
      res.render("index");
    } catch (error) {
      res.status(400).json({ error: "錯誤" });
    }
  },
};
