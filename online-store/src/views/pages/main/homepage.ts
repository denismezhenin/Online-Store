function OnSearch(input:HTMLInputElement) {
  const inputSearch=document.querySelector('.products-search__input') as HTMLInputElement
  console.log("The current value of the search field: " + input.value);
}
const homePageHtml = `
<aside class="filters">
<button>Reset Filters</button>
<button>Copy Link</button>
<div class="filters-selections selections category">
  <div class="selections-name">
    <span class="">Category</span>
  </div>
  <ul class="selections-variants"></г>
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
    <input class="min-value price__min-value range-sliders__input" value="10" type="range" min="10" max="1749">
    <input class="max-value price__max-value range-sliders__input" value="1749" type="range" min="10" max="1749">
  </div>
</div>
<div class="filters-range range stock">
  <div class="selections-name">
    <span class="">Price</span>
  </div>
  <div class="range-values">
    <span class="range-values__min"></span>
    <span class="range-values__max"></span>
  </div>
  <div class="range-sliders">
    <input class="min-value stock__min-value range-sliders__input" value="2" type="range" min="2" max="150">
    <input class="max-value stock__max-value range-sliders__input" value="150" type="range" min="2" max="150">
  </div>
</div>
</aside>
<section class="products">
  <div class="products-header">
    <div class="products-select">
      <select name="sort" class="product-select__options">
        <option value="default" selected>Sort options</option>
        <option value="price-high">Price: Low to High"</option>
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
      <input type="search" class="products-search__input" placeholder="Search product" incremental="incremental"  >
    </form>
    <div class="view-mode"></div>
  </div>
  <ul class="products-list list"></ul>
</section>
`;
export default homePageHtml;
