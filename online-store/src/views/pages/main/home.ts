// --------------------------------
//  Define Data Sources
// --------------------------------

import homePageHtml from "./homepage";
import { rangeContainer, setRange } from "../../components/range";
import { setOptions } from "./options";
import productItems from "../../components/productJSON";
import { addItems } from "./items";
import { tsQuerySelectorAll } from "../../components/helpers";
import Utils from "../../../services/Utils";
import { setSearch } from "./searchElement";

let Home = {
  render: async () => {
    return homePageHtml;
  },
  after_render: async () => {
    setRange(rangeContainer);
    const filterCategories = ["category", "brand"];
    document
      .querySelectorAll(".filters-selections")
      .forEach((item: any, index: number) => {
        setOptions(
          filterCategories[index],
          filterCategories[index],
          productItems
        );
      });
    await addItems("products-list", productItems);

    const productsList = document.querySelector(
      ".products-list"
    ) as HTMLElement;

    productsList.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      console.log(target.parentNode);
      if (target.classList.contains("list-item")) {
        let link = `/#/product/${target.id}`;
        location.href = link;
      }
      if (
        (target.parentNode as HTMLElement).classList.contains("list-item") &&
        target.classList.contains("details__button")
      ) {
        let link = `/#/product/${(target.parentNode as HTMLElement).id}`;
        location.href = link;
      }
    });

    setSearch();

    const inputSearch = document.querySelector(
      ".products-search__input"
    ) as HTMLInputElement;

    if (window.location.search && inputSearch.value.length === 0) {
      inputSearch.value = window.location.search.split("=").slice(1).join();
    }
  },
};

export default Home;
