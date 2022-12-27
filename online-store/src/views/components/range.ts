import { tsQuerySelector, tsQuerySelectorAll } from "./helpers";
import { setQueryRangeParams } from '../pages/main/queryParams';
import productItems from "./productJSON";
import { searchItems } from "../pages/main/search";


export const rangeContainer = document.getElementsByClassName('range');
const rangeAttribute = ['price', 'stock']


export const setRange = (parent: any) => {
  [...parent].forEach((item, index) => {
    const element = item.querySelector(".range-sliders");
    rangeAbs([...parent][index], element, rangeAttribute[index], productItems)
  })
};

const rangeAbs = (parent: any, item: any, rangeAtt: string, data: any) => {
  const rangeArray = getRangeValues(data, rangeAtt)
  console.log(rangeArray)
  const rangeInputs = parent.querySelectorAll('.range-sliders__input');
  const [ left, right ] = rangeInputs;
  // fillSlider(parent, '#C6C6C6', '#25daa5')
  item.addEventListener('input', ({ target }: any) => {  
    tsQuerySelector(parent, '.range-values__min').textContent = left.value
    tsQuerySelector(parent, '.range-values__max').textContent = right.value
    if (rangeAtt === 'price') {
      setQueryRangeParams('price-min', left.value)
      setQueryRangeParams('price-max', right.value)
    } else if (rangeAtt === 'stock') {
      setQueryRangeParams('stock-min', left.value)
      setQueryRangeParams('stock-max', right.value)
    }
    if (target == right) {
      left.value = Math.min(+right.value -1, +left.value);
    } else {
      right.value = Math.max(+left.value +1, +right.value);
    }
    fillSlider(parent, '#C6C6C6', '#25daa5')
    // searchItems(productItems.products)
  });
  // item.addEventListener('change', () => {
  //   fillSlider(left, right, '#C6C6C6', '#25daa5', right)
  // })

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

const getRangeValues = (data: any, category: string) => {
  const set = new Set();
  const array = data.products;
  for (let item of array) {
    set.add(item[category])
  }
  let arr = Array.from(set)
  let sortArr = arr.sort((a: number, b: number) => a - b)
  return sortArr
}