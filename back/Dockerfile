# Imagem base leve do Node.js
FROM node:18-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copia apenas os arquivos essenciais primeiro para aproveitar o cache
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera os arquivos do Prisma Client
RUN npx prisma generate

# Expõe a porta que o app escuta
EXPOSE 3333

# Comando padrão para iniciar o app
CMD ["npm", "start"]
