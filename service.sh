#!/system/bin/sh
#
# QRTX Service Script
# Copyright (C) 2026 DREAM_WAS
#

MODDIR=${0%/*}
CONFIG_DIR="/data/adb/.config/qrtx"
LOG="$CONFIG_DIR/qrtx.log"

mkdir -p "$CONFIG_DIR"

# Wait for boot completed
while [ "$(getprop sys.boot_completed)" != "1" ]; do
  sleep 3
done

sleep 5

# Log start
echo "$(date): QRTX service started" >> "$LOG"

# First run telegram (if not done)
if [ -f "$CONFIG_DIR/config.json" ]; then
  FIRST_RUN=$(grep -o '"first_run": *true' "$CONFIG_DIR/config.json" || true)
  if [ -n "$FIRST_RUN" ]; then
    am start -a android.intent.action.VIEW -d "https://t.me/uwEspresso" >/dev/null 2>&1 || true
    # Mark as done
    sed -i 's/"first_run": *true/"first_run": false/' "$CONFIG_DIR/config.json" 2>/dev/null || true
  fi
fi

# Simple performance helper (example tweaks - safe defaults)
# These are basic and reversible. For advanced like Encore, more complex daemon needed.

apply_basic_tweaks() {
  # Example: set a balanced governor if available
  for gov in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
    [ -f "$gov" ] && echo "schedutil" > "$gov" 2>/dev/null || true
  done
}

# Only apply if user enabled (placeholder)
# apply_basic_tweaks

echo "$(date): QRTX service ready" >> "$LOG"
