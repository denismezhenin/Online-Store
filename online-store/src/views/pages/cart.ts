import { state } from "../components/state";
import { getCartHtml, getModal, getProductList, removeModal } from "./cartPage";
import { changeTotal } from "./cartPage";

let Cart = {
  render: async () => {
    let view = getCartHtml();
    return view;
  },

  after_render: async () => {
    const summaryBuyButton = document.querySelector(
      ".summary-buy__button"
    ) as HTMLElement;
    summaryBuyButton.addEventListener("click", getModal);

    const modal = document.querySelector(".modal") as HTMLElement;
    modal.addEventListener("click", removeModal);

    const cartUl = document.querySelector(".cart__ul") as HTMLUListElement;
    let productList = getProductList();
    cartUl.innerHTML = productList;
    changeTotal("product-amount", "summary-products__span");
    changeTotal("amount-price__span", "summary-total__span");

    cartUl.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const productAmount = target.parentNode
        ?.childNodes[3] as HTMLParagraphElement;
      const cartProductDescription = document.querySelectorAll(
        ".cart-product-description"
      );

      if ((target as HTMLElement).classList.contains("minus")) {
        const amountValue = Number(
          (target as HTMLElement).parentNode?.childNodes[3].textContent
        );
        let findProductId = Number(
          state.cartArray.find((item) => item.id === Number(target.id))?.price
        );
        if (amountValue > 1) {
          productAmount.textContent = String(amountValue - 1);
          (
            target.parentNode?.parentNode?.childNodes[5]
              .childNodes[1] as HTMLElement
          ).textContent = `${
            findProductId * Number(productAmount.textContent)
          }`;
        }
        if (amountValue === 1) {
          console.log(target.id);
          state.cartArray = state.cartArray.filter(
            (item) => item.id !== Number(target.id)
          );

          cartProductDescription.forEach((el) => {
            if (el.id === target.id) {
              el.remove();
            }
          });
        }
        changeTotal("product-amount", "summary-products__span");
        changeTotal("amount-price__span", "summary-total__span");
      }
      if ((target as HTMLElement).classList.contains("plus")) {
        const amountValue = Number(
          (target as HTMLElement).parentNode?.childNodes[3].textContent
        );
        let findProductId = Number(
          state.cartArray.find((item) => item.id === Number(target.id))?.price
        );
        productAmount.textContent = String(amountValue + 1);
        (
          target.parentNode?.parentNode?.childNodes[5]
            .childNodes[1] as HTMLElement
        ).innerHTML = `${findProductId * Number(productAmount.textContent)}`;

        changeTotal("product-amount", "summary-products__span");
        changeTotal("amount-price__span", "summary-total__span");
      }
    });
  },
};

export default Cart;
