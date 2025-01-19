FROM --platform=linux/amd64 node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn build

FROM --platform=linux/amd64 nginx:alpine

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
