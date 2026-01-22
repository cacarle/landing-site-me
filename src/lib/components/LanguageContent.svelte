<script lang="ts">
	import { onMount } from 'svelte';
	import { languageStore, type Language } from '$lib/stores/language.svelte';

	interface Props {
		content: Record<Language, {
			texts?: string[];
			image?: string;
			imageAlt?: string;
		}>;
		class?: string;
	}

	let { content, class: className = '' }: Props = $props();

	let language = $derived(languageStore.current);
	let currentContent = $derived(content[language]);

	// Text cycling state
	let textIndex = $state(0);

	// Reset textIndex when language changes
	$effect(() => {
		language; // track language dependency
		textIndex = 0;
	});

	// Set up interval for text cycling
	onMount(() => {
		const intervalId = setInterval(() => {
			const textsLength = currentContent.texts?.length || 1;
			textIndex = (textIndex + 1) % textsLength;
		}, 5000);

		return () => clearInterval(intervalId);
	});
</script>

<div class="language-content {className}">
	<div class="content-wrapper">
		{#if currentContent.image}
			<img 
				src={currentContent.image} 
				alt={currentContent.imageAlt || ''} 
				class="language-image"
			/>
		{/if}
		
		<div class="text-container">
			{#if currentContent.texts}
				{#each currentContent.texts as text, i}
					<div class="language-text" class:active={i === textIndex}>
						{text}
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.language-content {
		position: relative;
	}
	
	.content-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2.5rem;
	}
	
	.language-image {
		width: 280px;
		height: 280px;
		object-fit: cover;
		border-radius: 50%;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}

	@media (min-width: 640px) {
		.language-image {
			width: 320px;
			height: 320px;
		}
	}
	
	.text-container {
		position: relative;
		min-height: 3.5rem;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.language-text {
		position: absolute;
		text-align: center;
		font-size: 1.125rem;
		line-height: 1.75rem;
		padding: 0 1rem;
		color: white;
		width: 100%;
		opacity: 0;
		transition: opacity 1s ease-in-out;
	}

	.language-text.active {
		opacity: 1;
	}

	@media (min-width: 640px) {
		.language-text {
			font-size: 1.25rem;
			line-height: 1.75rem;
		}
	}
</style>