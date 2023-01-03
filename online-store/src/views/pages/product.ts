import { setCartTotal } from "./../components/state";
import { getProductHtml, quickBuy, toggleProduct } from "./productPage";
import { checkProduct } from "./productPage";
import { zoomImage } from "./productPage";
import { tsQuerySelector, tsQuerySelectorAll } from "../components/helpers";
let Product = {
  render: async () => {
    let view = getProductHtml();

    return view;
  },
  after_render: async () => {
    checkProduct();
    setCartTotal();
    const productButton = tsQuerySelectorAll(document, ".product__button");
    productButton.forEach((el) => el.addEventListener("click", toggleProduct));

    const buyNowButton = tsQuerySelector(document, ".buy-now__button");
    buyNowButton?.addEventListener("click", quickBuy);

    const smallPhotoImage = tsQuerySelectorAll(document, ".small-photo__img");
    smallPhotoImage.forEach((item) => {
      item.addEventListener("click", zoomImage);
    });
  },
};

export default Product;
