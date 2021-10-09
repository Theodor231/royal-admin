FROM nginx:1.20-alpine

WORKDIR /var/www/front

RUN mkdir -p /var/www/front/dist
COPY dist /var/www/front/dist

COPY front.conf /etc/nginx/conf.d/front.conf
