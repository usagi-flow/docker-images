FROM nginx:alpine

COPY nginx.conf /etc/nginx/

RUN echo 'alias l="ls -alh"' >> /etc/profile && \
	echo 'alias install="apk add --no-cache"' >> /etc/profile && \
	mkdir -p /srv/www && \
	echo '#!/bin/sh' > /opt/start.sh && \
	echo 'echo "$USER_0" > /srv/.htpasswd' >> /opt/start.sh && \
	echo 'echo "Entries:"' >> /opt/start.sh && \
	echo 'cat /srv/.htpasswd' >> /opt/start.sh && \
	echo 'nginx -g "daemon off;"' >> /opt/start.sh && \
	chmod 755 /opt/start.sh

EXPOSE 80

STOPSIGNAL SIGTERM

ENV ENV=/etc/profile
CMD /opt/start.sh
