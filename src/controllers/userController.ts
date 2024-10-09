import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

// 定義註冊請求的驗證模式
const registerSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  name: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  homePhone: Joi.string().optional(),
  birthDate: Joi.date().iso().optional(),
  address: Joi.string().optional(),
  avatar: Joi.string().optional(),
});

export const UserController = {
  /**
   * 註冊用戶
   * @param req
   * @param res
   * @returns
   */
  async register(req: Request, res: Response) {
    try {
      // 驗證請求數據
      const { error, value } = registerSchema.validate(req.body, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          error: "驗證失敗",
          details: error.details.map(detail => detail.message),
        });
      }

      const { username, email, password, name, phoneNumber, homePhone, birthDate, bankAccount, address, avatar } = value;

      const hashedPassword = await bcrypt.hash(password, 10);

      let user: any;
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

      res.status(201).json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          phoneNumber: user.phoneNumber,
          address: user.address,
          avatar: user.avatar,
        },
        token,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Unique constraint failed on the fields: (`username`)")) {
          return res.status(400).json({ error: "用戶名已被使用" });
        }
        if (error.message.includes("Unique constraint failed on the fields: (`email`)")) {
          return res.status(400).json({ error: "郵箱已被註冊" });
        }
      }
      res.status(400).json({ error: "註冊失敗" });
    }
  },

  /**
   * 登錄用戶
   * @param req
   * @param res
   * @returns
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      //   const user = await prisma.user.findUnique({ where: { email } });
      let user: any;

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "郵箱或密碼錯誤" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

      res.json({ user: { id: user.id, username: user.username, email: user.email }, token });
    } catch (error) {
      res.status(400).json({ error: "登錄失敗" });
    }
  },

  /**
   * 獲取用戶資料
   * @param req
   * @param res
   * @returns
   */
  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      //   const user = await prisma.user.findUnique({
      //     where: { id: userId },
      //     select: { id: true, username: true, email: true, name: true, phoneNumber: true, address: true, avatar: true },
      //   });
      let user: any;

      if (!user) {
        return res.status(404).json({ error: "用戶不存在" });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "獲取個人資料失敗" });
    }
  },

  /**
   * 更新用戶資料
   * @param req
   * @param res
   * @returns
   */
  async updateProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { name, phoneNumber, address, avatar } = req.body;

      //   const updatedUser = await prisma.user.update({
      //     where: { id: userId },
      //     data: { name, phoneNumber, address, avatar },
      //     select: { id: true, username: true, email: true, name: true, phoneNumber: true, address: true, avatar: true },
      //   });
      let updatedUser: any = "";

      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: "更新個人資料失敗" });
    }
  },
};
