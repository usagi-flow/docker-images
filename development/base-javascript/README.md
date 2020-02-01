base-javascript
===============

A base image for JavaScript development.

```
docker pull mrnehu/base-javascript
```

## Usage

The image comes in two flavors:

-	The `dev-latest` tag defines a _just-in-time compilation_ container, which supports the development workflow by allowing in-place development.
-	The `prod-latest` tag defines an _ahead-of-time compilation_ container, suitable for packaging and distributing an application.
-	The `latest` tag points to `prod-latest`.

### `dev-latest` - in-container development

The `dev-latest` tag supports the development workflow by allowing in-place development.

Mount your project directory to `/opt/app`, and the container will use your sources. See `docker-compose.dev.yml` for an example.

The container assumes the existence of a `package.json` file with a correct `main` attribute. No particular scripts or dependencies are required.

When starting the container, it will run `nodemon` to watch for file changes and restart the application respectively.

### `prod-latest` - AoT compilation

The `latest` tag includes the application in the image.

This workflow requires rebuilding the image each time the source code is modified, but does not require distributing code separately.

The container assumes the existence of a `package.json` file with the `start` script. No particular dependencies are required.

Create your own Dockerfile in your project directory as follows:
```
FROM mrnehu/base-typescript:prod-latest
COPY . .
RUN yarn install
```

Then, build your container directly or using docker-compose.