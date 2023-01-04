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
export enum CardNumber {
  maxLength = 16,
}
export enum CardValid {
  maxLength = 5,
  maxMonth = 12,
  numLengthMonth = 2,
  separator = "/",
  separatorMonth = "/12",
}
export enum CardLogo {
  noLogo = "https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71",
  visaNumber = "4",
  visaLogo = '"https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png"',
  mastercardNumber = "5",
  mastercardLogo = "https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg",
  unionpayNumber = "6",
  unionpayLogo = "https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png",
  firstNumber = 0,
}
export enum CardCvv {
  maxLength = 3,
}
export enum LocationHref {
  home = "/",
  cart = "/#/cart",
}
