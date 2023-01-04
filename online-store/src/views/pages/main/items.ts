import { Messages } from "../../components/constants";
import { tsQuerySelector, tsQuerySelectorAll } from "../../components/helpers";
import { rangeContainer, fillSlider, pricesArray, stockArray, setRangeValues } from "../../components/range";
import { checkProducts } from "./productList";

export const addItems = async (parent: string, data: any) => {
  const el = tsQuerySelector(document, `.${parent}`)
  const arrCount = tsQuerySelector(document, `.products-found__count`)
  if (data.length === 0) {
    arrCount.textContent = '0'
    return el.innerHTML = Messages.noProducts 
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
  setRangeValues(priceMin, priceMax, quantityMin, quantityMax)
  checkProducts()
}

const createProductItem = async (item: any) => {
  const li: HTMLElement = document.createElement('li');
  const itemName: HTMLElement = document.createElement('span');
  const price: HTMLElement = document.createElement('span');
  const imageWrapper: HTMLElement = document.createElement('div');
  const image: HTMLImageElement = document.createElement('img');
  const informationWrapper: HTMLElement = document.createElement('div');
  const buttonWrapper: HTMLElement = document.createElement('div');
  const cartButton:HTMLButtonElement = document.createElement('button');
  const detailsButton:HTMLButtonElement = document.createElement('button');
  const dropItemButton:HTMLButtonElement = document.createElement('button');
  const itemCategory: HTMLElement = document.createElement('span');
  const itemBrand: HTMLElement = document.createElement('span');
  const itemPrice: HTMLElement = document.createElement('span');
  const itemDiscount: HTMLElement = document.createElement('span');
  const itemRating: HTMLElement = document.createElement('span');
  const itemStock: HTMLElement = document.createElement('span');
  li.id = item.id;
  li.classList.add('list-item');
  li.classList.add(`item`);
  cartButton.textContent = 'Add to card';
  cartButton.classList.add('cart__button', 'item__button', 'buttons');
  detailsButton.textContent = 'Details';
  detailsButton.classList.add('details__button', 'item__button', 'buttons');
  dropItemButton.textContent = 'Drop to cart';
  dropItemButton.classList.add('drop-item__button', 'item__button', 'hide', 'buttons')
  imageWrapper.classList.add('item__image-wrapper', 'image-wrapper');
  const imageUrl = await item.thumbnail;
  image.src = imageUrl;
  image.classList.add('image-wrapper__img')
  price.classList.add('item__price')
  price.textContent = `${item.price}$`;
  itemName.textContent = item.title;
  itemName.classList.add('item__name');
  buttonWrapper.classList.add('item__buttons-wrapper');
  buttonWrapper.append(cartButton, dropItemButton, detailsButton);
  informationWrapper.classList.add('item__information')
  itemCategory.textContent = `Category: ${item.category}`
  itemBrand.textContent = `Brand: ${item.brand}`
  itemPrice.textContent = `Price: ${item.price}$`
  itemDiscount.textContent = `Discount: ${item.discountPercentage}%`
  itemRating.textContent = `Rating: ${item.rating}`
  itemStock.textContent = `Stock: ${item.stock}`
  informationWrapper.append(itemCategory, itemBrand, itemPrice, itemDiscount, itemRating, itemStock)
  imageWrapper.append(image)
  li.append(itemName, price, imageWrapper, informationWrapper, buttonWrapper);
  return li
}




