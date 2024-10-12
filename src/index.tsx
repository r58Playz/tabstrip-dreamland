import '../chrome/out/tab_list.js';
import { TabsApiProxyImpl } from '../chrome/out/tabs_api_proxy.js';

const Tabs: Component<{ controller: TabsApiProxyImpl }, {}> = function() {
	this.controller = TabsApiProxyImpl.createInstance(() => true);
	return (
		<div>
			<tabstrip-tab-list />
		</div>
	)
}

export default Tabs;
