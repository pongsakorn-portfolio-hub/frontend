import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// TODO: Connect your AI backend here.
// Replace this placeholder with your actual AI service integration.
// The request body contains: { message: string }
// The response should be: { response: string }
//
// Example integrations:
// - Claude API (Anthropic)
// - OpenAI
// - Your own LLM backend
// - Langchain / LlamaIndex pipeline

export const POST: RequestHandler = async ({ request }) => {
	const { message } = await request.json();

	// Placeholder — wire up your AI backend
	console.log('Chat message received:', message);

	return json({
		response:
			"The AI backend isn't connected yet — the developer is working on it! Check back soon, or reach out directly via the links below."
	});
};
