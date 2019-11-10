FROM nginx:alpine

COPY configuration.sh /opt

RUN echo 'alias l="ls -alh"' >> /etc/profile && \
	echo 'alias install="apk add --no-cache"' >> /etc/profile && \
	apk add --no-cache bash && \
	rm -f /etc/nginx/nginx.conf && \
	mkdir -p /srv/www && \
	echo '#!/bin/bash' > /opt/start.sh && \
	echo 'set -e' >> /opt/start.sh && \
	echo 'source /opt/configuration.sh' >> /opt/start.sh && \
	echo 'generateHTPasswd > /srv/.htpasswd' >> /opt/start.sh && \
	echo 'if [ ! -f /etc/nginx/nginx.conf ]; then' >> /opt/start.sh && \
	echo '	generateConfiguration > /etc/nginx/nginx.conf' >> /opt/start.sh && \
	echo 'fi' >> /opt/start.sh && \
	echo 'nginx -g "daemon off;"' >> /opt/start.sh && \
	chmod 755 /opt/start.sh

EXPOSE 80

STOPSIGNAL SIGTERM

ENV ENV=/etc/profile
CMD /opt/start.sh