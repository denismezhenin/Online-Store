import { IProduct, ProductJSON } from '../../components/constants';
import { tsQuerySelector, tsQuerySelectorAll } from '../../components/helpers'

export const setOptions = (parent: string, option: any, data: Array<IProduct>):void => {
  const optionsSet = new Set();
  const array = data;

  for (let item of array) {
    optionsSet.add(item[option])
  }
  const el = tsQuerySelector(document, `.${parent}`)
  const ul = tsQuerySelector(el, `.selections-variants`)
  for (let value of optionsSet) {
    const li: HTMLElement = document.createElement('li');
    const input: HTMLInputElement = document.createElement('input');
    const label: HTMLLabelElement = document.createElement('label');
    const div: HTMLElement = document.createElement('div');
    const viewCount: HTMLElement = document.createElement('span');
    // const totalCount: HTMLElement = document.createElement('span');
    // div.classList.add('selections-variants__count-block')
    viewCount.classList.add('selections-variants__count')
    // viewCount.classList.add(`${value}`)
    li.classList.add('selections-variants__item')

    if (typeof value === 'string') {
      input.id = value.toLocaleLowerCase();
      label.setAttribute('for', value.toLocaleLowerCase());
      label.textContent = value
    }
    
    // totalCount.textContent = `${b[option]}`
    // console.log(b[option])
    // if(typeof value === 'string') {
    //   totalCount.textContent = `${b[value]}`
    // }
    // console.log(b[value])
    // console.log(option)
    input.type = 'checkbox';
    li.append(input, label, viewCount)
    // li.append(label)
    ul.append(li)
    // div.append(viewCount)
    // div.append(totalCount)
    // li.append(div)
    // li.append(viewCount)
  }
}

// category.addEventListener('clock', () => {
//   tsQuerySelectorAll(category, 'input').forEach(item => {
//     if(item.checked) {
//       console.log(item.id)
//     }
//   })
// })