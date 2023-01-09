import { setCartTotal } from "../../components/state";
import { IProduct, LocationHref } from "../../components/constants";
import productItems from "../../components/productJSON";
import Utils from "../../../services/Utils";
import { state } from "../../components/state";
import { tsQuerySelector } from "../../components/helpers";

export function getProductHtml() {
  const array = productItems.products;
  let target = Utils.parseRequestURL();

  const targetObject = array.find((item) => item.id === Number(target.id));

  return `
    <div class="product__container">
      <div class="product-path">
        <p class="product-path__link">STORE</p>
        <span> >> </span>
        <p class="product-path__link">${targetObject?.category.toUpperCase()}</p>
        <span> >> </span>
        <p class="product-path__link">${targetObject?.brand.toUpperCase()}</p>
        <span> >> </span>
        <p class="product-path__link">${targetObject?.title.toUpperCase()}</p>
      </div>
      <div class="product-about__container">
        <div class="product-about__title">
          <p class="about-product__title">${targetObject?.title}</p>
        </div>
        <div class="description__container">
          <div class="product-photo__container">
            <div class="product-small-photo">
            ${targetObject?.images.map((el) => {
              return `
              <img
                class="small-photo__img"
                alt="Slide"
                src=${el}
              />
              `;
            })}
             
            </div>
            <div class="product-large-photo">
              <img
                class="large-photo__img"
                alt=""
                src=${targetObject?.thumbnail}
              />
            </div>
          </div>
          <div class="product-info">
            <div class="description info__container">
              <p class="description-title product-info__title">Description:</p>
              <p class="description-content product-info__content">
              ${targetObject?.description}
              </p>
            </div>
            <div class="discount-percentage info__container">
              <p class="discount-title product-info__title">Discount Percentage:</p>
              <p class="discount-content product-info__content">${
                targetObject?.discountPercentage
              }</p>
            </div>
            <div class="rating info__container">
              <p class="rating-title product-info__title">Rating:</p>
              <p class="rating-content product-info__content">${
                targetObject?.rating
              }</p>
            </div>
            <div class="stock info__container">
              <p class="stock-title product-info__title">Stock:</p>
              <p class="stock-content product-info__content">${
                targetObject?.stock
              }</p>
            </div>
            <div class="brand info__container">
              <p class="brand-title product-info__title">Brand:</p>
              <p class="brand-content product-info__content">${
                targetObject?.brand
              }</p>
            </div>
            <div class="category info__container">
              <p class="category-title product-info__title">Category:</p>
              <p class="category-content product-info__content">${
                targetObject?.category
              }</p>
            </div>
          </div>
          <div class="product-price__container">
            <p class="product-price">$${targetObject?.price}</p>
            <button class="product-price__button product__button add-cart__button button-second-colored button">ADD TO CART</button>
            <button class="product-price__button product__button drop-cart__button hide button-second-colored button">DROP FROM CART</button>
            <button class="product-price__button  buy-now__button button-second-colored button">BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
    `;
}

export function checkProduct() {
  const array = productItems.products;
  let product = Utils.parseRequestURL();
  const addCartButton = tsQuerySelector<HTMLButtonElement>(
    document,
    ".add-cart__button"
  );
  const dropCartButton = tsQuerySelector<HTMLButtonElement>(
    document,
    ".drop-cart__button"
  );
  const productItem = array.find((item) => item.id === Number(product.id));

  if (state.cartArray.find((el) => el.id === (productItem as IProduct).id)) {
    addCartButton.classList.add("hide");
    dropCartButton.classList.remove("hide");
  } else {
    addCartButton.classList.remove("hide");
    dropCartButton.classList.add("hide");
  }
}

export function toggleProduct() {
  const array = productItems.products;
  let product = Utils.parseRequestURL();
  const productItem = array.find((item) => item.id === Number(product.id));
  if (!state.cartArray.find((el) => el.id === (productItem as IProduct).id)) {
    const cartItem = { ...productItem, count: 1 };

    state.cartArray.push(cartItem as IProduct);
  } else {
    state.cartArray = state.cartArray.filter(
      (item) => item.id !== (productItem as IProduct).id
    );
  }
  checkProduct();
  setCartTotal();
}

export function quickBuy() {
  const array = productItems.products;
  let product = Utils.parseRequestURL();
  const productItem = array.find((item) => item.id === Number(product.id));
  if (!state.cartArray.find((el) => el.id === (productItem as IProduct).id)) {
    const cartItem = { ...productItem, count: 1 };

    state.cartArray.push(cartItem);
  }
  checkProduct();
  setCartTotal();
  location.href = LocationHref.cart;
  setTimeout(() => {
    const modal = tsQuerySelector(document, ".modal");
    modal.classList.remove("closed-modal");
  }, 200);
}

export function zoomImage(e: Event) {
  if (!(e.target instanceof HTMLImageElement)) return;
  let target = e.target;
  const productLargePhoto = tsQuerySelector(document, ".product-large-photo");
  productLargePhoto.innerHTML = `<img
  class="large-photo__img"
  alt=""
  src=${target.src}
/>`;
}
