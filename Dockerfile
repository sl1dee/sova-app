FROM node:18 AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем остальные файлы
COPY . .

# Строим фронтенд приложение
RUN npm run build

# Устанавливаем сервер для раздачи статики
FROM nginx:alpine

# Копируем собранное приложение в директорию для статики в Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80 для доступа
EXPOSE 80
