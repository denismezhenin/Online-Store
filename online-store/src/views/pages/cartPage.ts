import { setCartTotal } from "../components/state";
import productItems from "../components/productJSON";
import Utils from "../../services/Utils";
import { state } from "../components/state";
import { tsQuerySelector, tsQuerySelectorAll } from "../components/helpers";
import { AmountChangeTotal, PriceChangeTotal } from "../components/constants";

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
              <input
                class="person--name card-form__item"
                type="text"
                placeholder="Name"
              />
              <input
                class="perso-phone-number card-form__item"
                type="text"
                placeholder="Phone number"
              />
              <input
                class="person-address card-form__item"
                type="text"
                placeholder="Delivery address"
              />
              <input
                class="person-email card-form__item"
                type="email"
                placeholder="E-mail"
              />
            </div>
            <div class="card-details">
              <h2 class="card-title">Credit card details</h2>
              <div class="card-data">
                <div class="card-data-number">
                  <img class="card-img"
                    src="https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71"
                    alt="img"
                  />
                  <input
                    class="card-number__input"
                    type="tеxt"
                    inputmode="numeric"
                    pattern="[0-9]{4}\\s[0-9]{4}\\s[0-9]{4}\\s[0-9]{4}"
                    autocomplete="cc-number"
                    maxlength="19"
                    placeholder="xxxx xxxx xxxx xxxx"
                  />
                </div>
                <div class="card-data-other">
                  <div class="card-valid-data">
                    <label class="card-valid__text" for="card-valid">Valid:</label>
                    <input
                      class="card-valid"
                      id="card-valid"
                      type="tel"
                      inputmode="numeric"
                      pattern="[0-9]{2}[\]?[0-9]{2}"
                      autocomplete="cc-number"
                      maxlength="4"
                      placeholder="xx/xx"
                    />
                  </div>
                  <div class="card-cvv-data">
                    <label class="card-cvv__text" for="ccv">CCV:</label>
                    <input
                      class="cvv"
                      id="ccv"
                      type="tel"
                      inputmode="numeric"
                      pattern="[[0-9]{3}"
                      autocomplete="cc-number"
                      maxlength="3"
                      placeholder="xxx"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button class="confirm__button">CONFIRM</button>
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

  const productAmount = target.parentNode?.childNodes[3] as HTMLElement;
  const productPrice = target.parentNode?.parentNode?.childNodes[5]
    .childNodes[1] as HTMLElement;
  const cartProductDescription = document.querySelectorAll(
    ".cart-product-description"
  );
  let productCount = state.cartArray.find(
    (item) => item.id === Number(target.id)
  );
  let findProductId = Number(
    state.cartArray.find((item) => item.id === Number(target.id))?.price
  );

  if ((productCount?.count as number) >= 1) {
    if (productCount?.count) {
      productCount.count -= 1;
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
}

export function incrementProduct(e: Event) {
  if (!(e.target instanceof HTMLElement)) return;
  const target = e.target;

  const productAmount = target.parentNode
    ?.childNodes[3] as HTMLParagraphElement;
  const productPrice = target.parentNode?.parentNode?.childNodes[5]
    .childNodes[1] as HTMLElement;

  let productCount = state.cartArray.find(
    (item) => item.id === Number(target.id)
  );
  let findProductId = Number(
    state.cartArray.find((item) => item.id === Number(target.id))?.price
  );

  if (productCount?.count) {
    productCount.count += 1;
  }

  productAmount.textContent = String(productCount?.count);
  productPrice.innerHTML = `${findProductId * Number(productCount?.count)}`;

  changeTotal(AmountChangeTotal.classElement, AmountChangeTotal.classResult);
  changeTotal(PriceChangeTotal.classElement, PriceChangeTotal.classResult);
  setCartTotal();
}

export function getEmptyCart() {
  const cartContainer = tsQuerySelector(document, ".cart__container");
  cartContainer.innerHTML = "Cart is empty";
}
