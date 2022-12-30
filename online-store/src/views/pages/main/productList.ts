import { setCartTotal, state } from "../../components/state";
import productItems from "../../components/productJSON";
import { IProduct } from "../../components/constants";

export function clickProductList(e: Event) {
  const target = e.target as HTMLElement;
  const array = productItems.products;

  if (target.classList.contains("list-item")) {
    let link = `/#/product/${target.id}`;
    location.href = link;
  }
  if (
    (target.parentNode as HTMLElement).classList.contains("list-item") &&
    target.classList.contains("details__button")
  ) {
    let link = `/#/product/${(target.parentNode as HTMLElement).id}`;
    location.href = link;
  }

  if (target.classList.contains("cart__button")) {
    const targetObject = array.find(
      (item) => item.id === Number((target.parentNode as HTMLElement).id)
    );
    const cartItem = { ...targetObject, count: 1 };
    state.cartArray.push(cartItem as IProduct);
  }
  if (target.classList.contains("drop-item__button")) {
    (target.parentNode as HTMLElement).classList.remove("red-border");
    state.cartArray = state.cartArray.filter(
      (item) => item.id !== Number((target.parentNode as HTMLElement).id)
    );

    (target.parentNode as HTMLElement).childNodes.forEach((child, index) => {
      if (index === 2) {
        (child as HTMLElement).classList.remove("hide");
      }
      if (index === 3) {
        (child as HTMLElement).classList.add("hide");
      }
    });
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

        item.childNodes.forEach((child, index) => {
          if (index === 2) {
            (child as HTMLElement).classList.add("hide");
          }
          if (index === 3) {
            (child as HTMLElement).classList.remove("hide");
          }
        });
      }
    });
  });
  setCartTotal();
}
