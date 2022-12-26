import { setCartTotal, state } from "../components/state";
import {
  decrementProduct,
  getCartHtml,
  getModal,
  getProductList,
  incrementProduct,
  removeModal,
} from "./cartPage";
import { changeTotal } from "./cartPage";

let Cart = {
  render: async () => {
    let view = getCartHtml();
    return view;
  },

  after_render: async () => {
    setCartTotal()
    const summaryBuyButton = document.querySelector(
      ".summary-buy__button"
    ) as HTMLElement;
    summaryBuyButton.addEventListener("click", getModal);

    const modal = document.querySelector(".modal") as HTMLElement;
    modal.addEventListener("click", removeModal);

    const cartUl = document.querySelector(".cart__ul") as HTMLUListElement;
    let productList = getProductList();
    cartUl.innerHTML = productList;
    changeTotal("product-amount", "summary-products__span");
    changeTotal("amount-price__span", "summary-total__span");

    cartUl.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      if ((target as HTMLElement).classList.contains("minus")) {
        decrementProduct(e);
        console.log(state.cartArray)
      }
      if ((target as HTMLElement).classList.contains("plus")) {
        incrementProduct(e);
        console.log(state.cartArray)
      }
   
    });
    
  },
  
};

export default Cart;
