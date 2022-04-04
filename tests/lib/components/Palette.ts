import { render as customRender } from '@testing-library/svelte';
import { test } from 'uvu';
import assert from 'uvu/assert';
import Palette from '$lib/components/Palette.svelte';
import { render, reset, setup } from '$tests/setup/env';

const colours = [
  { red: 0, green: 5, blue: 1 },
  { red: 247, green: 244, blue: 243 },
  { red: 255, green: 159, blue: 28 },
  { red: 48, green: 131, blue: 220 },
  { red: 186, green: 27, blue: 29 },
];

const colourSystem = 'hex';
const names = ['Deep Fir', 'Hint of Red', 'Tree Poppy', 'Curious Blue', 'Thunderbird'];

test.before(setup);
test.before.each(reset);

test('it renders', () => {
  const { container } = render(Palette, { colours, colourSystem, names });

  assert.snapshot(
    container.innerHTML,
    '<section class="colours svelte-45k0bw"><article aria-posinset="1" aria-setsize="5" class="colour text-light svelte-45k0bw" style="background-color: rgb(0, 5, 1);">Deep Fir <span class="colour-code svelte-45k0bw">#000501</span> </article><article aria-posinset="2" aria-setsize="5" class="colour text-dark svelte-45k0bw" style="background-color: rgb(247, 244, 243);">Hint of Red <span class="colour-code svelte-45k0bw">#f7f4f3</span> </article><article aria-posinset="3" aria-setsize="5" class="colour text-dark svelte-45k0bw" style="background-color: rgb(255, 159, 28);">Tree Poppy <span class="colour-code svelte-45k0bw">#ff9f1c</span> </article><article aria-posinset="4" aria-setsize="5" class="colour text-dark svelte-45k0bw" style="background-color: rgb(48, 131, 220);">Curious Blue <span class="colour-code svelte-45k0bw">#3083dc</span> </article><article aria-posinset="5" aria-setsize="5" class="colour text-light svelte-45k0bw" style="background-color: rgb(186, 27, 29);">Thunderbird <span class="colour-code svelte-45k0bw">#ba1b1d</span> </article></section>',
  );
});

test('text colour is altered to maximise contrast', () => {
  const { getByText } = customRender(Palette, { colours, colourSystem, names });
  const $lightText = getByText('Deep Fir');
  assert.is($lightText.className.includes('text-light'), true);

  const $darkText = getByText('Hint of Red');
  assert.is($darkText.className.includes('text-dark'), true);
});

test.run();
