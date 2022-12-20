import { getCartHtml, getModal, removeModal } from "./cartPage";

let Cart = {

  render: async () => {
    let view = getCartHtml();
    return view;
  },

  after_render: async () => {
    console.log("car")
    const summaryBuyButton = document.querySelector(
      ".summary-buy__button"
    ) as HTMLElement;
    summaryBuyButton.addEventListener("click", getModal);

    const modal = document.querySelector(".modal") as HTMLElement;
    modal.addEventListener('click',removeModal)
  },
};

export default Cart;
