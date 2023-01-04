import {
  CardCvv,
  CardLogo,
  CardNumber,
  CardValid,
  LocationHref,
} from "../components/constants";
import { tsQuerySelector } from "../components/helpers";
import { setCartTotal, state } from "../components/state";
import { getEmptyCart } from "./cartPage";
import { addApplyCode } from "./summary";

export function inputCardNumber(e: InputEventInit) {
  const cardNumberInput = tsQuerySelector<HTMLInputElement>(
    document,
    ".card-number__input"
  );
  let [numbers, regExp, value] = [/[0-9]/, /[0-9]{4}/, cardNumberInput.value];
  const img = tsQuerySelector<HTMLImageElement>(document, ".card-img");
  if (cardNumberInput.value[CardLogo.firstNumber] === CardLogo.visaNumber) {
    img.src = CardLogo.visaLogo;
  } else if (
    cardNumberInput.value[CardLogo.firstNumber] === CardLogo.mastercardNumber
  ) {
    img.src = CardLogo.mastercardLogo;
  } else if (
    cardNumberInput.value[CardLogo.firstNumber] === CardLogo.unionpayNumber
  ) {
    img.src = CardLogo.unionpayLogo;
  } else {
    img.src = CardLogo.noLogo;
  }
  if (
    (e.inputType === "insertText" && !numbers.test(e.data!)) ||
    cardNumberInput.value.length > CardNumber.maxLength
  ) {
    cardNumberInput.value = cardNumberInput.value.slice(
      0,
      cardNumberInput.value.length - 1
    );
    return;
  }

  if (e.inputType === "deleteContentBackward" && regExp.test(value.slice(-1))) {
    cardNumberInput.value = cardNumberInput.value.slice(
      0,
      cardNumberInput.value.length - 1
    );
    return;
  }
}

export function inputCardValid(e: InputEventInit) {
  const cardValid = tsQuerySelector<HTMLInputElement>(document, ".card-valid");
  let [numbers, regExp, value] = [/[0-9]/, /[0-9]{2}/, cardValid.value];

  if (
    (e.inputType === "insertText" && !numbers.test(e.data!)) ||
    cardValid.value.length > CardValid.maxLength
  ) {
    cardValid.value = cardValid.value.slice(0, cardValid.value.length - 1);
    return;
  }

  if (
    e.inputType === "deleteContentBackward" &&
    regExp.test(value.slice(-CardValid.maxLength))
  ) {
    cardValid.value = cardValid.value.slice(0, cardValid.value.length - 1);
    return;
  }

  if (
    regExp.test(value.slice(-CardValid.numLengthMonth)) &&
    value.length < CardValid.maxLength
  ) {
    cardValid.value += CardValid.separator;
  }
  if (
    value.length === CardValid.maxLength &&
    Number(value.slice(-CardValid.numLengthMonth)) > CardValid.maxMonth
  ) {
    cardValid.value =
      cardValid.value.slice(-CardValid.numLengthMonth) +
      CardValid.separatorMonth;
  }
}

export function inputCardCvv(e: InputEventInit) {
  const cvv = tsQuerySelector<HTMLInputElement>(document, ".cvv");
  let [numbers, regExp, value] = [/[0-9]/, /[0-9]{2}/, cvv.value];

  if (
    (e.inputType === "insertText" && !numbers.test(e.data!)) ||
    cvv.value.length > CardCvv.maxLength
  ) {
    cvv.value = cvv.value.slice(0, cvv.value.length - 1);
    return;
  }

  if (e.inputType === "deleteContentBackward" && regExp.test(value.slice(-1))) {
    cvv.value = cvv.value.slice(0, cvv.value.length - 1);
    return;
  }
}

export function submitCard() {
  const confirmButton = tsQuerySelector<HTMLButtonElement>(
    document,
    ".confirm__button"
  );
  const cardForm = tsQuerySelector<HTMLFormElement>(document, ".card-form");
  const cardFormItem = document.querySelectorAll(".card-form__item");

  if (!cardForm.checkValidity()) {
    cardFormItem.forEach((el) => {
      const message = el.parentNode?.children[1];
      const checkHide = message!.classList.contains("hide");
      if (!(el as HTMLInputElement).checkValidity()) {
        message?.classList.remove("hide");
      } else {
        message?.classList.add("hide");
      }
    });

    const cardNumberInput = tsQuerySelector<HTMLInputElement>(
      document,
      ".card-number__input"
    );
    const cardValid = tsQuerySelector<HTMLInputElement>(
      document,
      ".card-valid"
    );
    const cvv = tsQuerySelector<HTMLInputElement>(document, ".cvv");
    const numberMessage = tsQuerySelector(document, ".number-message");
    const validMessage = tsQuerySelector(document, ".valid-message");
    const cvvMessage = tsQuerySelector(document, ".cvv-message");
    if (!cardNumberInput.checkValidity()) {
      numberMessage.classList.remove("hide");
    } else {
      numberMessage.classList.add("hide");
    }
    if (!cardValid.checkValidity()) {
      validMessage.classList.remove("hide");
    } else {
      validMessage.classList.add("hide");
    }
    if (!cvv.checkValidity()) {
      cvvMessage.classList.remove("hide");
    } else {
      cvvMessage.classList.add("hide");
    }
  }

  if (cardForm.checkValidity()) {
    state.cartArray = [];
    state.cartTotalPrice = 0;
    state.promoCodeNY = false;
    state.promoCodeRS = false;
    addApplyCode();
    setCartTotal();
    getEmptyCart();
    const cartContainer = tsQuerySelector(document, ".cart__container");

    cartContainer.innerHTML = `
      <div class="modal">
        <p class='message-order'>Thank you for order <span class='order-timer'>5</span></p>
      </div>`;
    let interval = setInterval(orderTimer, 1000);
    let redirect = setTimeout(() => {
      location.href = LocationHref.home;
    }, 5000);
  }
}
function orderTimer() {
  const orderTimer = tsQuerySelector(document, ".order-timer");
  orderTimer.textContent = String(Number(orderTimer.textContent) - 1);
}
