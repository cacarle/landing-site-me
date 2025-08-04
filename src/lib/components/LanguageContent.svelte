<script lang="ts">
	import { languageStore, type Language } from '$lib/stores/language.svelte';
	import { fade } from 'svelte/transition';
	
	interface Props {
		content: Record<Language, {
			text?: string;
			image?: string;
			imageAlt?: string;
		}>;
		class?: string;
	}
	
	let { content, class: className = '' }: Props = $props();
	
	let language = $derived(languageStore.current);
	let currentContent = $derived(content[language]);
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
		
		{#key language}
			{#if currentContent.text}
				<div class="language-text" in:fade={{ duration: 300 }}>
					{currentContent.text}
				</div>
			{/if}
		{/key}
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
		gap: 1.5rem;
	}
	
	.language-image {
		width: 200px;
		height: 200px;
		object-fit: cover;
		border-radius: 50%;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}
	
	.language-text {
		text-align: center;
		font-size: 1.125rem;
		line-height: 1.75rem;
		padding: 0 1rem;
		color: white;
	}
	
	@media (min-width: 640px) {
		.language-text {
			font-size: 1.25rem;
			line-height: 1.75rem;
			white-space: nowrap;
		}
	}
</style>