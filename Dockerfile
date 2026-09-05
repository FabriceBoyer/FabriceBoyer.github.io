# syntax=docker/dockerfile:1

# ------------------------------------------------------------------ build
FROM node:22-alpine AS build
WORKDIR /app

# Couche de dépendances mise en cache tant que les manifestes ne changent pas.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ------------------------------------------------------------------ serve
FROM nginx:1.27-alpine AS runtime

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
