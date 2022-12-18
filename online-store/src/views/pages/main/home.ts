// --------------------------------
//  Define Data Sources
// --------------------------------

import homePageHtml from './homepage'
import { rangeContainer, setRange  } from '../../components/range'
import { setOptions } from './options'
import productItems from '../../components/productJSON';
import { addItems } from './items'
 
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
    addItems('products-list', productItems)
  },
};

export default Home;
