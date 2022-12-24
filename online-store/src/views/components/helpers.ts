export function tsQuerySelector(parent: Element | Document, selector: string): Element {
  const element = parent.querySelector(selector);
  if (!element) {
      throw new Error('No such element');
  }
  return element;
}

export function tsQuerySelectorAll(parent: Element | Document, selector: string) {
  const element = parent.querySelectorAll(selector);
  if (!element) {
      throw new Error('No such element');
  }
  return element;
}