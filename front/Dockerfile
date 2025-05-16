# Etapa 1: Build da aplicação React
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Imagem de produção com NGINX
FROM nginx:stable-alpine

# Remove conteúdo padrão
RUN rm -rf /usr/share/nginx/html/*

# Copia o build do React
COPY --from=build /app/build /usr/share/nginx/html

# Configuração customizada do NGINX para React Router
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
