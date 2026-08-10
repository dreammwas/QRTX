#!/system/bin/sh
#
# QRTX Module by DREAM_WAS
# Based on common Magisk module practices + Encore-inspired structure
#

SKIPUNZIP=1
MODDIR=${0%/*}

ui_print " "
ui_print "╔══════════════════════════════════╗"
ui_print "║           Q R T X  v1.0.0          ║"
ui_print "║         by DREAM_WAS             ║"
ui_print "╚══════════════════════════════════╝"
ui_print " "

# Extract files
ui_print "- Extracting module files..."
unzip -o "$ZIPFILE" -x 'META-INF/*' -d $MODPATH >&2

# Set permissions
set_perm_recursive $MODPATH 0 0 0755 0644
set_perm $MODPATH/service.sh 0 0 0755
set_perm $MODPATH/action.sh 0 0 0755
set_perm $MODPATH/uninstall.sh 0 0 0755
[ -d $MODPATH/system/bin ] && set_perm_recursive $MODPATH/system/bin 0 0 0755 0755

# Create config dir
CONFIG_DIR="/data/adb/.config/qrtx"
mkdir -p "$CONFIG_DIR"
chmod 755 "$CONFIG_DIR"

# Default config
if [ ! -f "$CONFIG_DIR/config.json" ]; then
  cat > "$CONFIG_DIR/config.json" << EOF
{
  "theme": "dark",
  "auto_telegram": true,
  "performance_mode": "auto",
  "first_run": true
}
EOF
fi

# First install: open Telegram channel
ui_print "- Opening Telegram channel..."
am start -a android.intent.action.VIEW -d "https://t.me/uwEspresso" >/dev/null 2>&1 || true

ui_print " "
ui_print "✓ Installation complete!"
ui_print "✓ Join our channel: t.me/uwEspresso"
ui_print "✓ Open WebUI from module action or KSU/APatch manager"
ui_print " "
ui_print "Supported: Magisk, Magisk Delta, KernelSU, KSU Next,"
ui_print "           APatch, SukiSU and more"
ui_print " "
