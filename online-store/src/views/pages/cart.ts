import { state } from "../components/state";
import { getCartHtml, getModal, getProductList, removeModal } from "./cartPage";

let Cart = {
  render: async () => {
    let view = getCartHtml();
    return view;
  },

  after_render: async () => {
    const summaryBuyButton = document.querySelector(
      ".summary-buy__button"
    ) as HTMLElement;
    summaryBuyButton.addEventListener("click", getModal);

    const modal = document.querySelector(".modal") as HTMLElement;
    modal.addEventListener("click", removeModal);

    const cartUl = document.querySelector(".cart__ul") as HTMLUListElement;
    let productList = getProductList();

    cartUl.innerHTML = productList;
  },
};

export default Cart;
