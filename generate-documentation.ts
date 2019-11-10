import * as fs from "fs";
import * as path from "path";
import * as sh from "shelljs";

/**
 * A generator which searches the repository for directories containing a Docker image.
 * 
 * A directory is identified as such if it container a Dockerfile and a README.md.
 * 
 * The generator treats the containing directory name as the image name
 * and extracts the description from the README.md file.
 */
class Generator
{
	protected static readonly readmeName : string = "README.md";
	protected static readonly dockerfileName : string = "Dockerfile";
	protected static readonly readme : string = path.join(__dirname, "README.md");
	protected static readonly dockerRegistry : string = "https://hub.docker.com/r";
	protected static readonly dockerRegistryUser : string = "mrnehu";

	protected static lastCategory : string = undefined;

	public static generate() : void
	{
		Generator.writeStart();

		sh.find(".").filter((value: string, index: number, array: string[]) => {
			return fs.lstatSync(value).isDirectory() &&
				fs.existsSync(path.join(value, Generator.dockerfileName)) &&
				fs.existsSync(path.join(value, Generator.readmeName));
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
		sh.echo("").toEnd(Generator.readme);
		sh.echo("_Documentation generated with `yarn install && yarn doc`._").toEnd(Generator.readme);
	}

	protected static processImage(imagePath : string) : void
	{
		let category = Generator.getParent(imagePath) 
		let image = path.basename(imagePath);
		let url = Generator.dockerRegistry + "/" + Generator.dockerRegistryUser + "/" + image;
		let readme = path.join(imagePath, Generator.readmeName);
		let description : string;

		category = category.charAt(0).toUpperCase() + category.slice(1);

		if (!Generator.lastCategory || Generator.lastCategory != category)
		{
			sh.echo("").toEnd(Generator.readme);
			sh.echo("## " + category).toEnd(Generator.readme);
			sh.echo("").toEnd(Generator.readme);
			Generator.lastCategory = category;
		}

		// TODO: not the most flexible way
		description = sh.cat(readme).head({"-n": 4}).tail({"-n": 1}).stdout;
		description = description ? " - " + description : description;

		sh.echo("-	[" + image + "](" + url + ")" + description).toEnd(Generator.readme);
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