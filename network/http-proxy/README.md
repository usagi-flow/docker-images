http-proxy
==========

An easy-to-setup and easy-to-configure HTTP proxy with ad blocking capabilities.

```
docker pull mrnehu/http-proxy
```

## About

`http-proxy` aims to be a very simple, yet powerful HTTP proxy and ad blocking solution.

It does not just allow blocking ads in the browser, it will block ads for anything that can be set up to use a proxy! This includes, but is not limited to: mobile devices & applications, closed-source applications, embedded devices (media centers, PlayStation, XBox, ...), etc.

This image uses [Privoxy](https://www.privoxy.org) for the base of the proxy solution.

The image includes a copy of [AdBlock Plus](https://adblockplus.org) rules, converted with [Andrwe/privoxy-blocklist](https://github.com/Andrwe/privoxy-blocklist). The rules are downloaded and converted at build time.

## Usage

Simply run the image and expose the port of your choice.

See docker-compose.yml for an example.

## Configuration

Clone the repository and navigate to the image directory `/network/http-proxy`.

The `assets` subdirectory contains the following configuration files:

-	`user.action` - Allows blocking of HTTP requests, optionally using pattern matching.
-	`user.filter` - Allows modifying HTTP responses.
-	`config` - The underlying Privoxy configuration, useful for changing the `debug` level.

For using your own configuration, either rebuild the image (recommended), or mount the files.

_At this time, the configuration is being modified at build time to include the easylist definitions. It is therefore recommended to rebuild the image._

Rebuilding:
```yaml
version: "3.2"

services:
  http-proxy:
    build: .
    container_name: http-proxy
    ports:
      - "8118:8118/tcp"
    restart: on-failure:3
```

Mounting:
```yaml
version: "3.2"

services:
  http-proxy:
    image: mrnehu/http-proxy
    container_name: http-proxy
    ports:
      - "8118:8118/tcp"
    volumes:
      - type: bind
        source: ./assets/config
        target: /etc/privoxy/config
      - type: bind
        source: ./assets/user.action
        target: /etc/privoxy/user.action
      - type: bind
        source: ./assets/user.filter
        target: /etc/privoxy/user.filter
    restart: on-failure:3
```