import type { RGBColour } from '$lib/types/colour';

/**
 * Return linear-light or gamma expanded equivalent of 8-bit sinlge R, G or B input
 * @param {number} rgb8Bit - r, g or b 8-bit value (e.g. 225)
 * @returns {number} - the calculated linear-light value
 */
function linearLight(rgb8Bit: number): number {
  const sRgb = rgb8Bit / 255;
  return sRgb <= 0.03928 ? sRgb / 12.92 : Math.pow(sRgb + 0.055 / 1.055, 2.4);
}

/**
 * Returns the number as a padded hex string
 * @param {number} number - decimal number to convert to hex (should be 0 to 255)
 * @returns {string} - zero padded string
 */
function decimalToHex(number: number): string {
  return number.toString(16).padStart(2, '0');
}

/**
 * Returns mathematically expected modulus - different to JS definition for negative numbers
 * @param number {number} - number to apply divisor to
 * @param divisor {number}
 * @returns number - modulus of input number
 */
export function modulus(number: number, divisor: number): number {
  return number < 0 ? ((number % divisor) + divisor) % divisor : number % divisor;
}

/**
 * Returns an RGB code for the input colour
 * @param {RGBColour} inputColour - rgb values 0 to 255
 * @returns {string}
 */
export function rgbToHex({ red, green, blue }: RGBColour): string {
  return `#${decimalToHex(red)}${decimalToHex(green)}${decimalToHex(blue)}`;
}

/**
 * Returns an HSL equivalent code for the input colour
 * @param {RGBColour} inputColour - rgb value 0 to 255
 * @returns {string} - CSS style hsl string
 */
export function rgbToHsl({ red, green, blue }: RGBColour): string {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const cMax = Math.max(r, g, b);
  const cMin = Math.min(r, g, b);
  const chroma = cMax - cMin;

  let hue = 0;
  if (chroma > 1e-6) {
    if (cMax === r) {
      hue = 60 * modulus((g - b) / chroma, 6);
    } else if (cMax === g) {
      hue = 60 * ((b - r) / chroma + 2);
    } else {
      hue = 60 * ((r - g) / chroma + 4);
    }
  }
  const lightness = (cMax + cMin) / 2;
  const saturation =
    lightness === 0 || lightness === 1 ? 0 : chroma / (1 - Math.abs(2 * lightness - 1));

  return `hsl(${hue.toFixed(0)}deg ${(100 * saturation).toFixed(0)}% ${(100 * lightness).toFixed(
    0,
  )}%)`;
}

/**
 * Returns a light or dark text class used to increase contrast between background and text
 * @param {RGBColour} inputColour - rgb values 0 to 255
 * @returns{'text-light'|'text-dark'} - returns a class
 */
export function textColourClass({ red, green, blue }: RGBColour): 'text-light' | 'text-dark' {
  const colourRelativeLuminance =
    0.2126 * linearLight(red) + 0.7152 * linearLight(green) + 0.0722 * linearLight(blue);
  const whiteContrastRatio = 1.05 / (colourRelativeLuminance + 0.05);
  const blackContrastRatio = (colourRelativeLuminance + 0.05) / 0.05;
  return blackContrastRatio > whiteContrastRatio ? 'text-dark' : 'text-light';
}
