FROM nginx:alpine

COPY nginx.conf /etc/nginx/

RUN mkdir -p /srv/www && \
	echo '<html><body><h1>Hello world!</body></html>' > /srv/www/index.html

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
