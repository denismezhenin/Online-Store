// --------------------------------
//  Define Data Sources
// --------------------------------

import homePageHtml from './homepage'
import { rangeContainer, setRange  } from '../../components/range'
import { setOptions } from './options'
import productItems from '../../components/productJSON';
import { addItems } from './items'
import { tsQuerySelectorAll, tsQuerySelector } from '../../components/helpers'
 
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
    await addItems('products-list', productItems);
    // console.log(location.pathname)
    // location.href = `${location.href}#/cart`
    // console.log(location.href)
    const category = tsQuerySelector(document, '.category')
console.log(category)
category.addEventListener('click', () => {
  tsQuerySelectorAll(category, 'input').forEach((item: any)=> {
    if(item.checked) {
      console.log(item.id)
    }
  })
})
  },
};

export default Home;
