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
  items: number;
  cartPage: number;
  maxCartPage: number;
}

export enum MarkersForRS {
  promo = 'Rolling Scopes School',
  button = 'rs',
}
export enum MarkersForNY {
  promo = 'Happy New Year',
  button = 'ny',
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
  promoCodeNY = 'ny',
  promoCodeRS = 'rs',
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
  price = 'price',
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
  ratingDesc = 'rating-low',
  limit = 'limit',
  page = 'page',
}
export interface ProductJSON {
  products: Array<IProduct>;
}

export enum Messages {
  noProducts = 'No products found',
  error = 'Something went wrong',
  copied = 'Copied!',
}

export enum CardNumber {
  maxLength = 16,
}
export enum CardValid {
  maxLength = 5,
  maxMonth = 12,
  numLengthMonth = 2,
  separator = '/',
  separatorMonth = '12/',
}
export enum CardLogo {
  noLogo = 'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71',
  visaNumber = '4',
  visaLogo = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png',
  mastercardNumber = '5',
  mastercardLogo = 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg',
  unionpayNumber = '6',
  unionpayLogo = 'https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png',
  firstNumber = 0,
}
export enum CardCvv {
  maxLength = 3,
}
export enum LocationHref {
  home = '/',
  cart = '/#/cart',
}

export const allQueryParams = [
  Query.brand,
  Query.category,
  Query.sort,
  Query.search,
  Query.priceMax,
  Query.priceMin,
  Query.stockMax,
  Query.stockMin,
  Query.view,
];

export type Acc = {
  [key: string]: number;
};