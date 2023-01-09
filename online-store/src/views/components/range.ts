import { tsQuerySelector, tsQuerySelectorAll } from './helpers';
import { setQueryParam } from '../pages/main/queryParams';
import productItems from './productItems';
import { IProduct, Query, ProductJSON } from './constants';

export const rangeContainer = document.getElementsByClassName('range');
const rangeAttribute = [Query.price, Query.stock];
const getRangeValues = (data: ProductJSON, category: string) => {
  const set = new Set();
  const array: Array<IProduct> = data.products;
  for (const item of array) {
    set.add(item[category as keyof IProduct]);
  }
  const arr = Array.from(set);
  const sortArr = arr.sort((a, b) => Number(a) - Number(b));
  return sortArr;
};

export const setRangeValues = (
  priceMin: number,
  priceMax: number,
  quantityMin: number,
  quantityMax: number
) => {
  const minsText = tsQuerySelectorAll(document, '.range-values__min');
  const maxText = tsQuerySelectorAll(document, '.range-values__max');
  const minsRange = tsQuerySelectorAll(document, '.min-value');
  const maxRange = tsQuerySelectorAll(document, '.max-value');
  if (minsText) {
    [minsText[0].textContent, minsText[1].textContent] = [
      `${priceMin}`,
      `${quantityMin}`,
    ];
    [
      (minsRange[0] as HTMLInputElement).value,
      (minsRange[1] as HTMLInputElement).value,
    ] = [
      `${pricesArray.indexOf(priceMin)}`,
      `${stockArray.indexOf(quantityMin)}`,
    ];
  }
  if (maxText) {
    [maxText[0].textContent, maxText[1].textContent] = [
      `${priceMax}`,
      `${quantityMax}`,
    ];
    [
      (maxRange[0] as HTMLInputElement).value,
      (maxRange[1] as HTMLInputElement).value,
    ] = [
      `${pricesArray.indexOf(priceMax)}`,
      `${stockArray.indexOf(quantityMax)}`,
    ];
  }
  fillSlider(rangeContainer[0], '#C6C6C6', '#25daa5');
  fillSlider(rangeContainer[1], '#C6C6C6', '#25daa5');
};

export const pricesArray = getRangeValues(productItems, 'price');
export const stockArray = getRangeValues(productItems, 'stock');

export const setRange = (parent: HTMLCollectionOf<Element>) => {
  [...parent].forEach((item, index) => {
    const element = tsQuerySelector(item, '.range-sliders');
    rangeAbs([...parent][index], element, rangeAttribute[index], productItems);
  });
};

const rangeAbs = (
  parent: Element,
  element: HTMLElement,
  rangeAtt: string,
  data: ProductJSON
) => {
  const rangeValuesArray = getRangeValues(data, rangeAtt);
  const rangeInputs = parent.querySelectorAll('.range-sliders__input');
  const left: HTMLInputElement = rangeInputs[0] as HTMLInputElement;
  const right = rangeInputs[1] as HTMLInputElement;
  [left.min, left.max] = ['0', String(rangeValuesArray.length - 1)];
  [right.min, right.max] = ['0', String(rangeValuesArray.length - 1)];
  fillSlider(parent, '#C6C6C6', '#25daa5');
  element.addEventListener('input', (e: Event) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const { target } = e;
    if (target == right) {
      left.value = String(Math.min(+right.value - 1, +left.value));
    } else {
      right.value = String(Math.max(+left.value + 1, +right.value));
    }
    setQueryParam(`${rangeAtt}-min`, `${rangeValuesArray[Number(left.value)]}`);
    setQueryParam(
      `${rangeAtt}-max`,
      `${rangeValuesArray[Number(right.value)]}`
    );
    fillSlider(parent, '#C6C6C6', '#25daa5');
  });
};

export const fillSlider = (
  parent: Element,
  sliderColor: string,
  rangeColor: string
) => {
  const rangeInputs = parent.querySelectorAll('.range-sliders__input');
  const left = rangeInputs[0] as HTMLInputElement;
  const right = rangeInputs[1] as HTMLInputElement;
  const rangeDistance = Number(right.max) - Number(right.min);
  const fromPosition = Number(left.value) - Number(right.min);
  const toPosition = Number(right.value) - Number(right.min);
  right.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} 100%)`;
};
