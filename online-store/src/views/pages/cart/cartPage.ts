import { CardLogo } from './../../components/constants';
import { ProductCartChilds, counterChange } from "../../components/constants";
import { setCartTotal } from "../../components/state";
import productItems from "../../components/productJSON";
import Utils from "../../../services/Utils";
import { state } from "../../components/state";
import { tsQuerySelector, tsQuerySelectorAll } from "../../components/helpers";
import {
  AmountChangeTotal,
  PriceChangeTotal,
} from "../../components/constants";
import { crossOutTotalPrice } from "./helperSummary";

export function getCartHtml() {
  const array = productItems.products;
  let target = Utils.parseRequestURL();

  const targetObject = array.find((item) => item.id === Number(target.id));
  return `
    <div class="cart__container">
    <div class="product-in-cart__container">
      <div class="product-title">
        <h2 class="product-title__h2">Product</h2>
        <div class="product-title__controls">
          <div class="title-items">
            <p>Items</p>
            <input type="text" class="title-items__input" value="1" />
          </div>
          <div class="title-page">
            <p>Page</p>
            <button class="product-page__button"><</button>
            <p class="product-num-page">1</p>
            <button class="product-page__button">></button>
          </div>
        </div>
      </div>
      <ul class="cart__ul"></ul>
    </div>
    <div class="summary__container">
      <h2 class="summary-title">Summary</h2>
      <div class="summary-description">
          <p class="summary-products">Products: <span class="summary-products__span"></span></p>
          <p class="summary-total-price">Total: $<span class="summary-total__span"></span></p>
          <input type="text" class="summary-discount__input" placeholder="Enter promo code">
          <div class="promo-code__container"></div>
          <p class="promo-code-example">Promo for test: 'RS', 'NY'</p>
          <button class="summary-buy__button">BUY NOW</button>
      </div>
    </div>
    <div class="modal closed-modal">
        <div class="modal-content">
          <form class="card-form">
            <div class="person-details">
              <h2 class="person-details__title">Personal details</h2>
              <div class="input__container">
              <input
                class="person--name card-form__item"
                required
                pattern="[A-Za-zА-Яа-яЁё]{3,}[\\s][A-Za-zА-Яа-яЁё]{3,}"
                type="text"
                placeholder="Name"
              />
             <p class="error-message hide">error</p> 
              </div>
              <div class="input__container">
              <input
                class="perso-phone-number card-form__item"
                type="text"
                pattern="[\\+]\\d{9,}"
                required
                placeholder="Phone number"
              />
              <p class="error-message hide">error</p> 
              </div>
              <div class="input__container">
              <input
                class="person-address card-form__item"
                type="text"
                pattern="[A-Za-zА-Яа-яЁё0-9]{5,}[\\s][A-Za-zА-Яа-яЁё0-9]{5,}[\\s][A-Za-zА-Яа-яЁё0-9]{5,}"
                required
                placeholder="Delivery address"
              />
              <p class="error-message hide">error</p> 
              </div>
              <div class="input__container">
              <input
                class="person-email card-form__item"
                type="email"
                required
                placeholder="E-mail"
              />
              <p class="error-message hide">error</p> 
              </div>
            </div>
            <div class="card-details">
              <h2 class="card-title">Credit card details</h2>
              <div class="card-data">
                <div class="card-data-number">
                  <img class="card-img"
                    src=${CardLogo.noLogo}
                    alt=""
                  />
                  <input
                    class="card-number__input card-validation"
                    type="tеxt"
                    inputmode="numeric"
                    pattern="[0-9]{16}"
                    required
                    autocomplete="cc-number"
                    maxlength="16"
                    placeholder="xxxx xxxx xxxx xxxx"
                  />
                </div>
                <div class="card-data-other">
                  <div class="card-valid-data">
                    <label class="card-valid__text" for="card-valid">Valid:</label>
                    <input
                      class="card-valid card-validation"
                      id="card-valid"
                      type="tel"
                      inputmode="numeric"
                      pattern="[0-9]{2}[/]?[0-9]{2}"
                      required
                      autocomplete="cc-number"
                      maxlength="5"
                      placeholder="xx/xx"
                    />
                  </div>
                  <div class="card-cvv-data">
                    <label class="card-cvv__text" for="ccv">CCV:</label>
                    <input
                      class="cvv card-validation"
                      id="ccv"
                      type="tel"
                      inputmode="numeric"
                      required
                      pattern="[[0-9]{3}"
                      autocomplete="cc-number"
                      maxlength="3"
                      placeholder="xxx"
                    />
                  </div>
                </div>
              </div>
            </div>
            <p class="card-error-message number-message hide">Card number - error</p>
            <p class="card-error-message valid-message hide">Card valid - error</p>
            <p class="card-error-message cvv-message hide">Card CVV - error</p>
            <button type="submit" class="confirm__button">CONFIRM</button>
          </form>
        </div>
      </div>
  </div>
    `;
}

export function getModal(): void {
  const modal = tsQuerySelector(document, ".modal");
  modal.classList.remove("closed-modal");
}
export function removeModal(event: Event): void {
  const modal = tsQuerySelector(document, ".modal");
  if (!(event.target instanceof HTMLElement)) return;
  let target = event.target;
  if (target.classList.contains("modal")) {
    modal.classList.add("closed-modal");
  }
}
export function getProductList() {
  return state.cartArray
    .map((item, index) => {
      return `
    <li class="cart-product-description" id=${item.id} >
    <p class="product-number-items">${index + 1}</p>
    <div class="cart-product__image">
      <img class="product__image" src=${item?.thumbnail} alt="img">
    </div>
    <div class="product-description__container">
      <h3 class="product-description-title">${item?.title}</h3>
      <span class="line-span"></span>
      <p class="product-decription-content">${item?.description}</p>
      <div class="product-description-other">
          <p class="product-rating">Rating: ${item?.rating}</p>
          <p class="product-discount">Discount: ${item?.discountPercentage}</p>
      </div>
    </div>
    <div class="product-control-container">
      <p class="stock-control">Stock</p>
      <div class="amount-control">
        <button class="product-amount__button minus" id=${item.id}>-</button>
        <p class="product-amount">${item.count}</p></p>
        <button class="product-amount__button plus" id=${item.id}>+</button>
      </div>
      <p class="amount-price-control"><span>$</span><span class="amount-price__span">${
        item.price && item.count ? item.price * item.count : ""
      }</span></p>
    </div>
  </li>
    `;
    })
    .join();
}

export function changeTotal(classElement: string, classResult: string) {
  let counter: number = 0;

  const classList = tsQuerySelectorAll(document, `.${classElement}`);
  const result = tsQuerySelector(document, `.${classResult}`);

  classList.forEach((item) => {
    counter = Number(item.textContent) + Number(counter);
  });

  result.innerHTML = `${counter}`;
}

export function decrementProduct(e: Event) {
  if (!(e.target instanceof HTMLElement)) return;
  const target = e.target;

  const productAmount = target.parentNode?.childNodes[
    ProductCartChilds.amount
  ] as HTMLElement;
  const productPrice = target.parentNode?.parentNode?.childNodes[
    ProductCartChilds.priceParent
  ].childNodes[ProductCartChilds.price] as HTMLElement;
  const cartProductDescription = document.querySelectorAll(
    ".cart-product-description"
  );
  let productCount = state.cartArray.find(
    (item) => item.id === Number(target.id)
  );
  let findProductId = Number(
    state.cartArray.find((item) => item.id === Number(target.id))?.price
  );

  if (Number(productCount?.count) >= counterChange) {
    if (productCount?.count) {
      productCount.count -= counterChange;
    }
    productAmount.textContent = String(productCount?.count);
    productPrice.textContent = `${findProductId * Number(productCount?.count)}`;
  }

  if (productCount?.count === 0) {
    state.cartArray = state.cartArray.filter(
      (item) => item.id !== Number(target.id)
    );

    cartProductDescription.forEach((el) => {
      if (el.id === target.id) {
        el.remove();
      }
    });
  }
  changeTotal(AmountChangeTotal.classElement, AmountChangeTotal.classResult);
  changeTotal(PriceChangeTotal.classElement, PriceChangeTotal.classResult);
  setCartTotal();
  crossOutTotalPrice();
}

export function incrementProduct(e: Event) {
  if (!(e.target instanceof HTMLElement)) return;
  const target = e.target;

  const productAmount = target.parentNode?.childNodes[
    ProductCartChilds.amount
  ] as HTMLParagraphElement;
  const productPrice = target.parentNode?.parentNode?.childNodes[
    ProductCartChilds.priceParent
  ].childNodes[ProductCartChilds.price] as HTMLElement;

  let productCount = state.cartArray.find(
    (item) => item.id === Number(target.id)
  );
  let findProductId = Number(
    state.cartArray.find((item) => item.id === Number(target.id))?.price
  );

  if (productCount?.count) {
    productCount.count += counterChange;
  }

  productAmount.textContent = String(productCount?.count);
  productPrice.innerHTML = `${findProductId * Number(productCount?.count)}`;

  changeTotal(AmountChangeTotal.classElement, AmountChangeTotal.classResult);
  changeTotal(PriceChangeTotal.classElement, PriceChangeTotal.classResult);
  setCartTotal();
  crossOutTotalPrice();
}

export function getEmptyCart() {
  const cartContainer = tsQuerySelector(document, ".cart__container");
  cartContainer.innerHTML = "Cart is empty";
}