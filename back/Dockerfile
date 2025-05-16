FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x ./node_modules/.bin/prisma
RUN npx prisma generate

EXPOSE 3333

# ✅ Executa as migrations na inicialização
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
