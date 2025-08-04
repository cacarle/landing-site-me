<script lang="ts">
	import ContactForm from '$lib/components/ContactForm.svelte';
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import LanguageCycler from '$lib/components/LanguageCycler.svelte';
	import LanguageContent from '$lib/components/LanguageContent.svelte';
	import type { Language } from '$lib/stores/language.svelte';
	
	let showContactForm = $state(false);
	let showBlogMessage = $state(false);
	
	const languageContent: Record<Language, {
		text: string;
		image: string;
		imageAlt: string;
	}> = {
		es: {
			text: 'Wanabi programador y cripto-economista nocturno 🇵🇷',
			image: '/images/profile.jpg',
			imageAlt: 'House of Carle en Puerto Rico'
		},
		en: {
			text: 'I indulge in late-night coding and crypto mumbo jumbo 🇵🇷',
			image: '/images/profile.jpg',
			imageAlt: 'House of Carle formal portrait'
		},
		zh: {
			text: '白天写代码，晚上研究加密经济 🇵🇷',
			image: '/images/profile.jpg',
			imageAlt: 'House of Carle 在中国'
		}
	};
</script>

<svelte:head>
	<title>Carlos Carle</title>
	<meta name="description" content="Carlos Carle - Connecting through research, investments, projects, and ideas from Puerto Rico." />
</svelte:head>

<section class="relative min-h-screen overflow-hidden" style="background-color: #0a0a0a;">
	<!-- Particle Background -->
	<ParticleBackground />
	
	<!-- Background pattern -->
	<div class="absolute inset-0 bg-grid-pattern opacity-10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
	
	<div class="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
		<!-- Main Content -->
		<div class="text-center">
			<h1 class="mb-12 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
				Carlos Carle
			</h1>
			
			<!-- Language Content with Cycler -->
			<div class="mx-auto max-w-2xl mb-12">
				<div class="flex flex-col items-center">
					<LanguageContent 
						content={languageContent} 
						class="mb-2"
					/>
					
					<!-- Language Cycler positioned after the text with right alignment -->
					<div class="w-full max-w-lg flex justify-end px-4">
						<LanguageCycler />
					</div>
				</div>
			</div>
			
			<!-- Social Links -->
			<div class="mt-12 mb-8 flex justify-center">
				<SocialLinks size="xl" className="gap-8" />
			</div>
			
			<!-- Action Buttons -->
			<div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<button
					onclick={() => showContactForm = true}
					class="rounded-md bg-white px-6 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					Get in Touch
				</button>
				
				<button
					onclick={() => showBlogMessage = true}
					class="rounded-md border border-gray-600 bg-transparent px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-800"
				>
					Read the Blog
				</button>
			</div>
		</div>
	</div>
	
	<!-- Contact Form Modal -->
	{#if showContactForm}
		<div class="fixed inset-0 z-50 overflow-y-auto">
			<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<!-- Background overlay -->
				<button
					class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					onclick={() => showContactForm = false}
					aria-hidden="true"
				></button>
				
				<!-- Modal panel -->
				<div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
					<div class="absolute right-0 top-0 pr-4 pt-4">
						<button
							type="button"
							onclick={() => showContactForm = false}
							class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							<span class="sr-only">Close</span>
							<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					
					<div class="sm:flex sm:items-start">
						<div class="mt-3 w-full text-center sm:mt-0 sm:text-left">
							<h3 class="text-lg font-semibold leading-6 text-gray-900">
								Get in Touch
							</h3>
							<div class="mt-2">
								<ContactForm onSuccess={() => showContactForm = false} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
	
	<!-- Blog Development Message Modal -->
	{#if showBlogMessage}
		<div class="fixed inset-0 z-50 overflow-y-auto">
			<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<!-- Background overlay -->
				<button
					class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					onclick={() => showBlogMessage = false}
					aria-hidden="true"
				></button>
				
				<!-- Modal panel -->
				<div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
					<div>
						<div class="mt-3 text-center sm:mt-5">
							<h3 class="text-lg font-semibold leading-6 text-gray-900">
								Blog Coming Soon
							</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-500">
									The blog is currently in development. Check back soon!
								</p>
							</div>
						</div>
					</div>
					<div class="mt-5 sm:mt-6">
						<button
							type="button"
							onclick={() => showBlogMessage = false}
							class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Got it
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	.bg-grid-pattern {
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
	}
</style>