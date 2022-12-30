import { IProduct, IState } from "./constants";
import { tsQuerySelector } from "./helpers";



export let state: IState = {
  cartArray: [],
  cartTotalPrice: 0,
  promoCodeRS: false,
  promoCodeNY: false,
};

export function getLocalStorage() {
  if (localStorage.getItem("state")) {
    const temp = JSON.parse(localStorage.getItem("state") as string);
    state = { ...temp };
  }
}
window.addEventListener("load", getLocalStorage);

export function setCartTotal() {
  let resultPrice = state.cartArray.reduce((acc: number, el) => {
    acc = acc + (el.price as number) * (el.count as number);
    return acc;
  }, 0);

  const headerCartTotal = tsQuerySelector(document, ".header-cart-total");
  headerCartTotal.innerHTML = String(resultPrice);

  let resultCount = state.cartArray.reduce((acc: number, el) => {
    acc = acc + (el.count as number);
    return acc;
  }, 0);
  const headerCartCounter = tsQuerySelector(document, ".header-cart__counter");
  headerCartCounter.innerHTML = String(resultCount);
}
