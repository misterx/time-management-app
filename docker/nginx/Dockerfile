FROM node:8.11 as node

WORKDIR /app/frontend

COPY app/package.json /app/frontend
COPY app/package-lock.json /app/frontend


RUN npm install

COPY app/ /app/frontend

RUN yarn build

FROM nginx:1.11-alpine

COPY docker/nginx/config /etc/nginx/

#COPY public /srv/
COPY --from=node /app/frontend/build/ /srv/

COPY docker/nginx/boot.sh /usr/local/bin/boot_nginx

CMD ["sh", "/usr/local/bin/boot_nginx"]