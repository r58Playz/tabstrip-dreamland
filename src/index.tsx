import '../chrome/out/tab_list.js';
import { TabNetworkState } from '../chrome/out/tab_strip.mojom-webui.js';
import { TabsApiProxyImpl } from '../chrome/out/tabs_api_proxy.js';

export class TabsController {
}

const Tabs: Component<{ controller: TabsApiProxyImpl }, {}> = function() {
	this.controller = TabsApiProxyImpl.createInstance(() => true);
	// @ts-ignore DREAMLAND_SECRET_DEV_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
	this._leak = true;

	const handleResize =
		() => this.controller.setLayout({ "--tabstrip-viewport-width": window.innerWidth + "px" });

	handleResize()
	window.addEventListener("resize", handleResize);

	const cssClass = css`
		--google-grey-50-rgb: 248, 249, 250;
		--google-grey-200-rgb: 232, 234, 237;
		--google-grey-300-rgb: 218, 220, 224;
		--google-grey-800-rgb: 60, 64, 67;
		--google-grey-900-rgb: 32, 33, 36;
		--google-blue-300-rgb: 138, 180, 248;
		--google-blue-500-rgb: 66, 133, 244;

		--color-web-ui-tab-strip-background: var(--tabstrip-background);
		--color-web-ui-tab-strip-focus-outline: var(--tabstrip-focus-outline);
		--color-web-ui-tab-strip-indicator-capturing: var(--tabstrip-indicator-capturing);
		--color-web-ui-tab-strip-indicator-pip: var(--tabstrip-indicator-pip);
		--color-web-ui-tab-strip-indicator-recording: var(--tabstrip-indicator-recording);
		--color-web-ui-tab-strip-scrollbar-thumb: var(--tabstrip-scrollbar-thumb);
		--color-web-ui-tab-strip-tab-active-title-background: var(--tabstrip-tab-active-background);
		--color-web-ui-tab-strip-tab-active-title-content: var(--tabstrip-tab-active-content);
		--color-web-ui-tab-strip-tab-background: var(--tabstrip-tab-background);
		--color-web-ui-tab-strip-tab-blocked: var(--tabstrip-tab-blocked);
		--color-web-ui-tab-strip-tab-loading-spinning: var(--tabstrip-tab-loading);
		--color-web-ui-tab-strip-tab-separator: var(--tabstrip-tab-separator);
		--color-web-ui-tab-strip-tab-text: var(--tabstrip-tab-text);
		--color-web-ui-tab-strip-tab-waiting-spinning: var(--tabstrip-tab-spinning);

		--tabstrip-tab-list-vertical-padding: var(--tabstrip-tab-list-vertical-padding, 16px);
		--tabstrip-tab-title-height: var(--tabstrip-tab-title-height, 40px);

		--tabstrip-tab-thumbnail-width: 120px;
		--tabstrip-tab-thumbnail-height: 120px;
		--tabstrip-tab-thumbnail-aspect-ratio: 1;


		background: var(--color-web-ui-tab-strip-background);
        height: 100%;
        margin: 0;
        overflow: hidden;
        padding: 0;
        width: 100%;
		::-webkit-scrollbar {
			display: block;
			height: 4px;
		}

		::-webkit-scrollbar-track,
		::-webkit-scrollbar,
		::-webkit-scrollbar-track-piece {
			background: var(--color-web-ui-tab-strip-background);
		}

		::-webkit-scrollbar-thumb {
			background: var(--color-web-ui-tab-strip-scrollbar-thumb);
			border-inline-end: solid 16px var(--color-web-ui-tab-strip-background);
			border-inline-start:
				solid 16px var(--color-web-ui-tab-strip-background);
		}
	`;

	return (
		<div class={cssClass}>
			<tabstrip-tab-list />
		</div>
	)
}

export default Tabs;
export { TabNetworkState };
