const homePageHtml = `
<aside class="filters">
<div class="filters-buttons">
<button class="button__reset">Reset Filters</button>
<button class="button__copy">Copy Link</button>
</div>
<div class="filters-selections selections category">
  <div class="selections-name">
    <span class="">Category</span>
  </div>
  <ul class="selections-variants"></ul>
</div>
<div class="filters-selections selections brand">
  <div class="selections-name">
    <span class="">Brand</span>
  </div>
  <ul class="selections-variants"></ul>
</div>
<div class="filters-range range price">
  <div class="selections-name">
    <span class="">Price</span>
  </div>
  <div class="range-values">
    <span class="range-values__min"></span>
    <span class="range-values__max"></span>
  </div>
  <div class="range-sliders">
    <input class="min-value price__min-value range-sliders__input" type="range">
    <input class="max-value price__max-value range-sliders__input" type="range">
  </div>
</div>
<div class="filters-range range stock">
  <div class="selections-name">
    <span class="">Stock</span>
  </div>
  <div class="range-values">
    <span class="range-values__min"></span>
    <span class="range-values__max"></span>
  </div>
  <div class="range-sliders">
    <input class="min-value stock__min-value range-sliders__input" type="range">
    <input class="max-value stock__max-value range-sliders__input" type="range">
  </div>
</div>
</aside>
<section class="products">
  <div class="products-header">
    <div class="products-select">
      <select name="sort" class="product-select__options">
        <option value="default" selected>Sort options</option>
        <option value="price-high">Price: Low to High</option>
        <option value="price-low">Price: High to Low</option>
        <option value="rating-high">Rating: Low to High</option>
        <option value="rating-low">Rating: High to Low</option>
      </select>
    </div>
    <div class="products-found">
      <span class="products-found__text">Found:</span>
      <span class="products-found__count"></span>
    </div>
    <form class="product-search">
      <input type="search" class="products-search__input" placeholder="Search product" >
    </form>
    <div class="products-view-mode view">
      <div class="view__list">
      <span class="view__list-line"></span>
      </div>
      <div class="view__card">
        <span class="view__card-dot">.</span>
        <span class="view__card-dot">.</span>
        <span class="view__card-dot">.</span>
        <span class="view__card-dot">.</span>
        <span class="view__card-dot">.</span>
        <span class="view__card-dot">.</span>
      </div>
    </div>
  </div>
  <ul class="products-list list card-mode"></ul>
</section>
`;
export default homePageHtml;
