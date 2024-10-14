import '../chrome/out/tab_list.js';
import { TabNetworkState } from '../chrome/out/tab_strip.mojom-webui.js';
import { TabsApiProxyImpl } from '../chrome/out/tabs_api_proxy.js';

export class TabsController {
}

const Tabs: Component<{ controller: TabsApiProxyImpl }, {}> = function() {
	this.controller = TabsApiProxyImpl.createInstance(() => true);
	// @ts-ignore DREAMLAND_SECRET_DEV_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
	this._leak = true;

	const cssClass = css`
		background: var(--color-web-ui-tab-strip-background);
        height: 100%;
        margin: 0;
        overflow: hidden;
        padding: 0;
        width: 100%;
	`;

	return (
		<div class={cssClass}>
			<tabstrip-tab-list />
		</div>
	)
}

export default Tabs;
export { TabNetworkState };
