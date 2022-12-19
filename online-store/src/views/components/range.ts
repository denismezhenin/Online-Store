// const twoRangeSlider = (() => {


// });

// twoRangeSlider.init();

import { tsQuerySelector, tsQuerySelectorAll } from "./helpers";

export const rangeContainer = document.getElementsByClassName('range');



export const setRange = (parent: any) => {
  [...parent].forEach((item, index) => {
    const element = item.querySelector(".range-sliders");
    rangeAbs([...parent][index], element)
  })
};

const rangeAbs = (parent: any, item: any) => {
  const rangeInputs = item.querySelectorAll('.range-sliders__input');
  item.addEventListener('input', ({ target }: any) => {
    const [ left, right ] = rangeInputs;
    tsQuerySelector(parent, '.range-values__min').textContent = left.value
    tsQuerySelector(parent, '.range-values__max').textContent = right.value
    if (target == right) {
      left.value = Math.min(+right.value -1, +left.value);
    } else {
      right.value = Math.max(+left.value +1, +right.value);
    }

  });

};

// init(rangeContainer)