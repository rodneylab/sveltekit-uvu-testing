<script lang="ts">
  import { rgbToHex, rgbToHsl, textColourClass } from '$lib/utilities/colour';
  import type { ColourSystem, RGBColour } from '$lib/types/colour';

  export let colours: RGBColour[];
  export let colourSystem: ColourSystem;
  export let names: string[];

  let colourCount = colours.length;
</script>

<section class="colours">
  {#each colours as { red, green, blue }, index}
    {@const hex = rgbToHex({ red, green, blue })}
    {@const hsl = rgbToHsl({ red, green, blue })}
    {@const colourClass = textColourClass({ red, green, blue })}
    <article
      style:background-color={hex}
      aria-posinset={index + 1}
      aria-setsize={colourCount}
      class={`colour ${colourClass}`}
    >
      {names[index]}
      <span class="colour-code">
        {#if colourSystem === 'hex'}
          {hex}
        {:else if colourSystem === 'rgb'}
          rgb({red} {green} {blue})
        {:else}
          {hsl}
        {/if}</span
      >
    </article>
  {/each}
</section>

<style>
  .colours {
    margin: var(--spacing-12) auto;
  }
  .colour {
    text-align: center;
    padding: var(--spacing-6);
    border-radius: var(--spacing-1);
  }
  .colour-code {
    font-weight: var(--font-weight-bold);
  }
  .text-light {
    color: var(--colour-light);
  }
  .text-dark {
    color: var(--colour-dark);
  }
</style>
