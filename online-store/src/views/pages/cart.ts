import { setCartTotal, state } from "../components/state";
import {
  AmountChangeTotal,
  decrementProduct,
  getCartHtml,
  getEmptyCart,
  getModal,
  getProductList,
  incrementProduct,
  PriceChangeTotal,
  removeModal,
} from "./cartPage";
import { changeTotal } from "./cartPage";
import { addApplyCode, checkPromoCode, removePromoCode } from "./summary";

let Cart = {
  render: async () => {
    let view = getCartHtml();
    return view;
  },

  after_render: async () => {
    addApplyCode();
    setCartTotal();
    const summaryBuyButton = document.querySelector(
      ".summary-buy__button"
    ) as HTMLElement;
    summaryBuyButton.addEventListener("click", getModal);

    const modal = document.querySelector(".modal") as HTMLElement;
    modal.addEventListener("click", removeModal);

    const cartUl = document.querySelector(".cart__ul") as HTMLUListElement;
    let productList = getProductList();
    if (state.cartArray.length > 0) {
      cartUl.innerHTML = productList;
    } else {
      getEmptyCart();
    }
    
    changeTotal(AmountChangeTotal.classElement, AmountChangeTotal.classResult);
    changeTotal(PriceChangeTotal.classElement, PriceChangeTotal.classResult);

    cartUl.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      if ((target as HTMLElement).classList.contains("minus")) {
        decrementProduct(e);
      }
      if ((target as HTMLElement).classList.contains("plus")) {
        incrementProduct(e);
      }
      if (state.cartArray.length === 0) {
        getEmptyCart();
      }
    });

    const summaryDiscountInput = document.querySelector(
      ".summary-discount__input"
    ) as HTMLInputElement;

    summaryDiscountInput.addEventListener("input", checkPromoCode);

    const promoCodeContainer = document.querySelector(
      ".promo-code__container"
    ) as HTMLElement;

    promoCodeContainer?.addEventListener("click", (e) => {
      let target = e.target as HTMLElement;
      if (target.classList.contains("rs-add__button")) {
        state.promoCodeRS = true;
      }
      if (target.classList.contains("ny-add__button")) {
        state.promoCodeNY = true;
      }
      addApplyCode();
      checkPromoCode();
    });

    const apllyCode = document.querySelector(".summary__container");

    apllyCode?.addEventListener("click", (e) => {
      let target = e.target as HTMLElement;
      console.log(target);

      if (target.classList.contains("rs-drop__button")) {
        state.promoCodeRS = false;
        removePromoCode(".rs-promo-code");
      }
      if (target.classList.contains("ny-drop__button")) {
        state.promoCodeNY = false;
        removePromoCode(".ny-promo-code");
      }
    });
  },
};

export default Cart;
