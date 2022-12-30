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
