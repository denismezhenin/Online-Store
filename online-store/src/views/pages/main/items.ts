import { tsQuerySelector, tsQuerySelectorAll } from "../../components/helpers";
import { rangeContainer, fillSlider, pricesArray, stockArray } from "../../components/range";

export const addItems = async (parent: string, data: any) => {
  const el = tsQuerySelector(document, `.${parent}`)
  const arrCount = tsQuerySelector(document, `.products-found__count`)
  if (data.length === 0) {
    arrCount.textContent = '0'
    return el.innerHTML = 'No products found'
  }
  arrCount.textContent = data.length
  let priceMax: number = data[0].price;
  let priceMin: number = data[0].price;
  let quantityMin: number = data[0].stock;
  let quantityMax: number = data[0].stock;
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
  setRangeValues(priceMin, priceMax, quantityMin, quantityMax )
}

const setRangeValues = (priceMin: number, priceMax: number, quantityMin: number, quantityMax: number) => {
  const minsText = tsQuerySelectorAll(document, '.range-values__min')
  const maxText = tsQuerySelectorAll(document, '.range-values__max');
  const minsRange = tsQuerySelectorAll(document, '.min-value')
  const maxRange = tsQuerySelectorAll(document, '.max-value');
  if (minsText) {
    [minsText[0].textContent, minsText[1].textContent] = [`${priceMin}`, `${quantityMin}`];
    [(minsRange[0] as HTMLInputElement).value, (minsRange[1] as HTMLInputElement).value] = [`${pricesArray.indexOf(priceMin)}`, `${stockArray.indexOf(quantityMin)}`]
  }
  if (maxText) {
  [maxText[0].textContent, maxText[1].textContent] = [`${priceMax}`, `${quantityMax}`];
  [(maxRange[0] as HTMLInputElement).value, (maxRange[1] as HTMLInputElement).value] = [`${pricesArray.indexOf(priceMax)}`, `${stockArray.indexOf(quantityMax)}`]
  }
  fillSlider(rangeContainer[0], '#C6C6C6', '#25daa5')
  fillSlider(rangeContainer[1], '#C6C6C6', '#25daa5')
}




