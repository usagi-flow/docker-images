`web-server` image
=====================

A light-weight, yet robust web server for serving static content.

```
docker pull mrnehu/web-server
```

This image builds upon [Nginx](https://hub.docker.com/_/nginx).

## Usage

The web server will serve content that is mounted unter `/srv/www` on port 80.

See `docker-compose.yml` for a usage example.