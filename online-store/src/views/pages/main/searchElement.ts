import { tsQuerySelector } from "../../components/helpers";
import { setQueryParam } from './queryParams';
import productItems from "../../components/productJSON";
import { searchItems } from "./search";
import { Query } from "../../components/constants";

export const setSearch = () => {
  const inputSearch = tsQuerySelector<HTMLInputElement>(document, ".products-search__input");

  inputSearch.addEventListener("input", () => {
    if (inputSearch.value === '') {
      const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
      searchParams.delete(Query.search);
      return location.hash = '' + searchParams.toString();
    }
    setQueryParam('search', (inputSearch.value).toLocaleLowerCase());
  });
};
