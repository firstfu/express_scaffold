# Express + TypeScript + Prisma + PostgreSQL + Docker 腳手架

這是一個現代化的 Web 應用程式開發腳手架,整合了以下技術:

- Express.js: 快速、簡潔的 Node.js Web 應用框架
- TypeScript: JavaScript 的超集,提供靜態類型檢查
- Prisma: 下一代 ORM,簡化數據庫操作
- PostgreSQL: 強大的開源關係型數據庫
- Docker: 容器化技術,確保開發和生產環境的一致性

## 功能特點

- 使用 TypeScript 開發,提供更好的開發體驗和代碼質量
- 整合 Prisma ORM,簡化數據庫操作和遷移
- 使用 Docker 容器化應用和數據庫,方便部署和擴展
- 包含基本的用戶認證和授權功能
- 實現了 API 請求驗證和錯誤處理
- 集成了日誌記錄和安全性最佳實踐

## 快速開始

1. 克隆此倉庫
2. 安裝依賴: `npm install`
3. 複製 `.env.example` 到 `.env` 並配置環境變量
4. 啟動 Docker 容器: `docker-compose up -d`
5. 運行數據庫遷移: `npx prisma migrate dev`
6. 啟動開發服務器: `npm run dev`

## 項目結構

├── src/
│ ├── controllers/ # 控制器邏輯
│ ├── middlewares/ # 中間件
│ ├── models/ # 數據模型
│ ├── routes/ # 路由定義
│ ├── services/ # 業務邏輯
│ ├── utils/ # 工具函數
│ └── app.ts # 應用入口
├── prisma/ # Prisma 配置和遷移
├── docker-compose.yml # Docker 配置
├── Dockerfile # Docker 構建文件
├── package.json
└── tsconfig.json

## 可用腳本

- `npm run dev`: 啟動開發服務器
- `npm run build`: 構建生產版本
- `npm start`: 啟動生產服務器
- `npm test`: 運行測試

## 貢獻

歡迎提交問題和拉取請求。在提交大型更改之前,請先開啟一個問題進行討論。

## 授權

本項目採用 MIT 授權。
