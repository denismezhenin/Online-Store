let Navbar = {
    render: async () => {
        let view =  /*html*/`
             
                        

                       

                    <div class="navbar-menu " >
                        <div class="navbar-start">
                            <a class="navbar-item" href="/#/">
                                Home
                            </a>
                            <a class="navbar-item" href="/#/about">
                                About
                            </a>
                            <a class="navbar-item" href="/#/secret">
                                basket
                            </a>
                        </div>
                       
        `
        return view
    },
    after_render: async () => { }

}

export default Navbar;