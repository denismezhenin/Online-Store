/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-mutable-exports */
import { IProduct, IState } from './constants';
import { tsQuerySelector } from './helpers';

export let state: IState = {
  cartArray: [],
  cartTotalPrice: 0,
  promoCodeRS: false,
  promoCodeNY: false,
  items: 1,
  cartPage: 1,
  maxCartPage: 1
}


export function getLocalStorage() {
  if (localStorage.getItem('state')) {
    const temp = JSON.parse(String(localStorage.getItem('state')));
    state = { ...temp };
  }
}
window.addEventListener('load', getLocalStorage);

function setLocalStorage() {
  localStorage.setItem('state', JSON.stringify(state));
}
window.addEventListener('beforeunload', setLocalStorage);

export function setCartTotal() {
  state.cartTotalPrice = state.cartArray.reduce((acc: number, el: IProduct) => {
    
    el.price && el.count ? (acc += el.price * el.count) : '';

    return acc;
  }, 0);

  const headerCartTotal = tsQuerySelector(document, '.header-cart-total');
  headerCartTotal.textContent = String(state.cartTotalPrice);

  const resultCount = state.cartArray.reduce((acc: number, el: IProduct) => {
    acc += Number(el.count);
    return acc;
  }, 0);
  const headerCartCounter = tsQuerySelector(document, '.header-cart__counter');
  headerCartCounter.textContent = String(resultCount);
}
