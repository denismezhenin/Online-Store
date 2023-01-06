import { tsQuerySelectorAll, tsQuerySelector } from '../../components/helpers';
import { searchItems } from './search';
import productItems from "../../components/productJSON";
import { Query } from '../../components/constants';

export const setListeners = (category: string):void => {
  const list = tsQuerySelector(document, `.${category}`);
  list.addEventListener('click', () => {
    deleteQueryParams(category);
    tsQuerySelectorAll(list, 'input').forEach((item: any)=> {
      if(item.checked) {
        setQueryMultiParams(`${category}`, (item.id).toLowerCase());
      }
    })
  })
}

export const setQueryMultiParams = (category: string, item: string):void => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
  const paramsArr = searchParams.getAll(category);
  if (paramsArr.includes(`${item}`)) {
    return;
  }
  searchParams.append(category, item);
  location.hash = '' + searchParams.toString();
}

export const setQueryParam = (category: string, value: string):void => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
  searchParams.set(category, value);
  location.hash = '' + searchParams.toString();
}

export const deleteQueryParams = (category: string):void => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
  searchParams.delete(category);
  location.hash = '' + searchParams.toString();
}

export const setParamsFromHash = ():void => {
  const searchParams = new URLSearchParams((`${location.hash}`).slice(1));
  if (searchParams.has(Query.category) || searchParams.has(Query.brand)) { 
    const paramsArr = [...searchParams.getAll(Query.category), ...searchParams.getAll(Query.brand)];
    tsQuerySelectorAll(document, 'input[type="checkbox"]').forEach(item => {
      if (paramsArr.includes(((item).id).toLocaleLowerCase())) {
        (item as HTMLInputElement).checked = true;
      }
    })
  } 

  if (searchParams.has('search')) {
    tsQuerySelector<HTMLInputElement>(document, '.products-search__input').value = searchParams.get(Query.search)!; 
  }
    if (searchParams.has('sort')) {
      tsQuerySelector<HTMLSelectElement>(document, '.product-select__options').value = searchParams.get(Query.sort)!; 
    }
}