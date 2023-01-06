import { IProduct, Query } from "./../../components/constants";
import homePageHtml from "./homepage";
import { rangeContainer, setRange } from "../../components/range";
import { setOptions } from "./options";
import productItems from "../../components/productJSON";
import { addItems } from "./items";
import { tsQuerySelectorAll, tsQuerySelector  } from "../../components/helpers";
import Utils from "../../../services/Utils";
import { setSearch } from "./searchElement";
import { setListeners, setParamsFromHash } from "./queryParams";
import { searchItems } from './search'
import { setSortParam } from "./sort";
import { setFiltersButton } from "./resetAndCopy";
import { setViewListeners } from "./viewmode";
import { state } from "../../components/state";
import { checkProducts } from "./productList";
import { clickProductList } from "./productList";

tsQuerySelector
let Home = {
  render: async () => {
    return homePageHtml;
  },
  after_render: async () => {
    setOptions();
    await searchItems(productItems.products);
    setRange(rangeContainer);
    setListeners(Query.category);
    setListeners(Query.brand);
    setParamsFromHash();
    const productsList = tsQuerySelector(document, ".products-list");
    productsList.addEventListener("click", clickProductList);
    setSearch();
    setSortParam()
    setFiltersButton()
    setViewListeners()
  },
};

export default Home;
