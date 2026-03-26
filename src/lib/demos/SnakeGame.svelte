<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const CELL = 20;
	const COLS = 20;
	const ROWS = 20;
	const W = CELL * COLS;
	const H = CELL * ROWS;

	type Dir = 'up' | 'down' | 'left' | 'right';
	type Pt = { x: number; y: number };

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let snake = $state<Pt[]>([{ x: 10, y: 10 }]);
	let food = $state<Pt>({ x: 15, y: 10 });
	let score = $state(0);
	let best = $state(0);
	let gameState = $state<'idle' | 'running' | 'over'>('idle');

	let dir: Dir = 'right';
	let nextDir: Dir = 'right';
	let intervalId: ReturnType<typeof setInterval> | null = null;

	function randomFood(s: Pt[]): Pt {
		let pos: Pt;
		do {
			pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
		} while (s.some((p) => p.x === pos.x && p.y === pos.y));
		return pos;
	}

	function start() {
		snake = [
			{ x: 10, y: 10 },
			{ x: 9, y: 10 },
			{ x: 8, y: 10 }
		];
		dir = 'right';
		nextDir = 'right';
		food = randomFood(snake);
		score = 0;
		gameState = 'running';
		if (intervalId) clearInterval(intervalId);
		intervalId = setInterval(tick, 140);
	}

	function tick() {
		dir = nextDir;
		const head = snake[0];
		const nx = head.x + (dir === 'right' ? 1 : dir === 'left' ? -1 : 0);
		const ny = head.y + (dir === 'down' ? 1 : dir === 'up' ? -1 : 0);

		if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS || snake.some((s) => s.x === nx && s.y === ny)) {
			if (intervalId) clearInterval(intervalId);
			intervalId = null;
			if (score > best) best = score;
			gameState = 'over';
			draw();
			return;
		}

		const ate = nx === food.x && ny === food.y;
		snake = [{ x: nx, y: ny }, ...snake.slice(0, ate ? snake.length : snake.length - 1)];
		if (ate) {
			score++;
			food = randomFood(snake);
		}
		draw();
	}

	function draw() {
		if (!ctx) return;
		ctx.fillStyle = '#050914';
		ctx.fillRect(0, 0, W, H);

		// Grid
		ctx.strokeStyle = 'rgba(30,41,59,0.6)';
		ctx.lineWidth = 0.5;
		for (let i = 0; i <= COLS; i++) {
			ctx.beginPath();
			ctx.moveTo(i * CELL, 0);
			ctx.lineTo(i * CELL, H);
			ctx.stroke();
		}
		for (let i = 0; i <= ROWS; i++) {
			ctx.beginPath();
			ctx.moveTo(0, i * CELL);
			ctx.lineTo(W, i * CELL);
			ctx.stroke();
		}

		// Food
		ctx.fillStyle = '#f43f5e';
		ctx.shadowColor = '#f43f5e';
		ctx.shadowBlur = 8;
		ctx.beginPath();
		ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.shadowBlur = 0;

		// Snake
		snake.forEach((seg, i) => {
			if (i === 0) {
				ctx.fillStyle = '#22d3ee';
				ctx.shadowColor = '#22d3ee';
				ctx.shadowBlur = 10;
			} else {
				const alpha = Math.max(0.3, 1 - (i / snake.length) * 0.7);
				ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
				ctx.shadowBlur = 0;
			}
			ctx.beginPath();
			(ctx as CanvasRenderingContext2D & { roundRect: (x: number, y: number, width: number, height: number, radius: number) => void }).roundRect(
				seg.x * CELL + 1,
				seg.y * CELL + 1,
				CELL - 2,
				CELL - 2,
				4
			);
			ctx.fill();
		});
		ctx.shadowBlur = 0;
	}

	function onKey(e: KeyboardEvent) {
		if (gameState !== 'running') return;
		const map: Partial<Record<string, Dir>> = {
			ArrowUp: 'up',
			ArrowDown: 'down',
			ArrowLeft: 'left',
			ArrowRight: 'right',
			w: 'up',
			s: 'down',
			a: 'left',
			d: 'right'
		};
		const nd = map[e.key];
		if (!nd) return;
		const opp: Record<Dir, Dir> = { up: 'down', down: 'up', left: 'right', right: 'left' };
		if (opp[nd] !== dir) {
			nextDir = nd;
			e.preventDefault();
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		draw();
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<svelte:window onkeydown={onKey} />

<div class="flex flex-col items-center gap-3 select-none">
	<div class="flex items-center justify-between w-full max-w-[400px]">
		<span class="text-sm font-mono text-slate-500 dark:text-slate-400">
			Score: <span class="text-cyan-500 dark:text-cyan-400 font-semibold">{score}</span>
		</span>
		<span class="text-sm font-mono text-slate-500 dark:text-slate-400">
			Best: <span class="text-violet-500 dark:text-violet-400 font-semibold">{best}</span>
		</span>
	</div>

	<div class="relative">
		<canvas
			bind:this={canvas}
			width={W}
			height={H}
			class="rounded-xl border border-slate-300 dark:border-slate-800 block"
		></canvas>

		{#if gameState !== 'running'}
			<div
				class="absolute inset-0 flex flex-col items-center justify-center rounded-xl"
				style="background: rgba(5,9,20,0.85); backdrop-filter: blur(2px);"
			>
				{#if gameState === 'over'}
					<p class="text-white text-xl font-bold mb-1">Game Over</p>
					<p class="text-slate-400 text-sm mb-5">You scored <span class="text-cyan-400">{score}</span></p>
				{:else}
					<p class="text-white text-xl font-bold mb-1">Snake</p>
					<p class="text-slate-500 text-xs mb-5 font-mono">Arrow keys or WASD</p>
				{/if}
				<button
					onclick={start}
					class="px-7 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105 active:scale-100"
					style="background: linear-gradient(135deg, #0891b2, #7c3aed);"
				>
					{gameState === 'over' ? 'Play Again' : 'Start Game'}
				</button>
			</div>
		{/if}
	</div>
</div>
