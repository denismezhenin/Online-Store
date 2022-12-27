import { IProduct, setCartTotal } from "./../components/state";
import { getProductHtml, quickBuy, toggleProduct } from "./productPage";
import productItems from "../components/productJSON";
import Utils from "../../services/Utils";
import { state } from "../components/state";
import { checkProduct } from "./productPage";
let Product = {
  render: async () => {
    let view = getProductHtml();

    return view;
  },
  after_render: async () => {
    checkProduct();
   setCartTotal()
    const productButton = document.querySelectorAll(".product__button");
    productButton.forEach((el) => el.addEventListener("click", toggleProduct));

    const buyNowButton=document.querySelector('.buy-now__button')
    buyNowButton?.addEventListener('click',quickBuy)
  },
};

export default Product;
