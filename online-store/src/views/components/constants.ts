export interface IProduct {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
  count?: number;
}
export interface IState {
  cartArray: IProduct[];
  cartTotalPrice: number;
  promoCodeRS: boolean;
  promoCodeNY: boolean;
}
export enum AmountChangeTotal {
  classElement = "product-amount",
  classResult = "summary-products__span",
}
export enum PriceChangeTotal {
  classElement = "amount-price__span",
  classResult = "summary-total__span",
}
export enum markersForRS {
  promo = "Rolling Scopes School",
  button = "rs",
}
export enum markersForNY {
  promo = "Happy New Year",
  button = "ny",
}

export enum ProductButton {
  add = 2,
  drop = 3,
}
export enum ProductCartChilds {
  amount = 3,
  priceParent = 5,
  price = 1,
}

export const counterChange = 1;

export enum Promo {
  rs = `
      <p class="promo">Rolling Scopes School - 10%</p>
      <button class="promo-add__button rs-add__button">Add</button>`,
  newYear = `
      <p class='promo'>Happy New Year - 10%</p>
      <button class="promo-add__button ny-add__button">Add</button>`,
  promoCodeNY = "ny",
  promoCodeRS = "rs",
}

export enum Discount {
  RS = 0.1,
  NY = 0.1,
}

export enum Query {
  brand = 'brand',
  category = 'category',
  search = 'search',
  sort = 'sort',
  price = 'pirce',
  stock = 'stock',
  priceMin = 'price-min',
  priceMax = 'price-max',
  stockMin = 'stock-min',
  stockMax = 'stock-max',
  view = 'view',
  default = 'default',
  priceAcc = 'price-high',
  priceDesc = 'price-low',
  ratingAcc = 'rating-high',
  ratingDesc = 'rating-low'
}

export interface ProductJSON {
  'products': Array<IProduct>
}
