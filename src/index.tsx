import '../chrome/out/tab_list.js';
import { TabNetworkState } from '../chrome/out/tab_strip.mojom-webui.js';
import { TabsApiProxyImpl } from '../chrome/out/tabs_api_proxy.js';

export class TabsController {
}

const Tabs: Component<{ controller: TabsApiProxyImpl }, {}> = function() {
	this.controller = TabsApiProxyImpl.createInstance(() => true);
	return (
		<div>
			<tabstrip-tab-list />
		</div>
	)
}

export default Tabs;
export { TabNetworkState };
