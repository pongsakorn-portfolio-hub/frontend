<script lang="ts">
	const socials = [
		{ label: 'GitHub', href: 'https://github.com/jpongsakorn', icon: 'github' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/pongsakorn-teppitak-344065346', icon: 'linkedin' },
	];

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-slate-200 dark:border-slate-800/60 py-10 px-6">
	<div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
		<div class="text-center md:text-left">
			<p class="font-mono text-cyan-600 dark:text-cyan-400 font-semibold">&lt;Jame /&gt;</p>
			<p class="text-xs text-slate-400 dark:text-slate-600 mt-1">Built with SvelteKit + Tailwind CSS</p>
		</div>

		<div class="flex items-center gap-5">
			{#each socials as social (social.label)}
				<a
					href={social.href}
					target="_blank"
					rel="noopener noreferrer external"
					class="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
				>
					{social.label}
				</a>
			{/each}
		</div>

		<p class="text-xs text-slate-400 dark:text-slate-700 font-mono">&copy; {year}. All rights reserved.</p>
	</div>
</footer>
