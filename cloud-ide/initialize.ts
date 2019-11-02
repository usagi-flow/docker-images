import * as sh from "shelljs";
import * as fs from "fs";

sh.set("-e");

sh.cd("/opt");

// Docker support
if (fs.existsSync("/var/run/docker"))
{
	sh.echo("Installing docker-cli");
	sh.exec("curl -o docker-cli.apk http://dl-cdn.alpinelinux.org/alpine/latest-stable/community/x86_64/docker-cli-18.09.8-r0.apk").toEnd("/dev/null");
	sh.exec("apk add --no-cache docker-cli.apk").toEnd("/dev/null");
	sh.exec("groupadd docker");
	sh.exec("usermod -a -G docker theia");
	let gid : string = sh.exec("ls -dn /var/run/docker | tr -s ' ' | cut -d' ' -f4", {silent: true}).stdout.trimRight();
	sh.exec("groupmod -g " + gid + " docker");
}

// SSH convenience
let knownHost : string = "";
sh.mkdir("-p", "/home/theia/.ssh");
sh.chown("-R", "theia:theia", "/home/theia/.ssh");
sh.chmod(700, "/home/theia/.ssh");
sh.echo(knownHost).toEnd("/home/theia/.ssh/known_hosts");

console.log("Initialized");