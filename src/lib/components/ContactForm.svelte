<script lang="ts">
	import { z } from 'zod';
	
	interface Props {
		onSuccess?: () => void;
	}
	
	let { onSuccess }: Props = $props();
	
	const contactSchema = z.object({
		name: z.string().min(2, 'Name must be at least 2 characters'),
		email: z.string().email('Please enter a valid email'),
		message: z.string().min(10, 'Message must be at least 10 characters')
	});
	
	type ContactForm = z.infer<typeof contactSchema>;
	
	let form = $state<ContactForm>({
		name: '',
		email: '',
		message: ''
	});
	
	let errors = $state<Partial<ContactForm>>({});
	let isSubmitting = $state(false);
	let submitMessage = $state('');
	let submitError = $state('');
	
	async function handleSubmit(event: Event) {
		event.preventDefault();
		errors = {};
		submitMessage = '';
		submitError = '';
		
		// Validate form
		try {
			contactSchema.parse(form);
		} catch (error) {
			if (error instanceof z.ZodError) {
				errors = error.errors.reduce((acc, curr) => {
					if (curr.path[0]) {
						acc[curr.path[0] as keyof ContactForm] = curr.message;
					}
					return acc;
				}, {} as Partial<ContactForm>);
			}
			return;
		}
		
		// Submit form
		isSubmitting = true;
		
		try {
			// TODO: Replace with your preferred form service
			// Example: Formspree, EmailJS, Netlify Forms, etc.
			
			// For now, just simulate a successful submission
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Reset form
			form = { name: '', email: '', message: '' };
			submitMessage = 'Thank you for your message! I\'ll get back to you soon.';
			
			// Call success callback after a delay
			if (onSuccess) {
				setTimeout(onSuccess, 2000);
			}
		} catch (error) {
			submitError = 'Failed to send message. Please try again later.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form onsubmit={handleSubmit} class="space-y-6">
	{#if submitMessage}
		<div class="rounded-md bg-green-50 p-4">
			<p class="text-sm text-green-800">{submitMessage}</p>
		</div>
	{/if}
	
	{#if submitError}
		<div class="rounded-md bg-red-50 p-4">
			<p class="text-sm text-red-800">{submitError}</p>
		</div>
	{/if}
	
	<div>
		<label for="name" class="block text-sm font-medium text-gray-700">
			Name
		</label>
		<input
			type="text"
			id="name"
			bind:value={form.name}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {errors.name ? 'border-red-300' : ''}"
			disabled={isSubmitting}
		/>
		{#if errors.name}
			<p class="mt-1 text-sm text-red-600">{errors.name}</p>
		{/if}
	</div>
	
	<div>
		<label for="email" class="block text-sm font-medium text-gray-700">
			Email
		</label>
		<input
			type="email"
			id="email"
			bind:value={form.email}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {errors.email ? 'border-red-300' : ''}"
			disabled={isSubmitting}
		/>
		{#if errors.email}
			<p class="mt-1 text-sm text-red-600">{errors.email}</p>
		{/if}
	</div>
	
	<div>
		<label for="message" class="block text-sm font-medium text-gray-700">
			Message
		</label>
		<textarea
			id="message"
			bind:value={form.message}
			rows="4"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm {errors.message ? 'border-red-300' : ''}"
			disabled={isSubmitting}
		></textarea>
		{#if errors.message}
			<p class="mt-1 text-sm text-red-600">{errors.message}</p>
		{/if}
	</div>
	
	<button
		type="submit"
		disabled={isSubmitting}
		class="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
	>
		{isSubmitting ? 'Sending...' : 'Send Message'}
	</button>
</form>