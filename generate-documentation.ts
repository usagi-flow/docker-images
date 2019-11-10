import * as sh from "shelljs";
import * as path from "path";

let readme : string = path.join(__dirname, "README.md");

secho("docker-images").to(readme);
secho("=============").toEnd(readme);
secho("").toEnd(readme);
secho("A collection of various base and application Docker images.").toEnd(readme);
secho("").toEnd(readme);
secho("## Images").toEnd(readme);
secho("").toEnd(readme);
// TODO: generate based on the directory structure and dockerfiles.
secho("### Development").toEnd(readme);
secho("").toEnd(readme);
secho("-	[cloud-ide](https://hub.docker.com/r/mrnehu/cloud-ide) - " +
	"A simple, configurable cloud IDE instance.").toEnd(readme);
secho("").toEnd(readme);
secho("### Networking").toEnd(readme);
secho("").toEnd(readme);
secho("-	[reverse-proxy](https://hub.docker.com/r/mrnehu/reverse-proxy) - " +
	"A simple, easy-to-configure reverse proxy with optional basic authentication support.").toEnd(readme);
secho("").toEnd(readme);

/**
 * Silent echo, as a work-around for https://github.com/shelljs/shelljs/issues/899.
 */
function secho(value : string) : sh.ShellString
{
	return new sh.ShellString(value + "\n");
}