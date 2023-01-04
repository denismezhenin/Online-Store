import { tsQuerySelector } from "../../components/helpers";
import { setQueryParam } from './queryParams';
import productItems from "../../components/productJSON";
import { searchItems } from "./search";

export const setSearch = () => {
  const inputSearch = tsQuerySelector<HTMLInputElement>(document, ".products-search__input");

  inputSearch.addEventListener("input", () => {
    // console.log(inputSearch.value)
    if (inputSearch.value === '') {
      const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
      searchParams.delete('search')
      return location.hash = '' + searchParams.toString();
    }
    setQueryParam('search', (inputSearch.value).toLocaleLowerCase())
    // searchItems(productItems.products)
    // let baseUrl =
    //   window.location.protocol +
    //   "//" +
    //   window.location.host +
    //   window.location.pathname;

    // if (inputSearch.value.length > 0) {
    //   let link = `?search=${inputSearch.value}`;
    //   let newUrl = baseUrl + link;

    //   history.pushState(null, "", newUrl);
    // } else {
    //   history.pushState(null, "", baseUrl);
    // }
  });
};
