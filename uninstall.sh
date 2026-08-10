#!/system/bin/sh
#
# QRT Uninstall cleanup
#

CONFIG_DIR="/data/adb/.config/qrtx"
rm -rf "$CONFIG_DIR"
echo "QRTX config cleaned."
