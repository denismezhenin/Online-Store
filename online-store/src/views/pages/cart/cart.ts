import { tsQuerySelector } from '../../components/helpers';
import { setCartTotal, state } from '../../components/state';
import {
  decrementProduct,
  getCartHtml,
  getEmptyCart,
  getModal,
  incrementProduct,
  removeModal,
  renderProductList,
  totalCountProduct,
  totalPrice,
} from './cartPage';

import {
  inputCardCvv,
  inputCardNumber,
  inputCardValid,
  submitCard,
} from './helperOrderModal';
import { addApplyCode, checkPromoCode, removePromoCode } from './helperSummary';
import {
  getCurrentPage,
  getMaxPage,
  getProductNumPage,
  setInputPage,
} from './pagination';

const Cart = {
  render: async () => {
    const view = getCartHtml();
    return view;
  },

  after_render: async () => {
    addApplyCode();
    setCartTotal();
    getMaxPage();
    getCurrentPage();

    if (state.cartArray.length > 0) {
      const summaryBuyButton = tsQuerySelector(
        document,
        '.summary-buy__button'
      );
      summaryBuyButton.addEventListener('click', getModal);
      const modal = tsQuerySelector(document, '.modal');
      modal.addEventListener('click', removeModal);
      const cartUl = tsQuerySelector<HTMLUListElement>(document, '.cart__ul');

      cartUl.addEventListener('click', (e) => {
        if (!(e.target instanceof HTMLElement)) return;
        const { target } = e;

        if (target.classList.contains('minus')) {
          decrementProduct(e);
        }
        if (target.classList.contains('plus')) {
          incrementProduct(e);
        }
        if (state.cartArray.length === 0) {
          getEmptyCart();
        }
      });
      totalPrice();
      totalCountProduct();
      const summaryDiscountInput = tsQuerySelector<HTMLInputElement>(
        document,
        '.summary-discount__input'
      );

      summaryDiscountInput.addEventListener('input', checkPromoCode);

      const promoCodeContainer = tsQuerySelector(
        document,
        '.promo-code__container'
      );

      promoCodeContainer?.addEventListener('click', (e) => {
        if (!(e.target instanceof HTMLElement)) return;
        const { target } = e;
        if (target.classList.contains('rs-add__button')) {
          state.promoCodeRS = true;
        }
        if (target.classList.contains('ny-add__button')) {
          state.promoCodeNY = true;
        }
        addApplyCode();
        checkPromoCode();
      });
      const apllyCode = tsQuerySelector(document, '.summary__container');

      apllyCode?.addEventListener('click', (e) => {
        if (!(e.target instanceof HTMLElement)) return;
        const { target } = e;

        if (target.classList.contains('rs-drop__button')) {
          state.promoCodeRS = false;
          removePromoCode('.rs-promo-code');
        }
        if (target.classList.contains('ny-drop__button')) {
          state.promoCodeNY = false;
          removePromoCode('.ny-promo-code');
        }
      });
      const cardNumberInput = tsQuerySelector<HTMLInputElement>(
        document,
        '.card-number__input'
      );
      cardNumberInput.addEventListener('input', inputCardNumber);

      const cardValid = tsQuerySelector<HTMLInputElement>(
        document,
        '.card-valid'
      );
      cardValid.addEventListener('input', inputCardValid);

      const cvv = tsQuerySelector<HTMLInputElement>(document, '.cvv');
      cvv.addEventListener('input', inputCardCvv);

      const confirmButton = tsQuerySelector<HTMLButtonElement>(
        document,
        '.confirm__button'
      );
      confirmButton.addEventListener('click', submitCard);

      const titleItemsInput = tsQuerySelector<HTMLInputElement>(
        document,
        '.title-items__input'
      );
      titleItemsInput.addEventListener('input', setInputPage);

      const titlePage = tsQuerySelector<HTMLButtonElement>(
        document,
        '.title-page'
      );
      titlePage.addEventListener('click', getProductNumPage);
    }
    renderProductList();
  },
};

export default Cart;
