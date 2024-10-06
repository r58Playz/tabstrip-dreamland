#!/usr/bin/env bash
set -euo pipefail

TAG="131.0.6753.0"

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$SCRIPT_DIR"

download_gitiles() {
	wget -O - "https://chromium.googlesource.com/chromium/src/+/refs/tags/$TAG/$1?format=TEXT" | base64 -d > "$2"
}

rm -r in out || true
mkdir in

wget "https://chromium.googlesource.com/chromium/src/+archive/refs/tags/$TAG/chrome/browser/resources/tab_strip.tar.gz"

cd in || exit 1
tar xvf ../tab_strip.tar.gz
cd .. || exit 1
rm tab_strip.tar.gz

# maybe extract this from BUILD.gn
python3 html_to_wrapper.py --in_folder in --out_folder out --template native --in_files alert_indicator.html alert_indicators.html tab_group.html tab_list.html tab.html

for file in alert_indicator.ts alert_indicators.ts tab_group.ts tab_list.ts tab.ts drag_manager.ts tab_swiper.ts tab_strip.html; do
	cp "in/$file" "out/$file"
done

cp -r in/alert_indicators out/

sed -i 's/chrome:\/\/resources\/js/./' out/*.ts
sed -i 's/\/\/resources\/js/./' out/*.ts

download_gitiles ui/webui/resources/js/assert.ts out/assert.ts
download_gitiles ui/webui/resources/js/custom_element.ts out/custom_element.ts
download_gitiles ui/webui/resources/js/event_tracker.ts out/event_tracker.ts
download_gitiles ui/webui/resources/js/focus_outline_manager.ts out/focus_outline_manager.ts
download_gitiles ui/webui/resources/js/load_time_data.ts out/load_time_data.ts
download_gitiles ui/webui/resources/js/static_types.ts out/static_types.ts
download_gitiles ui/webui/resources/js/util.ts out/util.ts

sed -i '/.*ColorChangeUpdater/d' out/tab_list.ts

cp ../src/icon.ts out/
cp ../src/tab_strip.mojom-webui.ts out/
cp ../src/tabs.mojom-webui.ts out/
cp ../src/tabs_api_proxy.ts out/

rm -r in
