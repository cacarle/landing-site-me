<script lang="ts">
	import SocialLinks from '$lib/components/SocialLinks.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import LanguageCycler from '$lib/components/LanguageCycler.svelte';
	import LanguageContent from '$lib/components/LanguageContent.svelte';
	import { languageStore, type Language } from '$lib/stores/language.svelte';

	const greetings: Record<Language, string> = {
		es: 'Hola, me llamo',
		en: "Hey, I'm",
		zh: '你好，我叫'
	};

	let currentGreeting = $derived(greetings[languageStore.current]);

	const languageContent: Record<Language, {
		texts: string[];
		image: string;
		imageAlt: string;
	}> = {
		es: {
			texts: [
				'Ingeniero que crea sistemas para que las operaciones fluyan',
				'Wanabi cripto-economista y programador nocturno 🇵🇷'
			],
			image: '/images/profile.jpg',
			imageAlt: 'House of Carle en Puerto Rico'
		},
		en: {
			texts: [
				'Engineer that builds systems that make operations run',
				'I indulge in late-night coding, spreadsheets, and the occasional macro/crypto rabbit hole 🇵🇷'
			],
			image: '/images/profile.jpg',
			imageAlt: 'House of Carle formal portrait'
		},
		zh: {
			texts: [
				'打造系统，让运营顺畅的工程师',
				'白天写代码，晚上研究加密经济 🇵🇷'
			],
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
			<div class="name-section">
				<span class="greeting">{currentGreeting}</span>
				<h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
					Carlos Carle
				</h1>
			</div>
			
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
			<div class="mt-12 flex justify-center">
				<SocialLinks size="2xl" className="gap-10" />
			</div>
		</div>
	</div>
</section>

<style>
	.bg-grid-pattern {
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
	}

	.name-section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 3rem;
	}

	.greeting {
		color: rgba(255, 255, 255, 0.7);
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}
</style>