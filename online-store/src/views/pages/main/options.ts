import { tsQuerySelector, tsQuerySelectorAll } from '../../components/helpers'

export const setOptions = (parent: string, option: string, data: any) => {
  const optionsSet = new Set();
  const array = data.products;
  for (let item of array) {
    optionsSet.add(item[option])
  }
  const el = tsQuerySelector(document, `.${parent}`)
  const ul = tsQuerySelector(el, `.selections-variants`)
  for (let value of optionsSet) {
    const li: any = document.createElement('li');
    const input: any = document.createElement('input');
    const label: any = document.createElement('label');
    if (typeof value === 'string') {
      input.id = value.toLocaleLowerCase();
      label.setAttribute('for', value.toLocaleLowerCase());
      label.textContent = value
    }
    input.type = 'checkbox';
    li.append(input)
    li.append(label)
    ul.append(li)
  }
}

// category.addEventListener('clock', () => {
//   tsQuerySelectorAll(category, 'input').forEach(item => {
//     if(item.checked) {
//       console.log(item.id)
//     }
//   })
// })