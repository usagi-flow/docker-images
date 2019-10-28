FROM theiaide/theia

WORKDIR /home/theia
USER root
RUN apk add --no-cache build-base g++ clang meson python2 && \
	rm -f /usr/bin/cc && ln -s /usr/bin/clang /usr/bin/cc && \
	rm -f /usr/bin/c++ && ln -s /usr/bin/clang++ /usr/bin/c++

USER theia
RUN npm install --save @theia/cpp

USER root
RUN apk del python2

WORKDIR /home/theia
USER theia
ENTRYPOINT node /home/theia/src-gen/backend/main.js /home/project --hostname=0.0.0.0