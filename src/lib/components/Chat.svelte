<script lang="ts">
	interface Message {
		role: 'user' | 'assistant';
		content: string;
	}

	let messages = $state<Message[]>([
		{
			role: 'assistant',
			content: "Hi! I'm an AI assistant trained to answer questions about this developer. Ask me anything — their experience, skills, projects, or how to get in touch!"
		}
	]);

	let input = $state('');
	let loading = $state(false);
	let chatEl: HTMLDivElement;

	const SUGGESTIONS = [
		'What technologies do you use?',
		'Tell me about your experience',
		'What projects have you built?',
		'Are you open to work?'
	];

	async function send(text?: string) {
		const msg = (text ?? input).trim();
		if (!msg || loading) return;

		input = '';
		messages = [...messages, { role: 'user', content: msg }];
		loading = true;
		scrollToBottom();

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: msg })
			});

			if (!res.ok) throw new Error('API error');
			const data = await res.json();
			messages = [...messages, { role: 'assistant', content: data.response }];
		} catch {
			messages = [
				...messages,
				{
					role: 'assistant',
					content:
						'Oops — the AI backend is not connected yet. The developer will wire this up soon! In the meantime, feel free to reach out directly.'
				}
			];
		} finally {
			loading = false;
			scrollToBottom();
		}
	}

	function scrollToBottom() {
		setTimeout(() => chatEl?.scrollTo({ top: chatEl.scrollHeight, behavior: 'smooth' }), 50);
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	}
</script>

<section id="chat" class="py-24 px-6">
	<div class="max-w-3xl mx-auto">
		<div class="mb-10">
			<p class="font-mono text-cyan-600 dark:text-cyan-400 text-sm tracking-widest uppercase mb-2">Ask anything</p>
			<h2 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">Chat with Me</h2>
			<p class="text-slate-500 dark:text-slate-400 mt-3">
				Powered by AI — ask about my background, skills, or anything else.
			</p>
		</div>

		<div class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-md dark:shadow-none overflow-hidden">
			<!-- Chat header -->
			<div class="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
				<div class="relative">
					<div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style="background: linear-gradient(135deg, #0891b2, #7c3aed);">
						AI
					</div>
					<span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white dark:border-slate-900"></span>
				</div>
				<div>
					<p class="text-sm font-semibold text-slate-900 dark:text-white">Developer Assistant</p>
					<p class="text-xs text-slate-500">AI-powered · knows everything about me</p>
				</div>
			</div>

			<!-- Messages -->
			<div
				bind:this={chatEl}
				class="h-80 overflow-y-auto px-5 py-5 flex flex-col gap-4 scroll-smooth bg-slate-50/50 dark:bg-transparent"
			>
				{#each messages as msg (msg.content)}
					<div class="flex {msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2">
						{#if msg.role === 'assistant'}
							<div class="w-6 h-6 shrink-0 mt-0.5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style="background: linear-gradient(135deg, #0891b2, #7c3aed);">
								AI
							</div>
						{/if}
						<div
							class="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
								{msg.role === 'user'
									? 'text-white rounded-tr-sm'
									: 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 rounded-tl-sm border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none'}"
							style={msg.role === 'user' ? 'background: linear-gradient(135deg, #0891b2, #7c3aed);' : ''}
						>
							{msg.content}
						</div>
					</div>
				{/each}

				{#if loading}
					<div class="flex justify-start gap-2">
						<div class="w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style="background: linear-gradient(135deg, #0891b2, #7c3aed);">
							AI
						</div>
						<div class="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 shadow-sm dark:shadow-none px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
							<span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
							<span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
							<span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
						</div>
					</div>
				{/if}
			</div>

			<!-- Suggestions -->
			{#if messages.length <= 1}
				<div class="px-5 pb-3 flex flex-wrap gap-2 bg-slate-50/50 dark:bg-transparent">
					{#each SUGGESTIONS as s (s)}
						<button
							onclick={() => send(s)}
							class="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-cyan-400/60 dark:hover:border-cyan-500/40 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
						>
							{s}
						</button>
					{/each}
				</div>
			{/if}

			<!-- Input -->
			<div class="px-5 pb-5 bg-white dark:bg-transparent pt-2">
				<div class="flex gap-2 items-end bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 focus-within:border-cyan-400/60 dark:focus-within:border-cyan-500/40 rounded-xl p-2 transition-colors">
					<textarea
						bind:value={input}
						onkeydown={onKeydown}
						placeholder="Ask me something..."
						rows="1"
						disabled={loading}
						class="flex-1 bg-transparent text-slate-800 dark:text-slate-200 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none resize-none leading-relaxed py-1 px-1 disabled:opacity-50"
					></textarea>
					<button
						onclick={() => send()}
						disabled={!input.trim() || loading}
						aria-label="Send message"
						class="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
						style="background: linear-gradient(135deg, #0891b2, #7c3aed);"
					>
						<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 19V5m0 0l-7 7m7-7l7 7" />
						</svg>
					</button>
				</div>
				<p class="text-xs text-slate-400 dark:text-slate-700 mt-2 text-center font-mono">
					Enter to send &middot; Shift+Enter for newline
				</p>
			</div>
		</div>
	</div>
</section>
