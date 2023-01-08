import { IProduct, IState } from "./constants";
import { tsQuerySelector } from "./helpers";

export let state: IState = {
  cartArray: [],
  cartTotalPrice: 0,
  promoCodeRS: false,
  promoCodeNY: false,
  items: 1,
  cartPage: 1,
  maxCartPage: 1


export function getLocalStorage() {
  if (localStorage.getItem("state")) {
    const temp = JSON.parse(String(localStorage.getItem("state")) );
    state = { ...temp };
  }
}
window.addEventListener("load", getLocalStorage);

export function setCartTotal() {
  state.cartTotalPrice = state.cartArray.reduce((acc: number, el: IProduct) => {
    el.price && el.count ? (acc = acc + el.price * el.count) : "";

    return acc;
  }, 0);

  const headerCartTotal = tsQuerySelector(document, ".header-cart-total");
  headerCartTotal.textContent = String(state.cartTotalPrice);

  let resultCount = state.cartArray.reduce((acc: number, el: IProduct) => {
    acc = acc + Number(el.count);
    return acc;
  }, 0);
  const headerCartCounter = tsQuerySelector(document, ".header-cart__counter");
  headerCartCounter.textContent = String(resultCount);
}
