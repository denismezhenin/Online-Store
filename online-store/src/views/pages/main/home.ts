// --------------------------------
//  Define Data Sources
// --------------------------------

import homePageHtml from './homepage'
import { rangeContainer, setRange  } from '../../components/range'
import { setOptions } from './options'
import productItems from '../../components/productJSON';
import { addItems, priceMax, quantityMax, quantityMin } from './items'
import { tsQuerySelectorAll } from '../../components/helpers'
 
let Home = {
  render: async () => {
    return homePageHtml;
  },
  after_render: async () => {
    setRange (rangeContainer)
    const filterCategories = ['category', 'brand']
    document.querySelectorAll('.filters-selections').forEach((item: any, index: number) => {    
      setOptions(filterCategories[index], filterCategories[index], productItems)
    })
    await addItems('products-list', productItems)
    // const mins = tsQuerySelectorAll(document, '.range-values__min')
    // const max = tsQuerySelectorAll(document, '.range-values__max');
    // console.log(priceMin)
    // mins[0].textContent = `${priceMin}`
  },
};

export default Home;
