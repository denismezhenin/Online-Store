import { state } from "../components/state";

export function checkPromoCode() {
  const summaryDiscountInput = document.querySelector(
    ".summary-discount__input"
  ) as HTMLInputElement;

  const promoCodeContainer = document.querySelector(
    ".promo-code__container"
  ) as HTMLElement;

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
    const rsAddButton = document.querySelector(
      ".rs-add__button"
    ) as HTMLElement;
    if (state.promoCodeRS === true) {
      rsAddButton.remove();
    }
  }
  if (summaryDiscountInput.value.toLowerCase() === Promo.promoCodeNY) {
    let div = document.createElement("div");
    div.className = "promo-code";
    div.innerHTML = Promo.newYear;
    promoCodeContainer.append(div);
    const nyAddButton = document.querySelector(
      ".ny-add__button"
    ) as HTMLElement;
    if (state.promoCodeNY === true) {
      nyAddButton.remove();
    }
  }
}
enum markersForRS {
  promo = "Rolling Scopes School",
  button = "rs",
}
enum markersForNY {
  promo = "Happy New Year",
  button = "ny",
}
export function addApplyCode() {
  const applyCode = document.querySelector(".apply-code") as HTMLElement;
  if (!applyCode && (state.promoCodeRS || state.promoCodeNY)) {
    let div = document.createElement("div");
    div.className = "apply-code";
    div.innerHTML = '<h3 class="aplly-code__title">Applied codes</h3>';
    const summaryDiscountInput = document.querySelector(
      ".summary-discount__input"
    ) as HTMLInputElement;
    summaryDiscountInput.before(div);
  }
  const rsPromoCode = document.querySelector(".rs-promo-code") as HTMLElement;

  if (!rsPromoCode && state.promoCodeRS === true) {
    addApplyPromoCode(markersForRS.promo, markersForRS.button);
  }

  const nyPromoCode = document.querySelector(".ny-promo-code") as HTMLElement;

  if (!nyPromoCode && state.promoCodeNY === true) {
    addApplyPromoCode(markersForNY.promo, markersForNY.button);
  }
}

function addApplyPromoCode(promo: string, button: string) {
  let div = document.createElement("div");
  div.className = `apply-promo-code ${button}-promo-code`;
  div.innerHTML = `<h3 class="aplly-code__text">${promo} - 10%</h3><button class="${button}-drop__button">Drop</button>`;
  const apllyCodeTitle = document.querySelector(
    ".aplly-code__title"
  ) as HTMLElement;
  apllyCodeTitle.after(div);
}

export function removePromoCode(button: string) {
  const promoDiv = document.querySelector(button);
  promoDiv?.remove();
  if (state.promoCodeNY === false && state.promoCodeRS === false) {
    const applyCode = document.querySelector(".apply-code");
    applyCode?.remove();
  }
}
