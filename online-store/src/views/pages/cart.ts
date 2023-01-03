import { AmountChangeTotal, PriceChangeTotal } from "../components/constants";
import { tsQuerySelector } from "../components/helpers";
import { setCartTotal, state } from "../components/state";
import {
  decrementProduct,
  getCartHtml,
  getEmptyCart,
  getModal,
  getProductList,
  incrementProduct,
  removeModal,
} from "./cartPage";
import { changeTotal } from "./cartPage";
import {
  inputCardCvv,
  inputCardNumber,
  inputCardValid,
  submitCard,
} from "./modal";
import { addApplyCode, checkPromoCode, removePromoCode } from "./summary";

let Cart = {
  render: async () => {
    let view = getCartHtml();
    return view;
  },

  after_render: async () => {
    addApplyCode();
    setCartTotal();

    const summaryBuyButton = tsQuerySelector(document, ".summary-buy__button");
    summaryBuyButton.addEventListener("click", getModal);

    const modal = tsQuerySelector(document, ".modal");
    modal.addEventListener("click", removeModal);

    const cartUl = tsQuerySelector<HTMLUListElement>(document, ".cart__ul");
    let productList = getProductList();
    if (state.cartArray.length > 0) {
      cartUl.innerHTML = productList;
    } else {
      getEmptyCart();
    }

    changeTotal(AmountChangeTotal.classElement, AmountChangeTotal.classResult);
    changeTotal(PriceChangeTotal.classElement, PriceChangeTotal.classResult);

    cartUl.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      const target = e.target;

      if (target.classList.contains("minus")) {
        decrementProduct(e);
      }
      if (target.classList.contains("plus")) {
        incrementProduct(e);
      }
      if (state.cartArray.length === 0) {
        getEmptyCart();
      }
    });

    const summaryDiscountInput = tsQuerySelector<HTMLInputElement>(
      document,
      ".summary-discount__input"
    );

    summaryDiscountInput.addEventListener("input", checkPromoCode);

    const promoCodeContainer = tsQuerySelector(
      document,
      ".promo-code__container"
    );

    promoCodeContainer?.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      let target = e.target;
      if (target.classList.contains("rs-add__button")) {
        state.promoCodeRS = true;
      }
      if (target.classList.contains("ny-add__button")) {
        state.promoCodeNY = true;
      }
      addApplyCode();
      checkPromoCode();
    });

    const apllyCode = tsQuerySelector(document, ".summary__container");

    apllyCode?.addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      let target = e.target;

      if (target.classList.contains("rs-drop__button")) {
        state.promoCodeRS = false;
        removePromoCode(".rs-promo-code");
      }
      if (target.classList.contains("ny-drop__button")) {
        state.promoCodeNY = false;
        removePromoCode(".ny-promo-code");
      }
    });

    const cardNumberInput = tsQuerySelector<HTMLInputElement>(
      document,
      ".card-number__input"
    );
    cardNumberInput.addEventListener("input", inputCardNumber);

    const cardValid = tsQuerySelector<HTMLInputElement>(
      document,
      ".card-valid"
    );
    cardValid.addEventListener("input", inputCardValid);

    const cvv = tsQuerySelector<HTMLInputElement>(document, ".cvv");
    cvv.addEventListener("input", inputCardCvv);

    const confirmButton = tsQuerySelector<HTMLButtonElement>(
      document,
      ".confirm__button"
    );
    confirmButton.addEventListener("click", submitCard);
  },
};

export default Cart;
