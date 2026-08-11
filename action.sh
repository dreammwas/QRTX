#!/system/bin/sh
#
# QRTX Action Script - Launch WebUI
#

MODID=qrtx

# MMRL / WebUI X
if [ -n "$MMRL" ]; then
  echo "- Please open QRTX WebUI from the module card."
  exit 0
fi

# Try common WebUI launchers
if pm path com.dergoogler.mmrl.wx >/dev/null 2>&1; then
  am start -n "com.dergoogler.mmrl.wx/.ui.activity.webui.WebUIActivity" -e MOD_ID "$MODID"
  exit 0
fi

if pm path com.dergoogler.mmrl.webuix >/dev/null 2>&1; then
  am start -n "com.dergoogler.mmrl.webuix/.ui.activity.webui.WebUIActivity" -e MOD_ID "$MODID"
  exit 0
fi

if pm path io.github.a13e300.ksuwebui >/dev/null 2>&1; then
  am start -n "io.github.a13e300.ksuwebui/.WebUIActivity" -e id "$MODID"
  exit 0
fi

# Fallback: open Telegram + message
echo "! Install WebUI-X or KsuWebUI for best experience"
am start -a android.intent.action.VIEW -d "https://t.me/uwEspresso" >/dev/null 2>&1
sleep 1
echo "Channel opened. Install WebUI-X from GitHub for full WebUI support."
exit 0
