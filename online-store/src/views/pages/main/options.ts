/* eslint-disable import/no-named-as-default */
/* eslint-disable no-restricted-syntax */
import { IProduct, Query } from '../../components/constants';
import { tsQuerySelector } from '../../components/helpers';
import productItems from '../../components/productItems';

const selections = [Query.category, Query.brand];

const addOptions = (
  parent: string,
  option: string,
  data: Array<IProduct>
): void => {
  const optionsSet = new Set();
  for (const item of data) {
    optionsSet.add(item[option as keyof IProduct]);
  }
  const el = tsQuerySelector(document, `.${parent}`);
  const ul = tsQuerySelector(el, `.selections-variants`);
  for (const value of optionsSet) {
    const li: HTMLElement = document.createElement('li');
    const input: HTMLInputElement = document.createElement('input');
    const label: HTMLLabelElement = document.createElement('label');
    const viewCount: HTMLElement = document.createElement('span');
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
};
const setOptions = () => {
  selections.forEach((item) => addOptions(item, item, productItems.products));
};
export default setOptions;
