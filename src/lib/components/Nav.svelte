<script lang="ts">
	import { theme } from '$lib/theme.svelte';

	let scrolled = $state(false);
	let menuOpen = $state(false);

	const links = [
		{ label: 'About', href: '#about' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Chat', href: '#chat' }
	];

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 20);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled
		? 'bg-white/90 dark:bg-[#050914]/90 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800/60'
		: ''}"
>
	<div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
		<a
			href="#hero"
			class="font-mono text-cyan-600 dark:text-cyan-400 font-semibold text-lg tracking-tight hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
		>
			&lt;Jame /&gt;
		</a>

		<!-- Desktop nav -->
		<nav class="hidden md:flex items-center gap-6">
			{#each links as link (link.href)}
				<a
					href={link.href}
					rel="noopener noreferrer external"
					class="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
				>
					{link.label}
				</a>
			{/each}

			<!-- Theme toggle -->
			<button
				onclick={() => theme.toggle()}
				aria-label="Toggle theme"
				class="w-8 h-8 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500 transition-all"
			>
				{#if theme.dark}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<circle cx="12" cy="12" r="5" stroke-width="2" />
						<path
							stroke-linecap="round"
							stroke-width="2"
							d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
						/>
					</svg>
				{:else}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
						/>
					</svg>
				{/if}
			</button>

			<a
				href="#chat"
				class="text-sm px-4 py-1.5 rounded-full border border-cyan-500/50 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-all font-medium"
			>
				Say hi
			</a>
		</nav>

		<!-- Mobile right side -->
		<div class="md:hidden flex items-center gap-2">
			<button
				onclick={() => theme.toggle()}
				aria-label="Toggle theme"
				class="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-all"
			>
				{#if theme.dark}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<circle cx="12" cy="12" r="5" stroke-width="2" />
						<path stroke-linecap="round" stroke-width="2" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
					</svg>
				{:else}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
					</svg>
				{/if}
			</button>

			<button
				class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
				onclick={() => (menuOpen = !menuOpen)}
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if menuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>
	</div>

	{#if menuOpen}
		<div
			class="md:hidden bg-white/95 dark:bg-[#050914]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col gap-4"
		>
			{#each links as link (link.href)}
				<a
					href={link.href}
					rel="noopener noreferrer external"
					class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
					onclick={() => (menuOpen = false)}
				>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</header>
