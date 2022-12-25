import { tsQuerySelectorAll, tsQuerySelector } from '../../components/helpers';
import { searchItems } from './search';
import productItems from "../../components/productJSON";

export const setListeners = (category: string) => {
  const list = tsQuerySelector(document, `.${category}`)
  list.addEventListener('click', () => {
    deleteQueryParams(category)
    tsQuerySelectorAll(list, 'input').forEach((item: any)=> {
      if(item.checked) {
        setQueryParams(`${category}`, (item.id).toLowerCase())
      }
    })
    // searchItems(productItems.products)
  })
}

export const setQueryParams = (category: string, item: string) => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
  const paramsArr = searchParams.getAll(category)
  if (paramsArr.includes(`${item}`)) {
    return
  }
  searchParams.append(category, item)
  location.hash = '' + searchParams.toString();
}

export const setQueryRangeParams = (category: string, value: string) => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
  searchParams.set(category, value)
  location.hash = '' + searchParams.toString();
}

export const deleteQueryParams = (category: string) => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
  searchParams.delete(category)
  location.hash = '' + searchParams.toString();
}

export const setParamsFromHash = () => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(1))
  // console.log(searchParams.toString())
  if (searchParams.has('category') || searchParams.has('brand')) {
    const paramsArr = [...searchParams.getAll('category'), ...searchParams.getAll('brand')]
    tsQuerySelectorAll(document, 'input[type="checkbox"]').forEach(item => {
      if (paramsArr.includes(((item).id).toLocaleLowerCase())) {
        (item as HTMLInputElement).checked = true
      }
    })
    // console.log(document.querySelectorAll("input"))
  } if (searchParams.has('stock-min') && searchParams.has('stock-max')) {
    (tsQuerySelector(document, '.stock__min-value') as HTMLInputElement).value = searchParams.get('stock-min')!;
    (tsQuerySelector(document, '.stock__max-value') as HTMLInputElement).value = searchParams.get('stock-max')!;
  } if (searchParams.has('price-min') && searchParams.has('price-max')) {
    (tsQuerySelector(document, '.price__min-value') as HTMLInputElement).value = searchParams.get('price-min')!;
    (tsQuerySelector(document, '.price__max-value') as HTMLInputElement).value = searchParams.get('price-max')!;
  }
  if (searchParams.has('search')) {
    (tsQuerySelector(document, '.products-search__input') as HTMLInputElement).value = searchParams.get('search')!;
  }
    if (searchParams.has('sort')) {
      (tsQuerySelector(document, '.product-select__options') as HTMLSelectElement).value = searchParams.get('sort')!
    }
}