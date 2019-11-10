docker-images
=============

A base image for TypeScript development.

## Usage

The image comes in two flavors:

-	The `dev-latest` tag defines a _just-in-time compilation_ container, which supports the development workflow by allowing in-place development.
-	The `prod-latest` tag defines an _ahead-of-time compilation_ container, suitable for packaging and distributing an application.

### `dev-latest` - in-container development

The `dev-latest` tag defines a _just-in-time compilation_ container, which supports the development workflow by allowing in-place development.

This workflow requires mounting your project directory to `/opt/app`.

The container assumes the existence of a `package.json` file with a correct `main` attribute, and a respective `tsconfig.json` file. No particular scripts or dependencies are required.

When starting the container, it will concurrently run `tsc -w` and `nodemon` to watch for file changes, automatically recompile and restart the application.

### `prod-latest` - AoT compilation

The `latest` tag defines an _ahead-of-time compilation_ container: the application will be built together with the container.

This workflow requires rebuilding the container each time the source code is modified, but does not require distributing code separately.

The container assumes the existence of a `package.json` file with the `build` and `start` scripts. No particular dependencies are required.

Create your own Dockerfile in your project directory as follows:
```
FROM mrnehu/base-typescript:latest
COPY . .
```

Then, build your container directly or using docker-compose.