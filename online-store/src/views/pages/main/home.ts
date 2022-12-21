// --------------------------------
//  Define Data Sources
// --------------------------------

import homePageHtml from "./homepage";
import { rangeContainer, setRange } from "../../components/range";
import { setOptions } from "./options";
import productItems from "../../components/productJSON";
import { addItems } from "./items";
import { tsQuerySelectorAll, tsQuerySelector } from '../../components/helpers'
import Utils from "../../../services/Utils";
import { setListeners } from "./queryParams";
 
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
    setListeners()
    const productsList = document.querySelector(
      ".products-list"
    ) as HTMLElement;

    productsList.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains("list-item")) {
        let link = `/#/product/${target.id}`;
        location.href = link;
      }
    });
  },
};

export default Home;
