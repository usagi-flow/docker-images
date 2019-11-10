import * as fs from "fs";
import * as path from "path";
import * as sh from "shelljs";

class Generator
{
	protected static readonly readme : string = path.join(__dirname, "README.md");
	protected static readonly dockerRegistry : string = "https://hub.docker.com/r";
	protected static readonly dockerRegistryUser : string = "mrnehu";

	protected static lastCategory : string = undefined;

	public static generate() : void
	{
		Generator.writeStart();

		sh.find(".").filter((value: string, index: number, array: string[]) => {
			return fs.lstatSync(value).isDirectory() &&
				fs.existsSync(path.join(value, "Dockerfile")) &&
				fs.existsSync(path.join(value, "README.md"));
		}).forEach(Generator.processImage);

		Generator.writeEnd();
	}

	protected static writeStart() : void
	{
		sh.echo("docker-images").to(Generator.readme);
		sh.echo("=============").toEnd(Generator.readme);
		sh.echo("").toEnd(Generator.readme);
		sh.echo("A collection of various base and application Docker images.").toEnd(Generator.readme);
		sh.echo("").toEnd(Generator.readme);
		sh.echo("## Images").toEnd(Generator.readme);
	}

	protected static writeEnd() : void
	{
		sh.echo("_Documentation generated with `yarn install && yarn doc`._").toEnd(Generator.readme);
	}

	protected static processImage(imagePath : string) : void
	{
		let category = Generator.getParent(imagePath) 
		let image = path.basename(imagePath);
		let url = Generator.dockerRegistry + "/" + Generator.dockerRegistryUser + "/" + image;

		category = category.charAt(0).toUpperCase() + category.slice(1);

		if (!Generator.lastCategory || Generator.lastCategory != category)
		{
			sh.echo("").toEnd(Generator.readme);
			sh.echo("## " + category).toEnd(Generator.readme);
			sh.echo("").toEnd(Generator.readme);
			Generator.lastCategory = category;
		}

		sh.echo("-	[" + image + "](" + url + ") - _The generator must be taught to put a description here._")
			.toEnd(Generator.readme);
	}

	protected static getParent(pathValue : string) : string
	{
		let pathComponents : string[] = pathValue.split(path.sep);
		pathComponents.pop();
		return pathComponents.join(path.sep);
	}
}

/**
 * Silence echo, as a work-around for https://github.com/shelljs/shelljs/issues/899.
 * After being silenced, it still returns a ShellString that can be piped.
 */
function silenceEcho() : void
{
	(<any>sh)._originalEcho = sh.echo;
	(<any>sh).echo = (value : string) : sh.ShellString => {
		return new sh.ShellString(value + "\n");
	};
}

function restoreEcho() : void
{
	(<any>sh).echo = (<any>sh)._originalEcho;
	(<any>sh)._originalEcho = undefined;
}

try
{
	silenceEcho();
	Generator.generate();
}
finally
{
	restoreEcho();
}