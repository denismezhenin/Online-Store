export interface IProduct {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
  count?: number;
}
export interface IState {
  cartArray: Array<IProduct>;
  cartTotalPrice: number;
  promoCodeRS: boolean;
  promoCodeNY: boolean;
}
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
  const headerCartTotal = document.querySelector(
    ".header-cart-total"
  ) as HTMLElement;
  headerCartTotal.innerHTML = String(resultPrice);

  let resultCount = state.cartArray.reduce((acc: number, el) => {
    acc = acc + (el.count as number);
    return acc;
  }, 0);
  const headerCartCounter = document.querySelector(
    ".header-cart__counter"
  ) as HTMLElement;
  headerCartCounter.innerHTML = String(resultCount);
}
