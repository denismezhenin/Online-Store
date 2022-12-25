
export interface IProduct{
    id?: number,
    title?: string,
    description?: string,
    price?: number,
    discountPercentage?: number,
    rating?: number,
    stock?: number,
    brand?: string,
    category?: string,
    thumbnail?: string,
    images?: string[]
}
export interface IState{
    cartArray: Array<IProduct>
}
export let state:IState={
    cartArray: []
}

export function getLocalStorage() {
    if (localStorage.getItem("state")) {
      const temp = JSON.parse(localStorage.getItem("state") as string );
      state={...temp}
    }
  }
window.addEventListener("load", getLocalStorage);
