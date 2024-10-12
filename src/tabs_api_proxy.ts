// @ts-ignore
import { loadTimeData } from "./load_time_data.js";
import { Tab, TabGroupVisualData, PageCallbackRouter } from "./tab_strip.mojom-webui.js";

const STRINGS = {
	closeTab: "Close tab",
	defaultTabTitle: "Tab",
	tabGroupIdDataType: "application/group-id",
	tabIdDataType: "application/tab-id",
}

export enum CloseTabAction {
	CLOSE_BUTTON = 0,
	SWIPED_TO_CLOSE = 1,
}

export interface TabsApiProxy {
	activateTab(tabId: number): void;

	/**
	 * @return Object of group IDs as strings mapped to their visual data.
	 */
	getGroupVisualData(): Promise<{ data: { [id: string]: TabGroupVisualData } }>;

	getTabs(): Promise<{ tabs: Tab[] }>;

	closeTab(tabId: number, closeTabAction: CloseTabAction): void;

	groupTab(tabId: number, groupId: string): void;

	moveGroup(groupId: string, newIndex: number): void;

	moveTab(tabId: number, newIndex: number): void;

	setThumbnailTracked(tabId: number, thumbnailTracked: boolean): void;

	ungroupTab(tabId: number): void;

	isVisible(): boolean;

	/**
	 * @return Object with CSS variables as keys and pixel lengths as values
	 */
	getLayout(): Promise<{ layout: { [key: string]: string } }>;

	showEditDialogForGroup(
		groupId: string, locationX: number, locationY: number, width: number,
		height: number): void;

	showTabContextMenu(tabId: number, locationX: number, locationY: number): void;

	showBackgroundContextMenu(locationX: number, locationY: number): void;

	closeContainer(): void;

	/** @param durationMs Activation duration time in ms. */
	reportTabActivationDuration(durationMs: number): void;

	/**
	 * @param tabCount Number of tabs.
	 * @param durationMs Activation duration time in ms.
	 */
	reportTabDataReceivedDuration(tabCount: number, durationMs: number): void;

	/**
	 * @param tabCount Number of tabs.
	 * @param durationMs Creation duration time in ms.
	 */
	reportTabCreationDuration(tabCount: number, durationMs: number): void;

	getCallbackRouter(): PageCallbackRouter;
}

let TABS_PROXY_SINGLETON: TabsApiProxyImpl | null = null;

export class TabsApiProxyImpl extends EventTarget implements TabsApiProxy {
	tabId: number = 0;
	tabs: Map<number, Tab> = new Map();
	callbackRouter: PageCallbackRouter = new PageCallbackRouter();

	visibleHandler: () => boolean;

	constructor(isVisible: () => boolean) {
		super()
		this.visibleHandler = isVisible;
	}

	static createInstance(isVisible: () => boolean): TabsApiProxyImpl {
		if (TABS_PROXY_SINGLETON) throw new Error("TabsApiProxyImpl already created.");

		loadTimeData.data = STRINGS;
		TABS_PROXY_SINGLETON = new TabsApiProxyImpl(isVisible);

		return TABS_PROXY_SINGLETON;
	}

	static getInstance() {
		if (!TABS_PROXY_SINGLETON) throw new Error("No TabsApiProxyImpl created.");
		return TABS_PROXY_SINGLETON;
	}

	dispatch(name: string, data: any) {
		this.dispatchEvent(new CustomEvent(name, { detail: data }));
	}

	addTab(tab: Tab) {
		tab.id = this.tabId;
		this.tabs.set(this.tabId, tab);
		this.tabId++;
		this.callbackRouter.tabCreated.notify(tab);
	}

	// TabsApiProxy

	activateTab(tabId: number): void {
		if (!this.tabs.has(tabId)) throw new Error("Invalid tab.");
		this.dispatch("activate", { tab: tabId });
	}

	/**
	 * @return Object of group IDs as strings mapped to their visual data.
	 */
	async getGroupVisualData(): Promise<{ data: { [id: string]: TabGroupVisualData } }> {
		console.warn("todo: getGroupVisualData");
		return { data: { } };
	}

	async getTabs(): Promise<{ tabs: Tab[] }> {
		return { tabs: Array.from(this.tabs.values()) }
	}

	closeTab(tabId: number, _closeTabAction: CloseTabAction): void {
		if (!this.tabs.has(tabId)) throw new Error("Invalid tab.");
		this.tabs.delete(tabId);
		this.dispatch("removeTab", { tab: tabId });
	}

	groupTab(tabId: number, groupId: string): void {
		throw new Error("todo");
	}

	moveGroup(groupId: string, newIndex: number): void {
		throw new Error("todo");
	}

	moveTab(tabId: number, newIndex: number): void {
		if (!this.tabs.has(tabId)) throw new Error("Invalid tab.");
		this.tabs.get(tabId).index = newIndex;
		this.dispatch("moveTab", { tab: tabId, index: newIndex });
	}

	ungroupTab(tabId: number): void {
		throw new Error("todo");
	}

	isVisible(): boolean {
		return this.visibleHandler();
	}

	/**
	 * @return Object with CSS variables as keys and pixel lengths as values
	 */
	async getLayout(): Promise<{ layout: { [key: string]: string } }> {
		return { layout: {} };
	}

	showEditDialogForGroup(
		groupId: string, locationX: number, locationY: number, width: number,
		height: number
	): void {
		throw new Error("todo");
	}

	showTabContextMenu(tabId: number, locationX: number, locationY: number): void {
		throw new Error("todo");
	}

	showBackgroundContextMenu(locationX: number, locationY: number): void {
		throw new Error("todo");
	}

	getCallbackRouter(): PageCallbackRouter {
		return this.callbackRouter;
	}

	closeContainer(): void {
		// noop
	}

	setThumbnailTracked(tabId: number, thumbnailTracked: boolean): void {
		// noop
	}

	/** @param durationMs Activation duration time in ms. */
	reportTabActivationDuration(durationMs: number): void {
		// noop
	}

	/**
	 * @param tabCount Number of tabs.
	 * @param durationMs Activation duration time in ms.
	 */
	reportTabDataReceivedDuration(tabCount: number, durationMs: number): void {
		// noop
	}

	/**
	 * @param tabCount Number of tabs.
	 * @param durationMs Creation duration time in ms.
	 */
	reportTabCreationDuration(tabCount: number, durationMs: number): void {
		// noop
	}
}
