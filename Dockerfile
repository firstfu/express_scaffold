# 使用 Alpine 版本的 Node.js 以減小鏡像大小
FROM node:22.9.0-alpine

# 安裝 pnpm 和 netcat-openbsd（用於檢查端口可用性）
RUN apk add --no-cache netcat-openbsd && npm install -g pnpm

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# 安裝所有依賴（包括開發依賴）
RUN pnpm install


# 複製源代碼
COPY . .

# 生成 Prisma 客戶端
RUN npx prisma generate

# 設置啟動命令
CMD sh -c '\
    echo "Waiting for database to be ready..." && \
    while ! nc -z db 5432; do \
    sleep 1; \
    done && \
    echo "Database is ready!" && \
    npx prisma migrate dev --name dev && \
    pnpm dev'