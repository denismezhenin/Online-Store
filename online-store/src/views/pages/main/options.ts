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
    input.id = value;
    input.type = 'checkbox';
    label.for = value
    label.textContent = value
    li.append(input)
    li.append(label)
    el.append(li)
  }
}