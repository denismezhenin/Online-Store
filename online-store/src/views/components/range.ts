// const twoRangeSlider = (() => {


// });

// twoRangeSlider.init();

import { tsQuerySelector, tsQuerySelectorAll } from "./helpers";

export const rangeContainer = document.getElementsByClassName('range');


export const setRange = (parent: any) => {
  [...parent].forEach((item) => {
    const elements = item.getElementsByClassName("range-sliders");
    [...elements].forEach((item) => rangeAbs(item));
  })
  // const elements = parent.getElementsByClassName("range-sliders");
  // [...elements].forEach((item) => bindComponent(item));
};

const rangeAbs = (item: any) => {
  const rangeInputs = item.querySelectorAll('.range-sliders__input');
  item.addEventListener('input', ({ target }: any) => {
    const [ right, left ] = rangeInputs;
    if (target == right) {
      left.value = Math.min(+right.value -1, +left.value);
    } else {
      right.value = Math.max(+left.value +1, +right.value);
    }

  });

};

// init(rangeContainer)