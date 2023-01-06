import { setCartTotal, state } from "../../components/state";
import productItems from "../../components/productJSON";
import { IProduct, ProductButton } from "../../components/constants";
import { tsQuerySelector } from "../../components/helpers";

export function clickProductList(e: Event) {
  if (!(e.target instanceof HTMLElement)) return;
  const target = e.target;
  const array = productItems.products;
  let li = target.closest('.list-item');
  if (!li) return;

  if (!target.classList.contains('buttons')) {
    let link = `/#/product/${li.id}`;
    location.href = link;
  }
  if (target.classList.contains("details__button")) {
    let link = `/#/product/${li.id}`;
    location.href = link;
  }
  if (target.classList.contains("cart__button")) {
    const targetObject = array.find((item) => {
      if (!li) return;
      return item.id === Number(li.id);
    });
    const cartItem: IProduct = { ...targetObject, count: 1 };
    state.cartArray.push(cartItem);
  }
  if (target.classList.contains("drop-item__button")) {
    li.classList.remove("red-border");
    state.cartArray = state.cartArray.filter((item) => {
      if (!li) return;
      return item.id !== Number(li.id);
    });

    tsQuerySelector(li, '.cart__button').classList.remove('hide');
    tsQuerySelector(li, '.drop-item__button').classList.add('hide');
  }

  checkProducts();
  setCartTotal();
}

export function checkProducts() {
  const productList = document.querySelectorAll(".list-item");
  productList.forEach((item) => {
    state.cartArray.forEach((el) => {
      if (Number(item.id) === el.id) {
        item.classList.add("red-border");
        tsQuerySelector(item, '.cart__button').classList.add('hide');
        tsQuerySelector(item, '.drop-item__button').classList.remove('hide');
      }
    });
  });
  setCartTotal();
}
