import { IProduct } from "./../components/state";
import { getProductHtml, toggleProduct } from "./productPage";
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

    const productButton = document.querySelectorAll(".product__button");
    productButton.forEach((el) => el.addEventListener("click", toggleProduct));
  },
};

export default Product;
