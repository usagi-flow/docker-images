`cloud-ide` image
=================

## Usage

Mount a project directory which is not owned by root to `/home/project`.

See `docker-compose.yml` for a usage example.

## Caveats

Every now and then, the image building will fail due to C++ compilation errors. Rebuilding tends to work around the issue.