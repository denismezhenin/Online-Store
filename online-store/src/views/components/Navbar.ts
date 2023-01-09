const Navbar = {
  render: async () => {
    const view = `
                <div class="header__wrapper">
                     <div class="navbar-menu " >
                        <div class="navbar-start">
                            <a class="navbar" href="/#">
                            🛍 Online Store
                            </a>
                        </div>
                    </div>
                    <p class="header-total-price">
                        Cart total: $<span class="header-cart-total">0</span>
                    </p>
                    <div class="header-cart">
                        <a class="navbar-item" href="/#/cart">
                                <img class="header-cart__img" src="cart.png" alt="cart" />
                                <p class="header-cart__counter">0</p>
                            </a>
                    </div>
                </div>     
        `;
    return view;
  },
  after_render: async () => {},
};

export default Navbar;
