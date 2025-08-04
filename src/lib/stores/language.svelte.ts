import { browser } from '$app/environment';

export type Language = 'es' | 'en' | 'zh';

class LanguageStore {
	#current = $state<Language>('es');
	
	constructor() {
		if (browser && typeof window !== 'undefined') {
			const stored = localStorage.getItem('language');
			if (stored && this.#isValidLanguage(stored)) {
				this.#current = stored as Language;
			}
		}
	}
	
	get current(): Language {
		return this.#current;
	}
	
	set current(lang: Language) {
		this.#current = lang;
		if (browser) {
			localStorage.setItem('language', lang);
		}
	}
	
	cycle() {
		const languages: Language[] = ['es', 'en', 'zh'];
		const currentIndex = languages.indexOf(this.#current);
		const nextIndex = (currentIndex + 1) % languages.length;
		this.current = languages[nextIndex];
	}
	
	#isValidLanguage(lang: string): boolean {
		return ['es', 'en', 'zh'].includes(lang);
	}
}

export const languageStore = new LanguageStore();