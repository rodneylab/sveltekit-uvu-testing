import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	mode: 'module',
	plugins: [sveltekit()],
};

export default config;
