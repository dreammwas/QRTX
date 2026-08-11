#!/system/bin/sh
#
# QRTX Service v1.0.2
#

MODDIR=${0%/*}
CONFIG_DIR="/data/adb/.config/qrtx"
LOG="$CONFIG_DIR/qrtx.log"
MODE_FILE="$CONFIG_DIR/mode"

mkdir -p "$CONFIG_DIR"

while [ "$(getprop sys.boot_completed)" != "1" ]; do
  sleep 3
done
sleep 8

echo "$(date): QRTX service started" >> "$LOG"

# Ensure qrtx is executable
[ -x /system/bin/qrtx ] || chmod 755 "$MODDIR/system/bin/qrtx" 2>/dev/null
export PATH="$MODDIR/system/bin:/system/bin:$PATH"

# First-run Telegram (once)
if [ -f "$CONFIG_DIR/config.json" ]; then
  if grep -q '"first_run": *true' "$CONFIG_DIR/config.json" 2>/dev/null; then
    am start -a android.intent.action.VIEW -d "https://t.me/uwEspresso" >/dev/null 2>&1 || true
    sed -i 's/"first_run": *true/"first_run": false/' "$CONFIG_DIR/config.json" 2>/dev/null || true
  fi
fi

# Load saved mode or default auto
MODE="auto"
[ -f "$MODE_FILE" ] && MODE=$(cat "$MODE_FILE")
[ -z "$MODE" ] && MODE="auto"

# Apply mode
if command -v qrtx >/dev/null 2>&1; then
  qrtx apply "$MODE" >> "$LOG" 2>&1
elif [ -x "$MODDIR/system/bin/qrtx" ]; then
  "$MODDIR/system/bin/qrtx" apply "$MODE" >> "$LOG" 2>&1
else
  echo "$(date): qrtx binary missing" >> "$LOG"
  # fallback update prop
  if [ -f "$MODDIR/module.prop" ]; then
    sed -i 's|^description=.*|description=✗ Not working | qrtx binary missing|' "$MODDIR/module.prop"
  fi
fi

echo "$(date): QRTX service ready (mode=$MODE)" >> "$LOG"

# Lightweight watcher: re-apply when mode file changes
LAST=""
[ -f "$MODE_FILE" ] && LAST=$(cat "$MODE_FILE")
while true; do
  sleep 15
  [ -f "$MODE_FILE" ] || continue
  CUR=$(cat "$MODE_FILE")
  if [ "$CUR" != "$LAST" ] && [ -n "$CUR" ]; then
    LAST="$CUR"
    if command -v qrtx >/dev/null 2>&1; then
      qrtx apply "$CUR" >> "$LOG" 2>&1
    elif [ -x "$MODDIR/system/bin/qrtx" ]; then
      "$MODDIR/system/bin/qrtx" apply "$CUR" >> "$LOG" 2>&1
    fi
  fi
done
