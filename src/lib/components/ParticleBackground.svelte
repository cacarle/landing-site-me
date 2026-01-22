<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	
	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		color: string;
	}
	
	let canvas: HTMLCanvasElement;
	let particles: Particle[] = [];
	let animationId: number;
	
	// White particles for dark background
	const colors = ['#FFFFFF', '#F3F4F6', '#E5E7EB'];
	
	function createParticle(): Particle {
		return {
			x: Math.random() * (canvas?.width || window.innerWidth),
			y: Math.random() * (canvas?.height || window.innerHeight),
			vx: (Math.random() - 0.5) * 0.5,
			vy: (Math.random() - 0.5) * 0.5,
			size: Math.random() * 3 + 1,
			color: colors[Math.floor(Math.random() * colors.length)]
		};
	}
	
	function initParticles() {
		if (!canvas) return;
		
		const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
		particles = Array.from({ length: particleCount }, createParticle);
	}
	
	function drawParticles(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		particles.forEach((particle, i) => {
			// Update position
			particle.x += particle.vx;
			particle.y += particle.vy;
			
			// Wrap around edges
			if (particle.x < 0) particle.x = canvas.width;
			if (particle.x > canvas.width) particle.x = 0;
			if (particle.y < 0) particle.y = canvas.height;
			if (particle.y > canvas.height) particle.y = 0;
			
			// Draw particle
			ctx.beginPath();
			ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
			ctx.fillStyle = particle.color;
			ctx.globalAlpha = 0.2;
			ctx.fill();
			
			// Draw connections
			particles.slice(i + 1).forEach(otherParticle => {
				const dx = particle.x - otherParticle.x;
				const dy = particle.y - otherParticle.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				if (distance < 120) {
					ctx.beginPath();
					ctx.moveTo(particle.x, particle.y);
					ctx.lineTo(otherParticle.x, otherParticle.y);
					ctx.strokeStyle = particle.color;
					ctx.globalAlpha = 0.03 * (1 - distance / 120);
					ctx.stroke();
				}
			});
		});
		
		ctx.globalAlpha = 1;
	}
	
	function animate() {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		
		drawParticles(ctx);
		animationId = requestAnimationFrame(animate);
	}
	
	function handleResize() {
		if (!canvas) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		initParticles();
	}
	
	onMount(() => {
		if (!browser) return;
		
		handleResize();
		animate();
		
		window.addEventListener('resize', handleResize);
		
		return () => {
			window.removeEventListener('resize', handleResize);
			if (animationId) cancelAnimationFrame(animationId);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none fixed inset-0 z-0"
></canvas>

<style>
	canvas {
		opacity: 0.7;
	}
</style>