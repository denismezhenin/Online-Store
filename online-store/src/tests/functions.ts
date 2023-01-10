import { IProduct, Query } from "../views/components/constants";
import productItems from "../views/components/productItems";

export function sum(a: number, b: number) {
    return a + b;
  }

  export const filterByValue = (
    category: string,
    arrValues: string[],
    arr: Array<IProduct>
  ): Array<IProduct> =>
    arr.filter((item) =>
      arrValues.includes(String(item[category as keyof IProduct]!).toLowerCase())
    );


export const filterBySort = (type: string, arr: Array<IProduct>) => {
  switch (type) {
    case Query.default:
      return arr;
    case Query.priceAcc:
      return arr.sort((a, b) => a.price! - b.price!);
    case Query.priceDesc:
      return arr.sort((a, b) => b.price! - a.price!);
    case Query.ratingAcc:
      return arr.sort((a, b) => a.rating! - b.rating!);
    case Query.ratingDesc:
      return arr.sort((a, b) => b.rating! - a.rating!);
  }
};

export const filterBySearch = (str: string, arr: Array<IProduct>): Array<IProduct> =>
  arr.filter((item) => {
    for (const value of Object.values(item)) {
      if (String(value).toLocaleLowerCase().startsWith(str.toLocaleLowerCase())) {
        return true;
      }
    }
  });

  export const filterByRange = (
    category: string,
    arrValues: string[],
    arr: Array<IProduct>
  ): Array<IProduct> =>
    arr.filter(
      (item) =>
        arrValues[0] <= item[category as keyof IProduct]! &&
        arrValues[1] >= item[category as keyof IProduct]!
);