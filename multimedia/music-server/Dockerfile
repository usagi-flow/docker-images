FROM alpine

ENV AIRSONIC_PORT=4040
ENV DLNA_PORT=1900/udp
ENV UPNP_PORT=4041
ENV AIRSONIC_DIR=/airsonic
ENV CONTEXT_PATH=/

WORKDIR $AIRSONIC_DIR

COPY airsonic.war .
COPY run.sh .

RUN apk add --no-cache openjdk8-jre-base \
	ffmpeg \
	lame && \
	chmod 755 run.sh

EXPOSE $WEB_PORT
EXPOSE $DLNA_PORT

ENTRYPOINT sh run.sh
