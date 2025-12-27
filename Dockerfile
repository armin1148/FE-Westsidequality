# # Stage 1: build
# FROM node:20-alpine AS builder

# # install pnpm
# RUN npm install -g pnpm

# WORKDIR /app

# # copy lockfile and package.json
# COPY package.json pnpm-lock.yaml ./

# # install dependencies
# RUN pnpm install --frozen-lockfile

# # Copy source code
# COPY . .

# # Build Next.js
# RUN pnpm build

# # Stage 2: production
# FROM node:20-alpine AS runner

# WORKDIR /app

# ENV NODE_ENV=production

# # copy pnpm to run production
# RUN npm install -g pnpm

# # Copy app from builder
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules

# # Copy env production
# COPY .env.production .env

# EXPOSE 3000

# CMD ["pnpm", "start"]

FROM node:20-alpine

# Cài đặt pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy các file từ thư mục đã giải nén trên EC2 vào container
COPY . .

# Chỉ cài những thư viện cần để chạy (tiết kiệm dung lượng)
RUN pnpm install --prod --frozen-lockfile

COPY .env.production .env

EXPOSE 3000

# Chạy Next.js
CMD ["pnpm", "start"]