FROM nginx:1.20-alpine

WORKDIR /var/www/front

RUN mkdir -p /var/www/front/dist
COPY . .

COPY front.conf /etc/nginx/conf.d/front.conf
