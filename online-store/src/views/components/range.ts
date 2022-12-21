import { tsQuerySelector, tsQuerySelectorAll } from "./helpers";
import { setQueryRangeParams } from '../pages/main/queryParams'

export const rangeContainer = document.getElementsByClassName('range');
const rangeAttribute = ['price', 'stock']


export const setRange = (parent: any) => {
  [...parent].forEach((item, index) => {
    const element = item.querySelector(".range-sliders");
    rangeAbs([...parent][index], element, rangeAttribute[index])
  })
  // console.log('com')
};

const rangeAbs = (parent: any, item: any, rangeAtt: string) => {
  const rangeInputs = item.querySelectorAll('.range-sliders__input');
  item.addEventListener('input', ({ target }: any) => {
    const [ left, right ] = rangeInputs;
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

  });

};

// init(rangeContainer)