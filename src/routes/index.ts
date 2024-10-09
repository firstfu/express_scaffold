import express from "express";

import { UserController } from "../controllers/userController";
import { HomeController } from "../controllers/homeController";

const router = express.Router();

// 首頁路由
router.get("/", HomeController.index);

// 用戶路由
router.post("/users/register", UserController.register); // 用戶註冊
router.post("/users/login", UserController.login); // 用戶登錄
router.get("/users/:id", UserController.getProfile); // 獲取用戶資料
router.put("/users/:id", UserController.updateProfile); // 更新用戶資料

export default router;
