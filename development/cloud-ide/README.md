`cloud-ide` image
=================

A simple, configurable cloud IDE instance.

```
docker pull mrnehu/cloud-ide
```

This image builds upon [Theia](https://theia-ide.org) and comes with a fancy ZShell and optional Docker integration.

## Usage

Mount a project directory which is not owned by root to `/home/project`. The container will detect the owner of the directory and access the contents of this directory using its owning user. In other words, `/home/project` on the host file system will not be polluted with files owned by root or undefined/wrong users.

See `docker-compose.yml` for a usage example.

### Optional: Docker integration

Mount the Docker socket (`/var/run/docker.sock`) into the container. This will be detected by the container and access to Docker will be possible from within the IDE terminals.

### Optional: custom initialization script

Mount an `initialize.ts` or `initialize.sh` file to `/opt/initialize.ts`/`/opt/initialize.sh` (that's right, you can write the initialization script in TypeScript!).

The TypeScript initialization file can access the [NodeJS](https://nodejs.org/api) and [ShellJS](https://github.com/etienne-k/shelljs.git#feat-chown) runtimes.

The IDE application is a NodeJS application located under `/home/theia`. Additional dependencies (e.g. IDE extensions) can be installed with Yarn/NPM.

### Optional: custom ZShell configuration

You can create a `.zshrc.local` file at the root of the project directory. If it exists, it will be sourced automatically: a neat way to define your aliases and customize your ZShell.
