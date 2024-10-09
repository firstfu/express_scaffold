import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import routes from "./routes";
import errorHandler from "./middleware/errorHandler";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import logger from "./utils/logger";
import path from "path";
import cron from "node-cron";

const app = express();

// 設置代理信任
app.set("trust proxy", 1);

// 中間件
// app.use(helmet());
app.use(cors());
app.use(express.json());

// 動態速率限制: # 這些配置的整體意義是：在1分鐘內，每個客戶端（通常是基於IP地址）最多可以發送100個請求。如果超過這個限制，後續的請求將被拒絕，直到時間窗口重置。
if (process.env.NODE_ENV === "production") {
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || `${1 * 60 * 1000}`), // 預設 1 分鐘
    max: parseInt(process.env.RATE_LIMIT_MAX || "100"), // 預設每個 IP 在 windowMs 內限制 100 個請求
    message: "請求過於頻繁,請稍後再試。",
  });
  app.use(limiter);
}

// 設置視圖引擎
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 靜態文件服務
app.use(express.static(path.join(__dirname, "public")));

// 路由
app.use("/", routes);

// 錯誤處理
app.use(errorHandler);

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("發生了一些錯誤！");
});

// 404 處理
app.use((req, res, next) => {
  res.status(404).render("404", { title: "頁面未找到" });
});

// 記錄應用程序啟動信息
logger.info(`應用程序啟動,環境: ${process.env.NODE_ENV}`);
logger.info(`速率限制: ${process.env.RATE_LIMIT_MAX} 請求 / ${process.env.RATE_LIMIT_WINDOW_MS}ms`);

app.use("/api", routes);

// 添加 crontab 任務
cron.schedule("0 * * * *", () => {
  logger.info("執行每小時定時任務");

  // 在這裡添加您想要每小時執行的任務
  // 例如：清理臨時文件、發送報告郵件等
});

// 新增端口號設定和伺服器啟動
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`伺服器運行在 http://localhost:${PORT}`);
  logger.info("Crontab 任務已設置");
});
