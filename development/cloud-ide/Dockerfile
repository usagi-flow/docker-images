FROM theiaide/theia

WORKDIR /home/theia
USER root
RUN apk add --no-cache sudo shadow curl build-base zsh && \
	userdel node && \
	usermod -s "$(which zsh)" theia && \
	yarn global add typescript ts-node && \
	yarn global add --dev @types/node @types/shelljs && \
	yarn global add https://github.com/etienne-k/shelljs.git#feat-chown && \
	echo 'export PATH="$PATH:/home/theia/.yarn/bin"' >> /etc/profile && \
	echo 'alias l="ls -alh"' >> /etc/profile && \
	echo 'alias install="apk add --no-cache"' >> /etc/profile

USER theia
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

USER root
RUN \
	echo '#!/bin/sh' > /opt/start.sh && \
	echo 'set -e' >> /opt/start.sh && \
	# If already initialized (restarted container), skip initialization
	echo 'if [ -f /opt/.initialized ]; then' >> /opt/start.sh && \
	echo '	echo "Restarting IDE server"' >> /opt/start.sh && \
	echo '	sudo -H -i -u theia node /home/theia/src-gen/backend/main.js /home/project --hostname="$BIND_ADDRESS"' >> /opt/start.sh && \
	echo '	exit $?' >> /opt/start.sh && \
	echo 'fi' >> /opt/start.sh && \
	# Initialization scripts
	echo 'echo "Initializing container"' >> /opt/start.sh && \
	echo 'export PATH="$PATH:/home/theia/.yarn/bin"' >> /opt/start.sh && \
	echo 'if [ -f /opt/initialize.sh ]; then' >> /opt/start.sh && \
	echo '	sh /opt/initialize.sh' >> /opt/start.sh && \
	echo 'fi' >> /opt/start.sh && \
	echo 'if [ -f /opt/initialize.ts ]; then' >> /opt/start.sh && \
	echo '	echo "{ \"compilerOptions\": { ' \
		'\"target\" : \"ES6\", ' \
		'\"typeRoots\" : [\"$(yarn global dir)/node_modules/@types\"], ' \
		'\"baseUrl\" : \"$(yarn global dir)/node_modules\", ' \
		'\"paths\" : { \"*\" : [\"*\"] } ' \
		' }, \"include\": [\"$(yarn global dir)/node_modules/**/*\"] }" >> "$(yarn global dir)/tsconfig.json"' >> /opt/start.sh && \
	echo '	export NODE_PATH="$(yarn global dir)/node_modules"' >> /opt/start.sh && \
	echo '	ts-node --project "$(yarn global dir)/tsconfig.json" /opt/initialize.ts' >> /opt/start.sh && \
	echo 'fi' >> /opt/start.sh && \
	# Support a peristent .zshrc.local
	echo 'echo "if [ -f /home/project/.zshrc.local ]; then" >> /home/theia/.zshrc' >> /opt/start.sh && \
	echo 'echo "	source /home/project/.zshrc.local" >> /home/theia/.zshrc' >> /opt/start.sh && \
	echo 'echo "fi" >> /home/theia/.zshrc' >> /opt/start.sh && \
	# UID/GID synchronization
	echo 'export uid=$(ls -dn /home/project | tr -s " " | cut -d" " -f3)' >> /opt/start.sh && \
	echo 'export gid=$(ls -dn /home/project | tr -s " " | cut -d" " -f4)' >> /opt/start.sh && \
	echo 'export current_uid=$(id -u theia)' >> /opt/start.sh && \
	echo 'export current_gid=$(id -g theia)' >> /opt/start.sh && \
	echo 'if [ "$uid" -eq 0 ]; then' >> /opt/start.sh && \
	echo '	echo "The mounted project directory must not be owned by the root user" >> /dev/stderr' >> /opt/start.sh && \
	echo '	exit 1' >> /opt/start.sh && \
	echo 'fi' >> /opt/start.sh && \
	echo 'if [ "$gid" -eq 0 ]; then' >> /opt/start.sh && \
	echo '	echo "The mounted project directory must not be owned by the root group" >> /dev/stderr' >> /opt/start.sh && \
	echo '	exit 1' >> /opt/start.sh && \
	echo 'fi' >> /opt/start.sh && \
	echo 'if [ "$current_uid" -ne "$uid" ]; then' >> /opt/start.sh && \
	echo '	echo "Synchronizing UID #$uid";' >> /opt/start.sh && \
	echo '	usermod -u $uid theia' >> /opt/start.sh && \
	echo 'fi' >> /opt/start.sh && \
	echo 'if [ "$current_gid" -ne "$gid" ]; then' >> /opt/start.sh && \
	echo '	echo "Synchronizing GID #$gid";' >> /opt/start.sh && \
	echo '	groupmod -g $gid theia' >> /opt/start.sh && \
	echo 'fi' >> /opt/start.sh && \
	# Start the IDE server
	echo 'touch /opt/.initialized' >> /opt/start.sh && \
	echo 'echo "Starting IDE server"' >> /opt/start.sh && \
	echo 'sudo -H -i -u theia node /home/theia/src-gen/backend/main.js /home/project --hostname="$BIND_ADDRESS"' >> /opt/start.sh && \
	chmod 755 /opt/start.sh

WORKDIR /home/theia
ENV ENV=/etc/profile
ENTRYPOINT /opt/start.sh