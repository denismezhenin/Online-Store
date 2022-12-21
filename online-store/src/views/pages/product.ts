import { getProductHtml } from "./productPage";

let Product = {
  render: async () => {
    let view = getProductHtml();

    return view;
  },
  after_render: async () => {},
};

export default Product;
