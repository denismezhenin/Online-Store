/* eslint-disable no-param-reassign */
/* eslint-disable import/newline-after-import */

/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable default-case */
/* eslint-disable import/no-cycle */
import { Acc, IProduct, Query } from '../../components/constants';
import { tsQuerySelectorAll } from '../../components/helpers';
import addItems from './items';
import { setViewMode } from './viewmode';

const createOptionObject = (array: any, option1: string, option2: string): {} =>
  array.reduce((acc: Acc, item: any) => {
    acc[item[option1].toLocaleLowerCase()] = acc[
      item[option1].toLocaleLowerCase()
    ]
      ? acc[item[option1].toLocaleLowerCase()] + 1
      : 1;
    acc[item[option2].toLocaleLowerCase()] = acc[
      item[option2].toLocaleLowerCase()
    ]
      ? acc[item[option2].toLocaleLowerCase()] + 1
      : 1;
    return acc;
  }, {});

const setOptionCounts = (totalObj: {}, viewObj: {}): void => {
  const li = tsQuerySelectorAll(document, '.selections-variants__item');
  li.forEach((item) => {
    const el = item.children[0];
    const total = totalObj[el.id as keyof {}];
    const view = viewObj[el.id as keyof {}] ? viewObj[el.id as keyof {}] : 0;
    item.children[2].textContent = `(${view}/${total})`;
  });
};

const filterByValue = (
  category: string,
  arrValues: string[],
  arr: Array<IProduct>
): Array<IProduct> =>
  arr.filter((item) =>
    arrValues.includes(String(item[category as keyof IProduct]!).toLowerCase())
  );

const filterByRange = (
  category: string,
  arrValues: string[],
  arr: Array<IProduct>
): Array<IProduct> =>
  arr.filter(
    (item) =>
      arrValues[0] <= item[category as keyof IProduct]! &&
      arrValues[1] >= item[category as keyof IProduct]!
  );
const filterBySearch = (str: string, arr: Array<IProduct>): Array<IProduct> =>
  arr.filter((item) => {
    for (const value of Object.values(item)) {
      if (String(value).toLocaleLowerCase().startsWith(str)) {
        return true;
      }
    }
  });

const filterBySort = (type: string, arr: Array<IProduct>) => {
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
const searchItems = async (data: Array<IProduct>) => {
  let filteredArr: Array<IProduct> = data.slice();
  const totalOptionCategoryCount = createOptionObject(
    filteredArr,
    Query.category,
    Query.brand
  );
  const searchParams = new URLSearchParams(`${window.location.hash}`.slice(1));

  if (searchParams.has(Query.category)) {
    filteredArr = filterByValue(
      Query.category,
      searchParams.getAll(Query.category),
      filteredArr
    );
  }
  if (searchParams.has(Query.brand)) {
    filteredArr = filterByValue(
      Query.brand,
      searchParams.getAll(Query.brand),
      filteredArr
    );
  }
  if (searchParams.has(Query.priceMin) && searchParams.has(Query.priceMax)) {
    const filtersArr = [
      searchParams.get(Query.priceMin)!,
      searchParams.get(Query.priceMax)!,
    ];
    filteredArr = filterByRange(Query.price, filtersArr, filteredArr);
  }
  if (searchParams.has(Query.stockMin) && searchParams.has(Query.stockMax)) {
    const filtersArr = [
      searchParams.get(Query.stockMin)!,
      searchParams.get(Query.stockMax)!,
    ];
    filteredArr = filterByRange(Query.stock, filtersArr, filteredArr);
  }
  if (searchParams.has(Query.search)) {
    filteredArr = filterBySearch(searchParams.get(Query.search)!, filteredArr);
  }
  if (searchParams.has(Query.sort)) {
    filteredArr = filterBySort(searchParams.get(Query.sort)!, filteredArr)!;
  }
  if (searchParams.has(Query.view)) {
    setViewMode(searchParams.get(Query.view)!);
  }

  const viewOptionCategoryCount = createOptionObject(
    filteredArr,
    Query.category,
    Query.brand
  );
  setOptionCounts(totalOptionCategoryCount, viewOptionCategoryCount);
  addItems('products-list', filteredArr);
};
export default searchItems;
