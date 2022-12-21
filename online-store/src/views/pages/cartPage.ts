export function getCartHtml() {
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
      <div class="cart-product-description">
        <p class="product-number-items">1</p>
        <div class="cart-product__image">
          <img class="product__image" src="https://i.dummyjson.com/data/products/3/thumbnail.jpg" alt="img">
        </div>
        <div class="product-description__container">
          <h3 class="product-description-title">Samsung Universe 9</h3>
          <span class="line-span"></span>
          <p class="product-decription-content"> Samsung's new variant which goes beyond Galaxy to the Universe </p>
          <div class="product-description-other">
              <p class="product-rating">Rating:4.09</p>
              <p class="product-discount">Discount: 15.46%</p>
          </div>
        </div>
        <div class="product-control-container">
          <p class="stock-control">Stock</p>
          <div class="amount-control">
            <button class="product-amount__button">-</button>
            <p class="product-amount">1</p>
            <button class="product-amount__button">+</button>
          </div>
          <p class="amount-price-control">$1000</p>
        </div>
      </div>
    </div>
    <div class="summary__container">
      <h2 class="summary-title">Summary</h2>
      <div class="summary-description">
          <p class="summary-products">Products: <span>1</span></p>
          <p class="summary-total-price">Total: <span>$1000</span></p>
          <input type="text" class="summary-discount__input" placeholder="Enter promo code">
          <p class="promo-code-example">Promo for test: 'RS', 'EPM'</p>
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
  const modal = document.querySelector(".modal") as HTMLElement;
  modal.classList.remove("closed-modal");
}
export function removeModal(event: Event): void {
  const modal = document.querySelector(".modal") as HTMLElement;
  let target = event.target as HTMLElement;
    if (target.classList.contains("modal")) {
    modal.classList.add("closed-modal");
  }
}
