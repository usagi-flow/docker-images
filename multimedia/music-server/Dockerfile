FROM alpine

RUN apk add --no-cache mopidy sudo python3 alsa-utils gstreamer gstreamer-tools
RUN pip3 install Mopidy-MPD && \
	pip3 install Mopidy-Iris
RUN apk add --no-cache pulseaudio pulseaudio-zeroconf pulseaudio-utils avahi
RUN echo 'alias l="ls -alh"' >> /etc/profile.d/alias.sh
RUN echo "root ALL=NOPASSWD: /usr/local/lib/python3.7/dist-packages/mopidy_iris/system.sh" >> /etc/sudoers && \
	echo "mopidy ALL=NOPASSWD: /usr/local/lib/python3.7/dist-packages/mopidy_iris/system.sh" >> /etc/sudoers && \
	echo "" >> /etc/mopidy/mopidy.conf && \
	echo "[audio]" >> /etc/mopidy/mopidy.conf && \
	echo "mixer = software" >> /etc/mopidy/mopidy.conf && \
	echo "mixer_volume =" >> /etc/mopidy/mopidy.conf && \
	echo "output = pulsesink" >> /etc/mopidy/mopidy.conf && \
	echo "buffer_time =" >> /etc/mopidy/mopidy.conf && \
	echo "" >> /etc/mopidy/mopidy.conf && \
	echo "[file]" >> /etc/mopidy/mopidy.conf && \
	echo "enabled = true" >> /etc/mopidy/mopidy.conf && \
	echo "media_dirs = " >> /etc/mopidy/mopidy.conf && \
	echo "  /srv/music|Music" >> /etc/mopidy/mopidy.conf && \
	echo "excluded_file_extensions = " >> /etc/mopidy/mopidy.conf && \
	echo "  .directory" >> /etc/mopidy/mopidy.conf && \
	echo "  .html" >> /etc/mopidy/mopidy.conf && \
	echo "  .jpeg" >> /etc/mopidy/mopidy.conf && \
	echo "  .jpg" >> /etc/mopidy/mopidy.conf && \
	echo "  .log" >> /etc/mopidy/mopidy.conf && \
	echo "  .nfo" >> /etc/mopidy/mopidy.conf && \
	echo "  .pdf" >> /etc/mopidy/mopidy.conf && \
	echo "  .png" >> /etc/mopidy/mopidy.conf && \
	echo "  .txt" >> /etc/mopidy/mopidy.conf && \
	echo "  .zip" >> /etc/mopidy/mopidy.conf && \
	echo "show_dotfiles = false" >> /etc/mopidy/mopidy.conf && \
	echo "follow_symlinks = false" >> /etc/mopidy/mopidy.conf && \
	echo "metadata_timeout = 1000" >> /etc/mopidy/mopidy.conf && \
	mkdir -pv ~/.config/mopidy && \
	ln -sv /etc/mopidy/mopidy.conf ~/.config/mopidy/mopidy.conf

#	apk add --no-cache upmpdcli

ENV ENV=/etc/profile

EXPOSE 6600
EXPOSE 6680

ENTRYPOINT pulseaudio --start -vvvv --log-level=debug && mopidy