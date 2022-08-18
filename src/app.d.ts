/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare global {
	interface ImportMeta {
		env: {
			DEV: boolean;
			PROD: boolean;
			PUBLIC_BUYMEACOFFEE_PAGE: string;
			SSR: boolean;
		};
	}
}
