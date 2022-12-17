import { getCartHtml } from "./cartPage.js";

let Cart = {
    render: async () => {
        let view = getCartHtml()
        return view
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {

    }
}

export default Cart;