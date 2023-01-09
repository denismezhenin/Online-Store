import { IProduct, ProductJSON, Query } from '../../components/constants';
import { tsQuerySelector, tsQuerySelectorAll } from '../../components/helpers'
import productItems from '../../components/productJSON';

const selections = [Query.category, Query.brand];

export const setOptions = () => {
  selections.forEach(item => addOptions(item, item, productItems.products));
}


const addOptions = (parent: string, option: string, data: Array<IProduct>):void => {
  const optionsSet = new Set();
  for (let item of data) {
    optionsSet.add(item[option as keyof IProduct])
  }
  const el = tsQuerySelector(document, `.${parent}`);
  const ul = tsQuerySelector(el, `.selections-variants`);
  for (let value of optionsSet) {
    const li: HTMLElement = document.createElement('li');
    const input: HTMLInputElement = document.createElement('input');
    const label: HTMLLabelElement = document.createElement('label');
    const div: HTMLElement = document.createElement('div');
    const viewCount: HTMLElement = document.createElement('span');
    viewCount.classList.add('selections-variants__count');
    label.classList.add('selections-variants__name')
    li.classList.add('selections-variants__item');

    if (typeof value === 'string') {
      input.id = value.toLocaleLowerCase();
      label.setAttribute('for', value.toLocaleLowerCase());
      label.textContent = value;
    }
    input.type = 'checkbox';
    li.append(input, label, viewCount);
    ul.append(li);
  }
}
