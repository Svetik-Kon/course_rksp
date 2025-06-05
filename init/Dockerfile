FROM node:18

WORKDIR /app

COPY . .

RUN npm install axios prisma

CMD ["/bin/sh", "/app/init.sh"]
