FROM alpine

RUN apk --no-cache --update add tcpdump

ENTRYPOINT tcpdump
CMD tcpdump -i wg0 -n udp port 51820
