FROM theiaide/theia

WORKDIR /home/theia
USER root
RUN apk add --no-cache sudo shadow build-base g++ clang meson python2 && \
	rm -f /usr/bin/cc && ln -s /usr/bin/clang /usr/bin/cc && \
	rm -f /usr/bin/c++ && ln -s /usr/bin/clang++ /usr/bin/c++ && \
	userdel node && \
	echo 'export PATH="$PATH:$HOME/.yarn/bin' >> /etc/profile && \
	echo 'alias l="ls -alh"' >> /etc/profile && \
	echo 'alias install="apk add --no-cache"' >> /etc/profile

USER theia
RUN yarn add @theia/cpp && \
	yarn global add typescript ts-node

USER root
RUN apk del python2 && \
	echo '#!/bin/sh' > /opt/start.sh && \
	echo 'set -e' >> /opt/start.sh && \
	echo 'export uid=$(ls -dn /home/project | tr -s " " | cut -d" " -f3)' >> /opt/start.sh && \
	echo 'export gid=$(ls -dn /home/project | tr -s " " | cut -d" " -f4)' >> /opt/start.sh && \
	echo 'echo "Synchronizing UID #$uid / GID #$gid"' >> /opt/start.sh && \
	echo 'usermod -u $uid theia || :' >> /opt/start.sh && \
	echo 'groupmod -g $gid theia || :' >> /opt/start.sh && \
	echo 'sudo -E -H -u theia node /home/theia/src-gen/backend/main.js /home/project --hostname="$BIND_ADDRESS"' >> /opt/start.sh && \
	chmod 755 /opt/start.sh

WORKDIR /home/theia
ENV ENV=/etc/profile
ENTRYPOINT /opt/start.sh