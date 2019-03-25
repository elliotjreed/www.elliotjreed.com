FROM nginx:stable-alpine

WORKDIR /var/www/html

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist /var/www/html

EXPOSE 81
