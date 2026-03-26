<script lang="ts">
	import type { Component } from 'svelte';
	import SnakeGame from '$lib/demos/SnakeGame.svelte';

	interface Project {
		id: string;
		title: string;
		description: string;
		tags: string[];
		demo: Component;
		accent: string;
	}

	const projects: Project[] = [
		{
			id: 'snake',
			title: 'Snake Game',
			description: 'Classic snake built with HTML5 Canvas. Use arrow keys or WASD to control the snake. Eat the food to grow — but don\'t hit the walls!',
			tags: ['Canvas API', 'Game Loop', 'TypeScript'],
			demo: SnakeGame,
			accent: '#22d3ee'
		},
	];

	let activeId = $state<string | null>(null);
	let activeProject = $derived(projects.find((p) => p.id === activeId) ?? null);
</script>

<section id="projects" class="py-24 px-6">
	<div class="max-w-6xl mx-auto">
		<div class="mb-14">
			<p class="font-mono text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-2">What I build</p>
			<h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Projects</h2>
			<p class="text-slate-500 dark:text-slate-400 mt-3 max-w-xl">
				Click any project below to launch the interactive demo right here on the page.
			</p>
		</div>

		<!-- Project cards -->
		<div class="grid md:grid-cols-2 gap-5 mb-8">
			{#each projects as project (project.id)}
				{@const isActive = activeId === project.id}
				<button
					onclick={() => (activeId = isActive ? null : project.id)}
					class="text-left p-6 rounded-2xl border transition-all duration-200 group relative overflow-hidden
						{isActive
							? 'bg-white dark:bg-slate-900/80 shadow-md dark:shadow-none'
							: 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-none'}"
					style={isActive ? `border-color: ${project.accent}50;` : ''}
				>
					<!-- Active top line -->
					{#if isActive}
						<div
							class="absolute top-0 left-0 right-0 h-px"
							style="background: linear-gradient(90deg, transparent, {project.accent}, transparent);"
						></div>
					{/if}

					<div class="flex items-start justify-between mb-3">
						<h3 class="font-bold text-slate-900 dark:text-white text-lg">{project.title}</h3>
						<span
							class="text-xs font-mono px-2 py-0.5 rounded-full border transition-all"
							style={isActive
								? `color: ${project.accent}; border-color: ${project.accent}40; background: ${project.accent}10;`
								: 'color: #94a3b8; border-color: #e2e8f0;'}
						>
							{isActive ? 'playing' : 'demo'}
						</span>
					</div>

					<p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>

					<div class="flex flex-wrap gap-1.5">
						{#each project.tags as tag (tag)}
							<span class="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500">{tag}</span>
						{/each}
					</div>
				</button>
			{/each}
		</div>

		<!-- Demo panel -->
		{#if activeProject}
			<div
				class="rounded-2xl border bg-white dark:bg-slate-900/50 shadow-md dark:shadow-none overflow-hidden transition-all"
				style="border-color: {activeProject.accent}30;"
			>
				<!-- Panel header -->
				<div
					class="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-transparent"
					style="background: {activeProject.accent}08;"
				>
					<div class="flex items-center gap-3">
						<div class="w-2 h-2 rounded-full" style="background: {activeProject.accent};"></div>
						<span class="font-mono text-sm font-medium text-slate-800 dark:text-white">{activeProject.title}</span>
					</div>
					<button
						onclick={() => (activeId = null)}
						class="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-mono"
					>
						close ×
					</button>
				</div>

				<!-- Demo area -->
				<div class="p-8 flex justify-center">
					<activeProject.demo />
				</div>
			</div>
		{/if}
	</div>
</section>
