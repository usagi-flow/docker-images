FROM nginx:alpine

WORKDIR /srv/www

RUN rm -rf /usr/share/nginx/html && \
	ln -s /srv/www /usr/share/nginx/html

EXPOSE 80

STOPSIGNAL SIGTERM

ENV ENV=/etc/profile
ENTRYPOINT nginx -g "daemon off;"