<script lang="ts">
	import { languageStore, type Language } from '$lib/stores/language.svelte';
	
	let language = $derived(languageStore.current);
	
	const languageLabels: Record<Language, string> = {
		es: 'ES',
		en: 'EN',
		zh: '中文'
	};
	
	function handleCycle() {
		languageStore.cycle();
	}
	
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			handleCycle();
		}
	}
</script>

<button
	onclick={handleCycle}
	onkeydown={handleKeydown}
	class="language-cycler group relative flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm transition-all hover:bg-white/30 dark:bg-gray-800/20 dark:text-gray-200 dark:hover:bg-gray-800/30"
	aria-label="Cycle language ({languageLabels[language]})"
	title="Change language"
>
	<!-- Cycle Icon -->
	<svg 
		class="h-4 w-4 transition-transform group-hover:rotate-180" 
		fill="none" 
		viewBox="0 0 24 24" 
		stroke="currentColor"
		stroke-width="2"
	>
		<path 
			stroke-linecap="round" 
			stroke-linejoin="round" 
			d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
		/>
	</svg>
	
	<!-- Language Label -->
	<span class="font-semibold">
		{languageLabels[language]}
	</span>
</button>

<style>
	.language-cycler {
		-webkit-tap-highlight-color: transparent;
	}
	
	@media (max-width: 640px) {
		.language-cycler {
			padding: 0.5rem 0.75rem;
		}
	}
</style>