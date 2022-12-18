export const addItems = (parent: string, data: any) => {
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
  }
}