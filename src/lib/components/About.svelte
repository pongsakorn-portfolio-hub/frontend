<script lang="ts">
	// TODO: แก้ข้อมูลให้เป็นของคุณ
	const bio = [
		"A dedicated Senior Frontend Developer with a passion for continuous learning and a strong commitment to Architectural Excellence. I bring a solution-oriented mindset and a steadfast focus on delivering high-quality, maintainable code. By combining deep expertise in React and Vue.js with a collaborative, team-first approach, I aim to drive collective success. My goal is to further leverage my Full-stack exposure to build robust web solutions, while mentoring team members and consistently elevating software engineering standards."
	];

	const skills: Record<string, string[]> = {
		Frontend: ['TypeScript', 'JavaScript', 'Svelte / SvelteKit', 'React', 'Vue.js', 'Tailwind CSS', 'Vite'],
		Backend: ['Node.js', 'Nest.js', 'WebSockets', 'PHP', 'CodeIgniter'],
		Database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma'],
		Ai: ['RAG (Retrieval-Augmented Generation)', 'Ollama'],
		DevOps: ['Docker', 'GitHub Actions', 'Linux', 'Kubernetes']
	};

	const stats = [
		{ value: '8', label: 'Years Experience' },
		{ value: '10+', label: 'Projects Built' },
		{ value: '∞', label: 'Cups of Coffee' }
	];
</script>

<section id="about" class="py-24 px-6">
	<div class="max-w-6xl mx-auto">
		<div class="mb-14">
			<p class="font-mono text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-2">Who I am</p>
			<h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">About Me</h2>
		</div>

		<div class="grid md:grid-cols-2 gap-16">
			<!-- Bio -->
			<div>
				<div class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
					{#each bio as paragraph (paragraph)}
						<p>{paragraph}</p>
					{/each}
				</div>

				<!-- Stats -->
				<div class="grid grid-cols-3 gap-4">
					{#each stats as stat (stat.value)}
						<div class="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none rounded-xl p-4 text-center">
							<div
								class="text-2xl font-black bg-clip-text text-transparent"
								style="background-image: linear-gradient(135deg, #0891b2, #a78bfa);"
							>
								{stat.value}
							</div>
							<div class="text-xs text-slate-500 mt-1">{stat.label}</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Skills -->
			<div class="space-y-6">
				{#each Object.entries(skills) as [category, items] (category)}
					<div>
						<h3 class="font-mono text-xs text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-3">{category}</h3>
						<div class="flex flex-wrap gap-2">
							{#each items as skill (skill)}
								<span
									class="text-sm px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-400/50 dark:hover:border-cyan-500/30 hover:text-slate-900 dark:hover:text-white transition-colors"
								>
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
