FROM alpine

RUN echo "Installing packages packages" && apk --no-cache --update add privoxy bash wget >> /dev/null && \
	cd /etc/privoxy && \
	wget https://raw.githubusercontent.com/Andrwe/privoxy-blocklist/master/privoxy-blocklist.sh && \
	chmod 755 privoxy-blocklist.sh && \
	bash privoxy-blocklist.sh || echo "Script returned non-zero code, continuing..." && \
	sed -i 's|#PRIVOXY_USER=|PRIVOXY_USER=|' /etc/conf.d/privoxy-blacklist && \
	sed -i 's|#PRIVOXY_GROUP=|PRIVOXY_GROUP=|' /etc/conf.d/privoxy-blacklist && \
	sed -i 's|#PRIVOXY_CONF=|PRIVOXY_CONF=|' /etc/conf.d/privoxy-blacklist && \
	bash privoxy-blocklist.sh && \
	echo "Removing unused packages" && apk del bash wget >> /dev/null

COPY assets/config /tmp/privoxy/config
COPY assets/user.action /tmp/privoxy/user.action
COPY assets/user.filter /tmp/privoxy/user.filter

RUN cd /etc/privoxy && \
	mv -v /tmp/privoxy/config . && \
	mv -v /tmp/privoxy/user.action . && \
	mv -v /tmp/privoxy/user.filter . && \
	rmdir /tmp/privoxy && \
	for file in ./easy*.action; do \
		echo "Registering action file: $(basename $file)" && \
		echo "actionsfile $(basename $file)" >> config; \
	done && \
	for file in ./easy*.filter; do \
		echo "Registering filter file: $(basename $file)" && \
		echo "filterfile $(basename $file)" >> config; \
	done && \
	chown -R privoxy:privoxy . && \
	chmod 644 *.action *.filter

EXPOSE 8118

ENTRYPOINT privoxy --no-daemon --user privoxy /etc/privoxy/config
