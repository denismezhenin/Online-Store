import { tsQuerySelector } from "../../components/helpers"
import { setQueryParam } from "./queryParams";



export const setViewListeners = () => {
  tsQuerySelector(document, '.products-view-mode').addEventListener('click', (e: Event) => {
    if (!(e.target instanceof HTMLElement)) return;
    const {target} = e;
    if (target.classList.contains('view__card')) {
      setQueryParam('view', 'card');
    }
    if (target.classList.contains('view__list')) {
      setQueryParam('view', 'list');
    }

  } )
}

export const setViewMode = (value: string) => {
  const productList = tsQuerySelector(document, '.products-list')
  if (value === 'card') {
    productList.classList.contains('list-mode') ?  productList.classList.remove('list-mode') : null;
    productList.classList.add('card-mode');
  }
  if (value === 'list') {
    productList.classList.contains('card-mode') ?  productList.classList.remove('card-mode') : null;
    productList.classList.add('list-mode');
  }
}