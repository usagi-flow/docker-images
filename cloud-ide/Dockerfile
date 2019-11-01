FROM theiaide/theia

WORKDIR /home/theia
USER root
RUN apk add --no-cache sudo shadow curl build-base zsh && \
	userdel node && \
	usermod -s "$(which zsh)" theia && \
	echo 'export PATH="$PATH:$HOME/.yarn/bin"' >> /etc/profile && \
	echo 'alias l="ls -alh"' >> /etc/profile && \
	echo 'alias install="apk add --no-cache"' >> /etc/profile && \
	echo 'alias ssh-hactar="ssh -p16843 nehu@node21247.ood.ovh"' >> /etc/profile

USER theia
RUN \
	yarn global add typescript ts-node && \
	mkdir -p .ssh && \
	chmod 700 .ssh && \
	echo '[node21247.ood.ovh]:16843,[188.165.212.47]:16843 ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBDtY4kF+v0OTf0PqiEX2s7e3dez345dIPrRdcbDg0XaU8x2apOVVSb2m4KSISfzGr2lyKcjXrcU6LZhnukcrEYg=' >> .ssh/known_hosts

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

USER root
RUN \
	echo '#!/bin/sh' > /opt/start.sh && \
	echo 'set -e' >> /opt/start.sh && \
	echo 'if [ ! -f /opt/.initialized ]; then' >> /opt/start.sh && \
	echo '	if [ -f /opt/initialize.sh ]; then' >> /opt/start.sh && \
	echo '		echo "Initializing container"' >> /opt/start.sh && \
	echo '		sh /opt/initialize.sh' >> /opt/start.sh && \
	echo '	fi' >> /opt/start.sh && \
	echo '	if [ -f /opt/initialize.ts ]; then' >> /opt/start.sh && \
	echo '		echo "Initializing container"' >> /opt/start.sh && \
	echo '		ts-node /opt/initialize.ts' >> /opt/start.sh && \
	echo '	fi' >> /opt/start.sh && \
	echo '	touch /opt/.initialized' >> /opt/start.sh && \
	echo 'fi' >> /opt/start.sh && \
	echo 'export uid=$(ls -dn /home/project | tr -s " " | cut -d" " -f3)' >> /opt/start.sh && \
	echo 'export gid=$(ls -dn /home/project | tr -s " " | cut -d" " -f4)' >> /opt/start.sh && \
	echo 'echo "Synchronizing UID #$uid / GID #$gid"' >> /opt/start.sh && \
	echo 'usermod -u $uid theia || :' >> /opt/start.sh && \
	echo 'groupmod -g $gid theia || :' >> /opt/start.sh && \
	echo 'sudo -H -i -u theia node /home/theia/src-gen/backend/main.js /home/project --hostname="$BIND_ADDRESS"' >> /opt/start.sh && \
	chmod 755 /opt/start.sh

WORKDIR /home/theia
ENV ENV=/etc/profile
ENTRYPOINT /opt/start.sh
