<script lang="ts">
  import '@fontsource/fira-code';
  import '@fontsource/open-sans';

  import Palette from '$lib/components/Palette.svelte';
  import { rgbToHex } from '$lib/utilities/colour';
  import type { ColourSystem } from '$lib/types/colour';

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
  :global(html) {
    background-color: var(--colour-alt);
    font-family: var(--font-body);
    accent-color: var(--colour-theme);
  }

  :global(body) {
    margin: 0;
    font-weight: var(--font-weight-normal);
  }

  :global(h1) {
    font-size: var(--font-size-6);
    font-weight: var(--font-weight-extrabold);
  }

  :global(h2) {
    font-size: var(--font-size-5);
    font-weight: var(--font-weight-bold);
  }

  :global(code) {
    font-family: Fira Code;
  }

  :global(h1, h2) {
    font-family: var(--font-heading);
  }

  :global(:root) {
    --colour-theme: hsl(35 100% 55%); /* orange peel */
    --colour-brand: hsl(211 71% 53%); /* french blue */
    --colour-alt: hsl(0 0% 87%); /* gainsboro */
    --colour-light: hsl(77 100% 97%); /* ivory */
    --colour-dark: hsl(0 0% 20%); /* jet */

    --spacing-1: 0.25rem;
    --spacing-2: 0.5rem;
    --spacing-4: 1rem;
    --spacing-6: 1.5rem;
    --spacing-12: 3rem;
    --spacing-18: 4.5rem;
    --max-width-wrapper: 48rem;

    --font-size-root: 16px;
    --font-size-3: 1.563rem;
    --font-size-5: 2.441rem;
    --font-size-6: 3.052rem;

    --font-weight-normal: 400;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;

    --font-heading: 'Open Sans';
    --font-body: 'Open Sans';

    /* CREDIT: https://www.joshwcomeau.com/shadow-palette/ */
    --shadow-color: 0deg 6% 60%;
    --shadow-elevation-medium: -1px 1px 1.4px hsl(var(--shadow-color) / 0.51),
      -2.7px 2.7px 3.7px -1.2px hsl(var(--shadow-color) / 0.43),
      -7.6px 7.6px 10.5px -2.3px hsl(var(--shadow-color) / 0.36),
      -20px 20px 27.6px -3.5px hsl(var(--shadow-color) / 0.29);
  }

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
