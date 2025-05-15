# Usar uma imagem base do Node
FROM node:14 AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependências e instalar
COPY package*.json ./
RUN npm install

# Copiar os arquivos do projeto
COPY . .

# Construir o aplicativo para produção
RUN npm run build

# Usar o servidor NGINX para servir os arquivos estáticos
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# A porta que será exposta
EXPOSE 80

# Comando para rodar o servidor NGINX
CMD ["nginx", "-g", "daemon off;"]

# Copia a configuração customizada do NGINX
COPY default.conf /etc/nginx/conf.d/default.conf
