#!/bin/bash

set -e

export HTPASSWD="/srv/.htpasswd"

export _indentationLevel=0

generateHTPasswd()
{
	local i
	for ((i = 0; i < 32767; ++i)); do
		userEntry="$(eval 'echo -n $user'$i)"

		if [ -n "$userEntry" ]; then
			echo "$userEntry"
		else
			break;
		fi
	done
}

generateConfiguration()
{
	_writeEvents
	_writeHttp
}

_openBlock()
{
	if [ "$#" -ne 1 ]; then
		echo "_openBlock() requires the block name as an argument" >> /dev/stderr
		exit 1
	fi

	_writeIndent
	echo "$1 {"

	export _indentationLevel=$(($_indentationLevel + 1))
}

_closeBlock()
{
	if [ "$_indentationLevel" -gt 0 ]; then
		export _indentationLevel=$(($_indentationLevel - 1))
	fi

	_writeIndent
	echo "}"
}

_writeIndent()
{
	local i
	for ((i = 0; i < "$_indentationLevel"; ++i)); do
		echo -n -e "\t"
	done
}

_writeEntry()
{
	if [ "$#" -lt 2 ]; then
		echo "_writeEntry() requires at least two parameters" >> /dev/stderr
		exit 1
	fi

	_writeIndent

	echo -n "$1"

	local i
	for ((i = 2; i <= "$#"; ++i)); do
		echo -n " $(eval 'echo -n $'$i)"
	done

	echo ";"
}

_writeEvents()
{
	_openBlock "events"
	_closeBlock
}

_writeHttp()
{
	_openBlock "http"

	_writeEntry "log_format" "main" \
		'$remote_addr - $remote_user [$time_local] "$request" ' \
		'$status $body_bytes_sent "$http_referer" ' \
		'"$http_user_agent" "$http_x_forwarded_for"';

	_writeServer

	_closeBlock
}

_writeServer()
{
	_openBlock "server"

	_writeEntry "listen" "80"
	_writeEntry "server_name" "$server_name"

	_writeLocations

	_closeBlock
}

_writeLocations()
{
	local i
	for ((i = 0; i < 32767; ++i)); do
		location_source="$(eval 'echo -n $location'$i'_source')"
		location_destination="$(eval 'echo -n $location'$i'_destination')"
		location_basicauth="$(eval 'echo -n $location'$i'_basicauth')"
		location_setbaseurl="$(eval 'echo -n $location'$i'_setbaseurl')"
		location_returncode="$(eval 'echo -n $location'$i'_returncode')"
		location_returnbody="$(eval 'echo -n $location'$i'_returnbody')"

		if [ -n "$location_source" ]; then
			if [ -z "$location_basicauth" ]; then
				location_basicauth=0
			fi

			_writeLocation "$location_source" "$location_destination" "$location_basicauth" "$location_setbaseurl" "$location_returncode" "$location_returnbody"
		else
			break;
		fi
	done
}

_writeLocation()
{
	if [ "$#" -ne 3 ]; then
		echo "_writeLocation() requires three parameters" >> /dev/stderr
		exit 1
	fi

	location_source=$1
	location_destination=$2
	location_basicauth=$3
	location_setbaseurl=$4
	location_returncode=$5
	location_returnbody=$6

	_openBlock "location $location_source"

	if [ "$location_basicauth" -gt 0 ]; then
		_writeEntry "auth_basic" "$server_name"
		_writeEntry "auth_basic_user_file" "$HTPASSWD"
	fi

	if [ -nz "$location_returncode" ]; then
		_writeEntry "return" "$location_returncode" "\"$location_returnbody\""
	fi

	if [ -nz "$location_destination" ]; then
		_writeEntry "proxy_pass" "$location_destination"
	fi

	_writeEntry "proxy_set_header" "Upgrade" '$http_upgrade';
	_writeEntry "proxy_set_header" "Connection" '"Upgrade"';
	_writeEntry "proxy_set_header" "Accept-Encoding" "gzip";

	if [ "$location_setbaseurl" -gt 0 ]; then
		# TODO: verify if the trailing slash should be appended
		_writeEntry "sub_filter" '"<head>"' "'<head><base href=\"$location_source/\"/>'";
	fi

	_closeBlock
}