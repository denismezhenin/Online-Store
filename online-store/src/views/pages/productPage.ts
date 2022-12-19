export function getProductHtml() {
  return `
    <div class="product__container">
      <div class="product-path">
        <p class="product-path__link">STORE</p>
        <span> >> </span>
        <p class="product-path__link">SMARTPHONE</p>
        <span> >> </span>
        <p class="product-path__link">APPLE</p>
        <span> >> </span>
        <p class="product-path__link">IPHONE 9</p>
      </div>
      <div class="product-about__container">
        <div class="product-about__title">
          <p class="about-product__title">iPHONE 9</p>
        </div>
        <div class="description__container">
          <div class="product-photo__container">
            <div class="product-small-photo">
              <img
                class="small-photo__img"
                alt="Slide"
                src="https://i.dummyjson.com/data/products/1/1.jpg"
              />
              <img
                class="small-photo__img"
                alt="Slide"
                src="https://i.dummyjson.com/data/products/1/1.jpg"
              />
              <img
                class="small-photo__img"
                alt="Slide"
                src="https://i.dummyjson.com/data/products/1/1.jpg"
              />
            </div>
            <div class="product-large-photo">
              <img
                class="large-photo__img"
                alt=""
                src="https://i.dummyjson.com/data/products/1/1.jpg"
              />
            </div>
          </div>
          <div class="product-info">
            <div class="description info__container">
              <p class="description-title product-info__title">Description:</p>
              <p class="description-content product-info__content">
                An apple mobile which is nothing like apple
              </p>
            </div>
            <div class="discount-percentage info__container">
              <p class="discount-title product-info__title">Discount Percentage:</p>
              <p class="discount-content product-info__content">12.96</p>
            </div>
            <div class="rating info__container">
              <p class="rating-title product-info__title">Rating:</p>
              <p class="rating-content product-info__content">4.69</p>
            </div>
            <div class="stock info__container">
              <p class="stock-title product-info__title">Stock:</p>
              <p class="stock-content product-info__content">94</p>
            </div>
            <div class="brand info__container">
              <p class="brand-title product-info__title">Brand:</p>
              <p class="brand-content product-info__content">Apple</p>
            </div>
            <div class="category info__container">
              <p class="category-title product-info__title">Category:</p>
              <p class="category-content product-info__content">smartphones</p>
            </div>
          </div>
          <div class="product-price__container">
            <p class="product-price">$1000</p>
            <button class="product-price__button add-cart__button">ADD TO CART</button>
            <button class="product-price__button buy-now__button">BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
    `;
}
