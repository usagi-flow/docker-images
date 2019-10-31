FROM theiaide/theia

WORKDIR /home/theia
USER root
RUN apk add --no-cache build-base g++ clang meson python2

USER theia
RUN yarn add @theia/cpp

USER root
RUN apk del python2 && \
	rm -f /usr/bin/cc && ln -s /usr/bin/clang /usr/bin/cc && \
	rm -f /usr/bin/c++ && ln -s /usr/bin/clang++ /usr/bin/c++ && \
	echo 'alias l="ls -alh"' >> /etc/profile && \
	echo 'alias install="apk add --no-cache"' >> /etc/profile

WORKDIR /home/theia
#USER theia
ENV ENV=/etc/profile
ENTRYPOINT node /home/theia/src-gen/backend/main.js /home/project --hostname="$BIND_ADDRESS"