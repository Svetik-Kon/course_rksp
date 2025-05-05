FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Если используется Prisma
RUN npx prisma generate && npx prisma migrate deploy || true
EXPOSE 3002
CMD ["node", "index.js"]
