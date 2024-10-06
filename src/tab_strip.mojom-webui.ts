import { TabAlertState } from "./tabs.mojom-webui.js"

export type Url = {
	url: string,
}

export enum TabNetworkState {
	kNone,
	kWaiting,
	kLoading,
	kError
}

export type Tab = {
	active: boolean,
	alertStates: TabAlertState[],
	blocked: boolean,
	crashed: boolean,
	faviconUrl?: Url,
	activeFaviconUrl?: Url,
	groupId?: string,
	id: number,
	index: number,
	isDefaultFavicon: boolean,
	networkState: TabNetworkState,
	pinned: boolean,
	shouldHideThrobber: boolean,
	showIcon: boolean,
	title: string,
	url: Url,
}

export type TabGroupVisualData = {
	color: string,
	textColor: string,
	title: string,
}

export class Listener0 {
	listeners: (() => void)[] = [];

	notify() {
		this.listeners.forEach(x => x());
	}

	addListener(listener: () => void) {
		this.listeners.push(listener);
	}
}

export class Listener1<A> {
	listeners: ((arg0: A) => void)[] = [];

	notify(arg0: A) {
		this.listeners.forEach(x => x(arg0));
	}

	addListener(listener: (arg0: A) => void) {
		this.listeners.push(listener);
	}
}

export class Listener2<A, B> {
	listeners: ((arg0: A, arg1: B) => void)[] = [];

	notify(arg0: A, arg1: B) {
		this.listeners.forEach(x => x(arg0, arg1));
	}

	addListener(listener: (arg0: A, arg1: B) => void) {
		this.listeners.push(listener);
	}
}

export class Listener3<A, B, C> {
	listeners: ((arg0: A, arg1: B, arg2: C) => void)[] = [];

	notify(arg0: A, arg1: B, arg2: C) {
		this.listeners.forEach(x => x(arg0, arg1, arg2));
	}

	addListener(listener: (arg0: A, arg1: B, arg2: C) => void) {
		this.listeners.push(listener);
	}
}

export class PageCallbackRouter {
	layoutChanged: Listener1<{ [key: string]: string }> = new Listener1();
	recievedKeyboardFocus: Listener0 = new Listener0();
	contextMenuClosed: Listener0 = new Listener0();
	longPress: Listener0 = new Listener0();
	tabGroupVisualsChanged: Listener2<string, TabGroupVisualData> = new Listener2();
	tabGroupMoved: Listener2<string, number> = new Listener2();
	tabGroupClosed: Listener1<string> = new Listener1();
	tabGroupStateChanged: Listener3<number, number, string> = new Listener3();
	tabCloseCancelled: Listener1<number> = new Listener1();
	tabCreated: Listener1<Tab> = new Listener1();
	tabRemoved: Listener1<number> = new Listener1();
	tabMoved: Listener3<number, number, boolean> = new Listener3();
	tabReplaced: Listener2<number, number> = new Listener2();
	tabActiveChanged: Listener1<number> = new Listener1();
	tabUpdated: Listener1<Tab> = new Listener1();
	tabThumbnailUpdated: Listener2<number, string> = new Listener2();
	showContextMenu: Listener0 = new Listener0();
	themeChanged: Listener0 = new Listener0();
}
