import { tsQuerySelector, tsQuerySelectorAll } from "./helpers";
import { setQueryParam } from '../pages/main/queryParams';
import productItems from "./productJSON";
// import { searchItems } from "../pages/main/search";

export const rangeContainer = document.getElementsByClassName('range');
const rangeAttribute = ['price', 'stock']
// const map = new Map()
const getRangeValues = (data: any, category: string) => {
  const set = new Set();
  const array = data.products;
  for (let item of array) {
    set.add(item[category])
  }
  let arr = Array.from(set)
  // console.log(typeof arr[0])
  let sortArr = arr.sort((a, b) => Number(a) - Number(b))
  return sortArr
}

export const pricesArray = getRangeValues(productItems, 'price')
export const stockArray = getRangeValues(productItems, 'stock')

export const setRange = (parent: any) => {
  [...parent].forEach((item, index) => {
    const element = item.querySelector(".range-sliders");
    rangeAbs([...parent][index], element, rangeAttribute[index], productItems)
  })
};

const rangeAbs = (parent: any, item: any, rangeAtt: string, data: any) => {
  let arr: any;
  if (rangeAtt == 'price') {
    arr = pricesArray
  } if (rangeAtt === 'stock') {
    arr = stockArray
  }
  const rangeValuesArray = getRangeValues(data, rangeAtt)
  // console.log(rangeValuesArray)
  const rangeInputs = parent.querySelectorAll('.range-sliders__input');
  const [ left, right ] = rangeInputs;
  [left.min, left.max] = [0, arr.length - 1];
  [right.min, right.max] = [0, arr.length - 1];
  // right.min
  right.max = rangeValuesArray.length - 1;
  fillSlider(parent, '#C6C6C6', '#25daa5')
  item.addEventListener('input', (e: Event) => {  
    if (!(e.target instanceof HTMLInputElement)) return;
    const target = e.target;
    // console.log(target)
    // tsQuerySelector(parent, '.range-values__min').textContent = left.value
    // tsQuerySelector(parent, '.range-values__max').textContent = right.value

    if (target == right) {
      left.value = Math.min(+right.value -1, +left.value);
    } else {
      right.value = Math.max(+left.value +1, +right.value);
    }
    setQueryParam(`${rangeAtt}-min`, `${arr[(Number(left.value))]}`)
    setQueryParam(`${rangeAtt}-max`, `${arr[(Number(right.value))]}`)
    fillSlider(parent, '#C6C6C6', '#25daa5')
  });
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



// rangeAttribute.forEach(item => {
//   map.set(`${item}`, `${getRangeValues(productItems, item)}`)
// })
// const arr = map.get('stock')
// const arr2 = arr.join('')
// console.log(arr2)