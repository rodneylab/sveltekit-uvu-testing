import { JSDOM } from 'jsdom';
import { SvelteComponent, tick } from 'svelte';

const { window } = new JSDOM('');

export function setup() {
  global.window = window;
  global.document = window.document;
  global.navigator = window.navigator;
  global.getComputedStyle = window.getComputedStyle;
  global.requestAnimationFrame = null;
}

export function reset() {
  window.document.title = '';
  window.document.head.innerHTML = '';
  window.document.body.innerHTML = '';
}

export function render(Tag, props = {}) {
  Tag = Tag.default || Tag;
  const container: HTMLElement = window.document.body;
  const component: SvelteComponent = new Tag({ props, target: container });
  return { container, component };
}

export function fire(elem: HTMLElement, event: string, details: any): Promise<void> {
  const evt = new window.Event(event, details);
  elem.dispatchEvent(evt);
  return tick();
}
