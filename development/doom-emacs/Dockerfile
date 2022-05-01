FROM alpine

RUN apk add --no-cache emacs git

RUN git clone --depth 1 https://github.com/hlissner/doom-emacs ~/.emacs.d

RUN ~/.emacs.d/bin/doom -y install

#  1. Don't forget to run 'doom sync', then restart Emacs, after modifying
#     ~/.doom.d/init.el or ~/.doom.d/packages.el.
#
#     This command ensures needed packages are installed, orphaned packages are
#     removed, and your autoloads/cache files are up to date. When in doubt, run
#     'doom sync'!
#
#  2. If something goes wrong, run `doom doctor`. It diagnoses common issues with
#     your environment and setup, and may offer clues about what is wrong.
#
#  3. Use 'doom upgrade' to update Doom. Doing it any other way will require
#     additional steps. Run 'doom help upgrade' to understand those extra steps.
#
#  4. Access Doom's documentation from within Emacs via 'SPC h d h' or 'C-h d h'
#     (or 'M-x doom/help')

CMD emacs
