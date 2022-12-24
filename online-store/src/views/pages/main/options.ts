import { tsQuerySelector, tsQuerySelectorAll } from '../../components/helpers'

export const setOptions = (parent: string, option: string, data: any) => {
  const optionsSet = new Set();
  const array = data.products;
  // console.log(Ar(a))
  for (let item of array) {
    optionsSet.add(item[option])
  }
  const el = document.querySelector(`.${parent}`)!
  for (let value of optionsSet) {
    const li: any = document.createElement('li');
    const input: any = document.createElement('input');
    const label: any = document.createElement('label');
    if (typeof value === 'string') {
      input.id = value.toLocaleLowerCase();
    }
    input.type = 'checkbox';
    // label.for = value
    label.setAttribute('for', `${value}`);
    label.textContent = value
    li.append(input)
    li.append(label)
    el.append(li)
  }
}

// category.addEventListener('clock', () => {
//   tsQuerySelectorAll(category, 'input').forEach(item => {
//     if(item.checked) {
//       console.log(item.id)
//     }
//   })
// })