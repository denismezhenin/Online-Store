/* eslint-disable import/no-named-as-default */
import { Query } from '../../components/constants';
import homePageHtml from './homepage';
import { rangeContainer, setRange } from '../../components/range';
import  setOptions  from './options';
import productItems from '../../components/productItems';
import { tsQuerySelector } from '../../components/helpers';
import setSearch from './searchElement';
import { setListeners, setParamsFromHash } from './queryParams';
import searchItems from './search';
import setSortParam from './sort';
import setFiltersButton  from './resetAndCopy';
import { setViewListeners } from './viewmode';
import { clickProductList } from './productList';

const Home = {
  render: async () => homePageHtml,
  after_render: async () => {
    setOptions();
    await searchItems(productItems.products);
    setRange(rangeContainer);
    setListeners(Query.category);
    setListeners(Query.brand);
    setParamsFromHash();
    const productsList = tsQuerySelector(document, '.products-list');
    productsList.addEventListener('click', clickProductList);
    setSearch();
    setSortParam();
    setFiltersButton();
    setViewListeners();
  },
};

export default Home;
