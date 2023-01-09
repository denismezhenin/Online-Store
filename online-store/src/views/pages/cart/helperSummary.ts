import {
  Discount,
  MarkersForNY,
  MarkersForRS,
  Promo,
} from '../../components/constants';
import { tsQuerySelector } from '../../components/helpers';
import { state } from '../../components/state';

function getPriceWithPromo() {
  if (state.promoCodeNY && state.promoCodeRS) {
    return (
      state.cartTotalPrice - state.cartTotalPrice * (Discount.RS + Discount.NY)
    );
  }
  if (
    (!state.promoCodeNY && state.promoCodeRS) ||
    (state.promoCodeNY && !state.promoCodeRS)
  ) {
    return state.cartTotalPrice - state.cartTotalPrice * Discount.RS;
  }
  return state.cartTotalPrice;
}

export function crossOutTotalPrice() {
  const summaryTotalPrice = tsQuerySelector(document, '.summary-total-price');
  const totalPriceNew = document.querySelector('.total-price-new');

  if (!totalPriceNew && (state.promoCodeNY || state.promoCodeRS)) {
    const p = document.createElement('p');
    p.className = 'total-price-new';
    p.innerHTML = `Total: $<span class="summary-total__span">${getPriceWithPromo()}</span>`;
    summaryTotalPrice.after(p);

    summaryTotalPrice.style.textDecoration = 'line-through';
  } else if (totalPriceNew && (state.promoCodeNY || state.promoCodeRS)) {
    (
      totalPriceNew as HTMLElement
    ).innerHTML = `Total: $<span class="summary-total__span">${getPriceWithPromo()}</span>`;
  } else {
    summaryTotalPrice.style.textDecoration = '';

    totalPriceNew?.remove();
  }
}

export function checkPromoCode() {
  const summaryDiscountInput = tsQuerySelector<HTMLInputElement>(
    document,
    '.summary-discount__input'
  );
  const promoCodeContainer = tsQuerySelector(
    document,
    '.promo-code__container'
  );

  if (
    !(summaryDiscountInput.value.toLowerCase() === Promo.promoCodeNY) ||
    !(summaryDiscountInput.value.toLowerCase() === Promo.promoCodeRS)
  ) {
    const promoCode = document.querySelector('.promo-code');
    promoCode?.remove();
  }
  if (summaryDiscountInput.value.toLowerCase() === Promo.promoCodeRS) {
    const div = document.createElement('div');
    div.className = 'promo-code';
    div.innerHTML = Promo.rs;
    promoCodeContainer.append(div);
    const rsAddButton = tsQuerySelector(document, '.rs-add__button');
    if (state.promoCodeRS) {
      rsAddButton.remove();
    }
  }
  if (summaryDiscountInput.value.toLowerCase() === Promo.promoCodeNY) {
    const div = document.createElement('div');
    div.className = 'promo-code';
    div.innerHTML = Promo.newYear;
    promoCodeContainer.append(div);
    const nyAddButton = tsQuerySelector(document, '.ny-add__button');
    if (state.promoCodeNY) {
      nyAddButton.remove();
    }
  }
  crossOutTotalPrice();
}

function addApplyPromoCode(promo: string, button: string) {
  const div = document.createElement('div');
  div.className = `apply-promo-code ${button}-promo-code`;
  div.innerHTML = `<h3 class="aplly-code__text">${promo} - 10%</h3><button class="${button}-drop__button">Drop</button>`;
  const apllyCodeTitle = tsQuerySelector(document, '.aplly-code__title');
  apllyCodeTitle.after(div);
  crossOutTotalPrice();
}

export function addApplyCode() {
  const applyCode = document.querySelector('.apply-code');
  if (!applyCode && (state.promoCodeRS || state.promoCodeNY)) {
    const div = document.createElement('div');
    div.className = 'apply-code';
    div.innerHTML = '<h3 class="aplly-code__title">Applied codes</h3>';
    const summaryDiscountInput = tsQuerySelector<HTMLInputElement>(
      document,
      '.summary-discount__input'
    );
    summaryDiscountInput.before(div);
  }
  const rsPromoCode = document.querySelector('.rs-promo-code');

  if (!rsPromoCode && state.promoCodeRS) {
    addApplyPromoCode(MarkersForRS.promo, MarkersForRS.button);
  }

  const nyPromoCode = document.querySelector('.ny-promo-code');

  if (!nyPromoCode && state.promoCodeNY) {
    addApplyPromoCode(MarkersForNY.promo, MarkersForNY.button);
  }
  crossOutTotalPrice();
}

export function removePromoCode(button: string) {
  const promoDiv = document.querySelector(button);
  promoDiv?.remove();
  if (!state.promoCodeNY && !state.promoCodeRS) {
    const applyCode = tsQuerySelector(document, '.apply-code');
    applyCode?.remove();
  }
  checkPromoCode();
  crossOutTotalPrice();
}
