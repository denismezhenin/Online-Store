import { tsQuerySelector, tsQuerySelectorAll } from "../../components/helpers";



export const addItems = async (parent: string, data: any) => {
  let priceMax: number = 0;
let priceMin: number = Infinity;
let quantityMin: number = Infinity;
let quantityMax: number = 0;
  const mins = tsQuerySelectorAll(document, '.range-values__min')
  const max = tsQuerySelectorAll(document, '.range-values__max');
  const el = tsQuerySelector(document, `.${parent}`)
  if (data.length === 0) {
    return el.innerHTML = 'No products found'
  }
  el.innerHTML = ''
  for (let item of data) {
    const li: any = document.createElement('li');
    li.id = item.id;
    const name = document.createElement('span');
    const cartButton = document.createElement('button');
    const detailsButton = document.createElement('button');
    const price = document.createElement('span');
    cartButton.textContent = 'Add to card';
    cartButton.classList.add('cart__button')
    detailsButton.textContent = 'Details';
    detailsButton.classList.add('details__button')
    price.textContent = `${item.price}$`;
    name.textContent = item.title;
    li.style.background = `url('${item.thumbnail}') center / cover no-repeat`;
    li.classList.add('list-item');
    li.append(name);
    li.append(price);
    li.append(cartButton);
    li.append(detailsButton);
    el.append(li);
    priceMin = Math.min(priceMin, item.price);
    priceMax = Math.max(priceMax, item.price);
    quantityMin = Math.min(quantityMin, item.stock);
    quantityMax = Math.max(quantityMax, item.stock);
  }
  mins[0].textContent = `${priceMin}`;
  mins[1].textContent = `${quantityMin}`;
  max[0].textContent = `${priceMax}`;
  max[1].textContent = `${quantityMax}`;
}




