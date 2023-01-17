<script lang="ts">
	import '$lib/styles/global.css';
	import '@fontsource/fira-code';
	import '@fontsource/open-sans';

	import Palette from '$lib/components/Palette.svelte';
	import type { ColourSystem } from '$lib/types/colour';
	import { rgbToHex } from '$lib/utilities/colour';

	async function colourName(colourHex: string): Promise<string> {
		const response = await fetch(`https://www.thecolorapi.com/id?hex=${colourHex.slice(1)}`);
		const { name } = await response.json();
		return name.value;
	}

	let colours = [
		{ red: 0, green: 5, blue: 1 },
		{ red: 247, green: 244, blue: 243 },
		{ red: 255, green: 159, blue: 28 },
		{ red: 48, green: 131, blue: 220 },
		{ red: 186, green: 27, blue: 29 },
	];

	let namesPlaceholders = colours.map(() => '...');
	let namesPromise = Promise.all(
		colours.map(({ red, green, blue }) => colourName(rgbToHex({ red, green, blue }))),
	);

	let colourSystem: ColourSystem = 'hex';
</script>

<svelte:head>
	<title>Svelte each demo</title>
	<meta name="description" content="Demo of each " />
</svelte:head>

<header class="header-container">
	<h1>Svelte <code>#each</code>: <code>@const</code> and destructuring</h1>
</header>
<main class="main-container">
	<div class="main-content">
		<h2>Colour Palette</h2>
		<div class="picker">
			<label>
				<input type="radio" bind:group={colourSystem} name="Hex" value={'hex'} />
				Hex</label
			>
			<label>
				<input type="radio" bind:group={colourSystem} name="HSL" value={'hsl'} />
				HSL</label
			>
			<label>
				<input type="radio" bind:group={colourSystem} name="RGB" value={'rgb'} />
				RGB
			</label>
		</div>
		{#await namesPromise}
			<Palette {colours} {colourSystem} names={namesPlaceholders} />
		{:then names}
			<Palette {colours} {colourSystem} {names} />
		{/await}
	</div>
</main>

<style>
	.header-container {
		display: grid;
		background-color: var(--colour-theme);
		border-bottom: var(--spacing-1) solid var(--colour-brand);
		box-shadow: var(--shadow-elevation-medium);
		color: var(--colour-dark);
		height: var(--spacing-24);
		place-content: center;
	}

	.main-container {
		background-color: var(--colour-dark);
		box-shadow: var(--shadow-elevation-medium);
		border-radius: var(--spacing-4);
		color: var(--colour-light);
		width: min(100% - var(--spacing-12), var(--max-width-wrapper));
		margin: var(--spacing-18) auto;
		padding: var(--spacing-12);
		font-size: var(--font-size-3);
	}

	.main-content {
		margin: var(--spacing-6);
		padding: var(--spacing-2) var(--spacing-12) var(--spacing-6);
		background-color: var(--colour-light);
		border-radius: var(--spacing-1);
		color: var(--colour-dark);
	}
	.picker {
		display: flex;
		justify-content: space-around;
		background-color: var(--colour-dark);
		box-shadow: var(--shadow-elevation-medium);
		color: var(--colour-theme);
		padding: var(--spacing-6);
		border-radius: var(--spacing-2);
		font-size: var(--font-size-3);
	}
</style>
