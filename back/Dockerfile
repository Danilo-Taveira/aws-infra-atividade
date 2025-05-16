FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./node_modules/.bin/prisma

RUN npx prisma generate

# ✅ Aplica as migrations no RDS automaticamente
RUN npx prisma migrate deploy

EXPOSE 3333

CMD ["npm", "start"]
