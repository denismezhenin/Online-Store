import { IProduct } from "./../../components/constants";
import homePageHtml from "./homepage";
import { rangeContainer, setRange } from "../../components/range";
import { setOptions } from "./options";
import productItems from "../../components/productJSON";
import { addItems } from "./items";
import { tsQuerySelectorAll, tsQuerySelector } from "../../components/helpers";
import Utils from "../../../services/Utils";
import { setSearch } from "./searchElement";
import { setListeners } from "./queryParams";
import { state } from "../../components/state";
import { checkProducts } from "./productList";
import { clickProductList } from "./productList";

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
    await addItems("products-list", productItems.products);
    setListeners("category");
    setListeners("brand");
    const productsList = tsQuerySelector(document, ".products-list");

    productsList.addEventListener("click", clickProductList);

    checkProducts();
    setSearch();

    const inputSearch = tsQuerySelector<HTMLInputElement>(
      document,
      ".products-search__input"
    );

    if (window.location.search && inputSearch.value.length === 0) {
      inputSearch.value = window.location.search.split("=").slice(1).join();
    }
  },
};

export default Home;
