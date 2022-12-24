let Navbar = {
    render: async () => {
        let view = /*html*/ `
                     <div class="navbar-menu " >
                        <div class="navbar-start">
                            <a class="navbar-item" href="/#">
                                Home
                            </a>
                            
                            <a class="navbar-item" href="/#/cart">
                                Cart
                            </a>
                        </div>
                    </div>
                       
        `;
        return view;
    },
    after_render: async () => { },
};

export default Navbar;
