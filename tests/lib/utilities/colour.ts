import type { RGBColour } from '$lib/types/colour';
import { textColourClass } from '$lib/utilities/colour';
import { reset, setup } from '$tests/setup/env';
import { test } from 'uvu';
import assert from 'uvu/assert';

test.before(setup);
test.before.each(reset);

test('it returns expected colour class', () => {
  const blackBackground: RGBColour = { red: 0, green: 0, blue: 0 };
  assert.equal(textColourClass(blackBackground), 'text-light');

  const whiteBackground: RGBColour = { red: 255, green: 255, blue: 255 };
  assert.equal(textColourClass(whiteBackground), 'text-dark');
});

test.run();
