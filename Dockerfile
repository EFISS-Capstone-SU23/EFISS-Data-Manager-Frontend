FROM node:18.16.0-alpine AS build

WORKDIR /usr/src/app

COPY package*.json .env ./

RUN npm install --ignore-scripts

COPY . .

RUN npm run build

FROM nginx:1.19-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["sed", "-i", "s/listen\\s*80;/listen 3000;/g", "/etc/nginx/conf.d/default.conf"] && nginx -g 'daemon off;'
