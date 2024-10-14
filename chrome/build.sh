#!/usr/bin/env bash
set -euo pipefail

TAG="131.0.6753.0"

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$SCRIPT_DIR"

download_gitiles() {
	wget -O - "https://chromium.googlesource.com/chromium/src/+/refs/tags/$TAG/$1?format=TEXT" | base64 -d >> "$2"
}

copy_files() {
	cp ../src/icon.ts out/
	cp ../src/tab_strip.mojom-webui.ts out/
	cp ../src/tabs.mojom-webui.ts out/
	cp ../src/tabs_api_proxy.ts out/
}

if [ "${1:-}" == "copyonly" ]; then
	copy_files
	exit
fi

rm -r in out || true
mkdir in in2 grit

wget "https://chromium.googlesource.com/chromium/src/+archive/refs/tags/$TAG/chrome/browser/resources/tab_strip.tar.gz"

cd in || exit 1
tar xvf ../tab_strip.tar.gz
cd .. || exit 1
rm tab_strip.tar.gz

wget "https://chromium.googlesource.com/chromium/src/+archive/refs/tags/$TAG/tools/grit.tar.gz"
cd grit || exit 1
tar xvf ../grit.tar.gz
cd .. || exit 1
rm grit.tar.gz

download_gitiles ui/webui/resources/js/util.ts in/util.ts
cp -r in/* in2/
python3 grit/preprocess_if_expr.py --in-folder in --out-folder in2 --in-files drag_manager.ts tab_list.html util.ts -D linux=true -D chromeos_ash=false -D macosx=false

# maybe extract this from BUILD.gn
python3 html_to_wrapper.py --in_folder in2 --out_folder out --template native --in_files alert_indicator.html alert_indicators.html tab_group.html tab_list.html tab.html

for file in alert_indicator.ts alert_indicators.ts tab_group.ts tab_list.ts tab.ts drag_manager.ts tab_swiper.ts tab_strip.html util.ts; do
	cp "in2/$file" "out/$file"
done

cp -r in/alert_indicators out/

sed -i -e 's/chrome:\/\/resources\/js/./' -e 's/\/\/resources\/js/./' -e '/\.\/strings\.m\.js/d' out/*.ts

download_gitiles ui/webui/resources/js/assert.ts out/assert.ts
echo "// @ts-nocheck" > out/custom_element.ts
download_gitiles ui/webui/resources/js/custom_element.ts out/custom_element.ts
download_gitiles ui/webui/resources/js/event_tracker.ts out/event_tracker.ts
download_gitiles ui/webui/resources/js/focus_outline_manager.ts out/focus_outline_manager.ts
download_gitiles ui/webui/resources/js/load_time_data.ts out/load_time_data.ts
echo "// @ts-nocheck" > out/static_types.ts
download_gitiles ui/webui/resources/js/static_types.ts out/static_types.ts

sed -i '/.*ColorChangeUpdater/d' out/tab_list.ts

copy_files

rm -r in in2 grit
