#!/bin/sh

clear
docker run --rm --name "ansible" --mount type=bind,source="$(pwd)/share",target=/opt/share -it ansible_ansible bash