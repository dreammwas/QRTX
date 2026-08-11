#!/system/bin/sh
#
# QRTX Module by DREAM_WAS — v1.0.2
#

SKIPUNZIP=1

ui_print " "
ui_print "╔══════════════════════════════════╗"
ui_print "║         Q R T X  v1.0.2          ║"
ui_print "║         by DREAM_WAS             ║"
ui_print "╚══════════════════════════════════╝"
ui_print " "

ui_print "- Extracting module files..."
unzip -o "$ZIPFILE" -x 'META-INF/*' -d $MODPATH >&2

set_perm_recursive $MODPATH 0 0 0755 0644
set_perm $MODPATH/service.sh 0 0 0755
set_perm $MODPATH/action.sh 0 0 0755
set_perm $MODPATH/uninstall.sh 0 0 0755
[ -d $MODPATH/system/bin ] && set_perm_recursive $MODPATH/system/bin 0 0 0755 0755
[ -f $MODPATH/system/bin/qrtx ] && set_perm $MODPATH/system/bin/qrtx 0 0 0755

CONFIG_DIR="/data/adb/.config/qrtx"
mkdir -p "$CONFIG_DIR"
chmod 755 "$CONFIG_DIR"

if [ ! -f "$CONFIG_DIR/config.json" ]; then
  cat > "$CONFIG_DIR/config.json" << JSON
{
  "theme": "dark",
  "auto_telegram": true,
  "performance_mode": "auto",
  "first_run": true,
  "apply_on_boot": true
}
JSON
fi

if [ ! -f "$CONFIG_DIR/mode" ]; then
  echo "auto" > "$CONFIG_DIR/mode"
fi

ui_print "- Opening Telegram channel..."
am start -a android.intent.action.VIEW -d "https://t.me/uwEspresso" >/dev/null 2>&1 || true

ui_print " "
ui_print "✓ QRTX v1.0.2 installed"
ui_print "✓ Modes: Lite / Auto / Performance / Battery"
ui_print "✓ Open WebUI to control modes"
ui_print "✓ Channel: t.me/uwEspresso"
ui_print " "
