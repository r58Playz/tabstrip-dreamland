export let defaultFavicon = "";

// "Polyfill" for tab.ts.
export function getFavicon(url: string): string {
	return defaultFavicon;
}
