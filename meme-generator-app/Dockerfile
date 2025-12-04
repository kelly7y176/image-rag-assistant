# 使用輕量級 Node.js 基礎映像
FROM node:20-slim

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 並安裝依賴
COPY package*.json ./
RUN npm install

# 複製其餘應用程式碼
COPY . .

# 預設執行命令
CMD ["node", "server.js"]
