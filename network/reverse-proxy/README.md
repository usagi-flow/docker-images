`reverse-proxy` image
=====================

A simple, easy-to-configure reverse proxy with optional basic authentication support.

```
docker pull mrnehu/reverse-proxy
```

This image builds upon [Nginx](https://hub.docker.com/_/nginx).

## Usage

This image is configured through environment variables:

-	`server_name`: (_mandatory_) A name for the server
-	**Locations**: each location defines a redirection from the public endpoint to a backend server; define any number of locations by using an numeric index _n_ starting with 0.
	-	`location`_n_`_source`: (_mandatory_) The public endpoint
	-	`location`_n_`_destination`: (_mandatory_) The backend server
	-	`location`_n_`_basicauth`: (_optional, default: 0_) Enable basic authentication (`1`) or not (`0`) on this endpoint.
-	**Users**: the .htpasswd entries; define any number of entries by using an numeric index _n_ starting with 0. See "Basic authentication" for more information.
	-	`user`_n_: (_mandatory_) The .htpasswd user entry

The image generates its configuration based on the environment variables. Alternatively, it is possible to mount an own `nginx.conf` file to `/etc/nginx/nginx.conf`. The container will detect this and will not change the mounted file.

See `docker-compose.yml` for a usage example.

### Basic authentication

Basic authentication requires the generation of an .htpasswd file. This can be done with the apache tools (usually available as a separate package).

Generate the `.htpasswd` file as follows:
```
htpasswd -B -c .htpasswd username
```
_The -B flag forces the bcrypt algorithm, which is more secure than the default md5 algorithm._

_The -c flag indicates that a new file is created (omit to append additional users)._


Print out the contents in the docker-compose.yml format, and insert them under the `environment` section:
```
cat .htpasswd | sed 's|$|$$|g' | awk "{print \"user\" NR-1 \": '\" \$0 \"'\"}"
```

The .htpasswd file is no longer needed and can be deleted.