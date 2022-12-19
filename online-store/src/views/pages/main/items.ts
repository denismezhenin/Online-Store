import { tsQuerySelector, tsQuerySelectorAll } from "../../components/helpers";

export let priceMax: number = 0;
export let priceMin: number = Infinity;
export let quantityMin: number = Infinity;
export let quantityMax: number = 0;

export const addItems = async (parent: string, data: any) => {
  // const rangePriceMin = tsQuerySelectorAll(document, '.range-values__min')[0]
  const array = data.products;
  const el = document.querySelector(`.${parent}`)!
  for (let item of array) {
    const li: any = document.createElement('li');
    // const img = document.createElement('img');
    const name = document.createElement('span');
    const cartButton = document.createElement('button');
    const detailsButton = document.createElement('button');
    const price = document.createElement('span');
    cartButton.textContent = 'Add to card';
    detailsButton.textContent = 'Details';
    price.textContent = `${item.price}$`;
    name.textContent = item.title;
    li.style.backgroundImage = `url('${item.images[0]}')`
    li.classList.add('list-item')
    li.append(name)
    li.append(price)
    li.append(cartButton)
    li.append(detailsButton)
    el.append(li)
    // rangePriceMin.textContent = (Math.min(Number(rangePriceMin.textContent), item.price )).toString()
    priceMin = Math.max(priceMin, item.price)
    priceMax = Math.max(priceMax, item.price)
    quantityMin = Math.min(quantityMin, item.stock)
    quantityMax = Math.max(quantityMax, item.stock)
  }
}




