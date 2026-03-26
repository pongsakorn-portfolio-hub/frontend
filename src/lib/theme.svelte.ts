import { browser } from '$app/environment';

function createTheme() {
	let dark = $state(true);

	function init() {
		if (!browser) return;
		const stored = localStorage.getItem('theme');
		dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	function toggle() {
		dark = !dark;
		if (browser) localStorage.setItem('theme', dark ? 'dark' : 'light');
	}

	return {
		get dark() {
			return dark;
		},
		init,
		toggle
	};
}

export const theme = createTheme();
