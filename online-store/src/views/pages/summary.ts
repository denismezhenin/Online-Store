import { markersForNY, markersForRS } from "../components/constants";
import { tsQuerySelector } from "../components/helpers";
import { state } from "../components/state";

export function checkPromoCode() {
  const summaryDiscountInput = tsQuerySelector<HTMLInputElement>(
    document,
    ".summary-discount__input"
  );
  const promoCodeContainer = tsQuerySelector(
    document,
    ".promo-code__container"
  );

  enum Promo {
    rs = `
        <p class="promo">Rolling Scopes School - 10%</p>
        <button class="promo-add__button rs-add__button">Add</button>`,
    newYear = `
        <p class='promo'>Happy New Year - 10%</p>
        <button class="promo-add__button ny-add__button">Add</button>`,
    promoCodeNY = "ny",
    promoCodeRS = "rs",
  }

  if (
    !(summaryDiscountInput.value.toLowerCase() === Promo.promoCodeNY) ||
    !(summaryDiscountInput.value.toLowerCase() === Promo.promoCodeRS)
  ) {
    const promoCode = document.querySelector(".promo-code");
    promoCode?.remove();
  }
  if (summaryDiscountInput.value.toLowerCase() === Promo.promoCodeRS) {
    let div = document.createElement("div");
    div.className = "promo-code";
    div.innerHTML = Promo.rs;
    promoCodeContainer.append(div);
    const rsAddButton = tsQuerySelector(document, ".rs-add__button");
    if (state.promoCodeRS) {
      rsAddButton.remove();
    }
  }
  if (summaryDiscountInput.value.toLowerCase() === Promo.promoCodeNY) {
    let div = document.createElement("div");
    div.className = "promo-code";
    div.innerHTML = Promo.newYear;
    promoCodeContainer.append(div);
    const nyAddButton = tsQuerySelector(document, ".ny-add__button");
    if (state.promoCodeNY) {
      nyAddButton.remove();
    }
  }
}

export function addApplyCode() {
  const applyCode = document.querySelector(".apply-code");
  if (!applyCode && (state.promoCodeRS || state.promoCodeNY)) {
    let div = document.createElement("div");
    div.className = "apply-code";
    div.innerHTML = '<h3 class="aplly-code__title">Applied codes</h3>';
    const summaryDiscountInput = tsQuerySelector<HTMLInputElement>(
      document,
      ".summary-discount__input"
    );
    summaryDiscountInput.before(div);
  }
  const rsPromoCode = document.querySelector(".rs-promo-code");

  if (!rsPromoCode && state.promoCodeRS) {
    addApplyPromoCode(markersForRS.promo, markersForRS.button);
  }

  const nyPromoCode = document.querySelector(".ny-promo-code");

  if (!nyPromoCode && state.promoCodeNY === true) {
    addApplyPromoCode(markersForNY.promo, markersForNY.button);
  }
}

function addApplyPromoCode(promo: string, button: string) {
  let div = document.createElement("div");
  div.className = `apply-promo-code ${button}-promo-code`;
  div.innerHTML = `<h3 class="aplly-code__text">${promo} - 10%</h3><button class="${button}-drop__button">Drop</button>`;
  const apllyCodeTitle = tsQuerySelector(document, ".aplly-code__title");
  apllyCodeTitle.after(div);
}

export function removePromoCode(button: string) {
  const promoDiv = document.querySelector(button);
  promoDiv?.remove();
  if (!state.promoCodeNY && !state.promoCodeRS) {
    const applyCode = tsQuerySelector(document, ".apply-code");
    applyCode?.remove();
  }
}
