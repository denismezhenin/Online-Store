import { tsQuerySelector, tsQuerySelectorAll } from "./helpers";
import { setQueryParam } from '../pages/main/queryParams';
import productItems from "./productJSON";
import { IProduct, Query } from "./constants";
import { ProductJSON } from "./constants";


export const rangeContainer = document.getElementsByClassName('range');
const rangeAttribute = [Query.price, Query.stock]
const getRangeValues = (data: ProductJSON, category: string) => {
  const set = new Set();
  const array: Array<IProduct> = data.products; 
  for (let item of array) {
    set.add(item[category as keyof IProduct])
  }
  let arr = Array.from(set)
  let sortArr = arr.sort((a, b) => Number(a) - Number(b))
  return sortArr
}

export const setRangeValues = (priceMin: number, priceMax: number, quantityMin: number, quantityMax: number) => {
  const minsText = tsQuerySelectorAll(document, '.range-values__min')
  const maxText = tsQuerySelectorAll(document, '.range-values__max');
  const minsRange = tsQuerySelectorAll(document, '.min-value')
  const maxRange = tsQuerySelectorAll(document, '.max-value');
  if (minsText) {
    [minsText[0].textContent, minsText[1].textContent] = [`${priceMin}`, `${quantityMin}`];
    [(minsRange[0] as HTMLInputElement).value, (minsRange[1] as HTMLInputElement).value] = [`${pricesArray.indexOf(priceMin)}`, `${stockArray.indexOf(quantityMin)}`]
  }
  if (maxText) {
  [maxText[0].textContent, maxText[1].textContent] = [`${priceMax}`, `${quantityMax}`];
  [(maxRange[0] as HTMLInputElement).value, (maxRange[1] as HTMLInputElement).value] = [`${pricesArray.indexOf(priceMax)}`, `${stockArray.indexOf(quantityMax)}`]
  }
  fillSlider(rangeContainer[0], '#C6C6C6', '#25daa5')
  fillSlider(rangeContainer[1], '#C6C6C6', '#25daa5')
}

export const pricesArray = getRangeValues(productItems, 'price')
export const stockArray = getRangeValues(productItems, 'stock')

export const setRange = (parent: HTMLCollectionOf<Element>) => {
  [...parent].forEach((item, index) => {
    const element = item.querySelector(".range-sliders");
    rangeAbs([...parent][index], element, rangeAttribute[index], productItems)
  })
};

const rangeAbs = (parent: Element, item: any, rangeAtt: string, data: any) => {
  console.log(parent)
  let arr: any;
  if (rangeAtt == 'price') {
    arr = pricesArray
  } if (rangeAtt === 'stock') {
    arr = stockArray
  }
  const rangeValuesArray = getRangeValues(data, rangeAtt)
  const rangeInputs = parent.querySelectorAll('.range-sliders__input');
  // const [ left, right ] = rangeInputs;
  const left = rangeInputs[0] as HTMLInputElement
  const right = rangeInputs[1] as HTMLInputElement
  console.log(left.min)
  console.log(right)
  left.min = '0'
  console.log(left.min)
  // [left.min, left.max] = ([0, arr.length - 1]);
  // [right.min, right.max] = ([0, arr.length - 1]);
  // right.max = String(rangeValuesArray.length - 1);
  // fillSlider(parent, '#C6C6C6', '#25daa5')
  // item.addEventListener('input', (e: Event) => {  
  //   if (!(e.target instanceof HTMLInputElement)) return;
  //   const target = e.target;
  //   if (target == right) {
  //     left.value = String(Math.min(+right.value -1, +left.value));
  //   } else {
  //     right.value = String(Math.max(+left.value +1, +right.value));
  //   }
  //   setQueryParam(`${rangeAtt}-min`, `${arr[(Number(left.value))]}`)
  //   setQueryParam(`${rangeAtt}-max`, `${arr[(Number(right.value))]}`)
  //   fillSlider(parent, '#C6C6C6', '#25daa5')
  // });
};

export const fillSlider = (parent: any, sliderColor: string, rangeColor: string) => {
  const rangeInputs = parent.querySelectorAll('.range-sliders__input');
  const [ left, right ] = rangeInputs;
  const rangeDistance = right.max-right.min;
  const fromPosition = left.value - right.min;
  const toPosition = right.value - right.min;
  right.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
    ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
    ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
    ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
    ${sliderColor} 100%)`;
}
