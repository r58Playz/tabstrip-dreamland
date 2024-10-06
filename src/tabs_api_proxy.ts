import { Tab, TabGroupVisualData, PageCallbackRouter } from "./tab_strip.mojom-webui.js";

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

export class TabsApiProxyImpl implements TabsApiProxy {

}
