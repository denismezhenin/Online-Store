import { Query } from "../../components/constants";
import { tsQuerySelector } from "../../components/helpers";
import { setQueryParam } from "../main/queryParams";

import { state } from "./../../components/state";
import { renderProductList } from "./cartPage";

export function getMaxPage() {
  if (state.items >= 1) {
    state.maxCartPage = Math.ceil(state.cartArray.length / state.items);
  } else {
    state.maxCartPage = 1;
  }
}

export function setInputPage(e: InputEventInit) {
  const titleItemsInput = tsQuerySelector<HTMLInputElement>(
    document,
    ".title-items__input"
  );
  let numbers = /[0-9]/;
  if (e.inputType === "insertText" && !numbers.test(e.data!)) {
    titleItemsInput.value = titleItemsInput.value.slice(
      0,
      titleItemsInput.value.length - 1
    );
    if (titleItemsInput.value.length === 0) {
      state.cartPage = 1;
      titleItemsInput.value = "1";
    }
  }
  state.items = Number(titleItemsInput.value);
  state.cartPage = 1;
  getMaxPage();
  getCurrentPage();
  if (titleItemsInput.value === "") {
    setCatQueryParams('limit', '0');
  } else {
    setCatQueryParams('limit', titleItemsInput.value);
  }
  renderProductList()
}

export function getProductNumPage(e: Event) {
  if (!(e.target instanceof HTMLButtonElement)) return;
  let target = e.target;
  const productNumPage = tsQuerySelector(document, ".product-num-page");
  if (target.classList.contains("prev-page")) {
    if (state.cartPage > 1) {
      state.cartPage--;
    }
  }
  if (
    target.classList.contains("next-page") &&
    state.cartPage < state.maxCartPage
  ) {
    state.cartPage++;
  }
  getMaxPage();
  setCatQueryParams('page', String(state.cartPage))
  getCurrentPage();
  renderProductList()

}

export function getCurrentPage() {
  const productNumPage = tsQuerySelector(document, ".product-num-page");
  if (Number(productNumPage.textContent) > state.maxCartPage) {
    productNumPage.innerText = String(state.maxCartPage);
    if (state.maxCartPage === 0) {
      state.cartPage = 1;
    } else {
      state.cartPage = state.maxCartPage;
    }
  } else {
    productNumPage.innerText = String(state.cartPage);
  }
}

const setCatQueryParams = (category: string, value: string):void => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(6));
  searchParams.set(category, value);
  location.hash = '/cart?' + searchParams.toString();
}

export const searchCartParam = (value: string) => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(6));
  // console.log(searchParams.get('page'))
return searchParams.get(value)
}
