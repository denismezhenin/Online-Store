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
    const li = await createProductItem(item)
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

const createProductItem = async (item: any) => {
  const li: HTMLElement = document.createElement('li');
  const itemName: HTMLElement = document.createElement('span');
  const price: HTMLElement = document.createElement('span');
  // const image: HTMLImageElement = document.createElement('img');
  const image: HTMLElement = document.createElement('div');
  const informationWrapper: HTMLElement = document.createElement('div');
  const buttonWrapper: HTMLElement = document.createElement('div');
  const cartButton:HTMLButtonElement = document.createElement('button');
  const detailsButton:HTMLButtonElement = document.createElement('button');
  const itemCategory: HTMLElement = document.createElement('span');
  const itemBrand: HTMLElement = document.createElement('span');
  const itemPrice: HTMLElement = document.createElement('span');
  const itemDiscount: HTMLElement = document.createElement('span');
  const itemRating: HTMLElement = document.createElement('span');
  const itemStock: HTMLElement = document.createElement('span');
  li.id = item.id;
  // li.classList.add(`products-list__item`);
  li.classList.add('list-item');
  li.classList.add(`item`);
  cartButton.textContent = 'Add to card';
  cartButton.classList.add('cart__button');
  detailsButton.textContent = 'Details';
  detailsButton.classList.add('details__button');
  image.classList.add('item__image');
  const imageUrl = await item.thumbnail;
  image.style.background = `url('${imageUrl}')`;
  // image.style.background = `url('${item.thumbnail}') center / cover no-repeat`;
  // image.src = `${item.thumbnail}`;
  price.textContent = `${item.price}$`;
  itemName.textContent = item.title;
  itemName.classList.add('item__name');
  buttonWrapper.classList.add('item__buttons-wrapper');
  buttonWrapper.append(cartButton);
  buttonWrapper.append(detailsButton);
  informationWrapper.classList.add('item__information')
  itemCategory.textContent = `Category: ${item.category}`
  itemBrand.textContent = `Brand: ${item.brand}`
  itemPrice.textContent = `Price: ${item.price}$`
  itemDiscount.textContent = `Discount: ${item.discountPercentage}%`
  itemRating.textContent = `Rating: ${item.rating}`
  itemStock.textContent = `Stock: ${item.stock}`
  informationWrapper.append(itemCategory)
  informationWrapper.append(itemBrand)
  informationWrapper.append(itemPrice)
  informationWrapper.append(itemDiscount)
  informationWrapper.append(itemRating)
  informationWrapper.append(itemStock)
  li.append(itemName);
  li.append(price);
  li.append(buttonWrapper);
  li.append(image);
  li.append(informationWrapper);
  return li
}




