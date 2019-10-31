FROM nginx:alpine

COPY nginx.conf /etc/nginx/

RUN echo 'alias l="ls -alh"' >> /etc/profile && \
	echo 'alias install="apk add --no-cache"' >> /etc/profile && \
	mkdir -p /srv/www && \
	echo '<html><body><h1>Hello world!</body></html>' > /srv/www/index.html

EXPOSE 80

STOPSIGNAL SIGTERM

ENV ENV=/etc/profile
CMD ["nginx", "-g", "daemon off;"]