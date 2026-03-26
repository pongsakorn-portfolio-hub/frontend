<script lang="ts">
	import { onMount } from 'svelte';

	const NAME = 'Pongsakorn Teppitak';
	const TAGLINE = 'I build things for the web — clean, fast, and delightful.';
	const ROLES = ['Senior Frontend Developer', 'UI Craftsman', 'Problem Solver'];

	let displayRole = $state('');
	let showCursor = $state(true);

	onMount(() => {
		let roleIdx = 0;
		let charIdx = 0;
		let isDeleting = false;
		let timerId: ReturnType<typeof setTimeout>;

		const cursorTimer = setInterval(() => (showCursor = !showCursor), 530);

		function type() {
			const role = ROLES[roleIdx];

			if (!isDeleting) {
				displayRole = role.slice(0, ++charIdx);
				if (charIdx === role.length) {
					isDeleting = true;
					timerId = setTimeout(type, 1800);
					return;
				}
			} else {
				displayRole = role.slice(0, --charIdx);
				if (charIdx === 0) {
					isDeleting = false;
					roleIdx = (roleIdx + 1) % ROLES.length;
				}
			}

			timerId = setTimeout(type, isDeleting ? 55 : 105);
		}

		timerId = setTimeout(type, 600);

		return () => {
			clearInterval(cursorTimer);
			clearTimeout(timerId);
		};
	});
</script>

<section
	id="hero"
	class="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
>
	<!-- Background grid -->
	<div
		class="absolute inset-0 opacity-30 dark:opacity-20"
		style="background-image: radial-gradient(circle, #94a3b8 1px, transparent 1px); background-size: 32px 32px;"
	></div>
	<!-- Glow blob -->
	<div
		class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-5 dark:opacity-10 blur-3xl"
		style="background: radial-gradient(ellipse, #06b6d4 0%, #7c3aed 50%, transparent 70%);"
	></div>

	<div class="relative z-10 max-w-4xl w-full text-center md:text-left">
		<p class="font-mono text-cyan-600 dark:text-cyan-400 text-sm mb-4 tracking-widest uppercase">Hello, world —</p>

		<h1 class="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-tight text-slate-900 dark:text-white">
			I'm
			<span
				class="bg-clip-text text-transparent"
				style="background-image: linear-gradient(135deg, #0891b2 0%, #7c3aed 100%);"
			>
				{NAME}
			</span>
		</h1>

		<div class="h-10 flex items-center justify-center md:justify-start mb-6">
			<span class="font-mono text-xl md:text-2xl text-slate-600 dark:text-slate-300">
				{displayRole}<span
					class="inline-block w-0.5 h-6 bg-cyan-500 dark:bg-cyan-400 ml-0.5 align-middle transition-opacity duration-100"
					style="opacity: {showCursor ? 1 : 0};"
				></span>
			</span>
		</div>

		<p class="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed">
			{TAGLINE}
		</p>

		<div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
			<a
				href="#projects"
				class="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-100 shadow-lg shadow-cyan-500/20"
				style="background: linear-gradient(135deg, #0891b2, #7c3aed);"
			>
				View Projects
			</a>
			<a
				href="#chat"
				class="px-8 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-cyan-400/60 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
			>
				Chat with me
			</a>
		</div>

		<!-- Tech badges -->
		<div class="mt-14 flex flex-wrap gap-2 justify-center md:justify-start">
			{#each ['TypeScript', 'React', 'Vue.js', 'Svelte', 'Node.js', 'Nest.js', 'PostgreSQL', 'MongoDB', 'Docker'] as tech (tech)}
				<span class="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50">
					{tech}
				</span>
			{/each}
		</div>
	</div>

	<!-- Scroll hint -->
	<div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600 animate-bounce">
		<span class="text-xs font-mono">scroll</span>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</div>
</section>
