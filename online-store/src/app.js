"use strict";
import './styles/style.scss';
import Home from './views/pages/main/home'
import Cart from './views/pages/cart/cart'
import Error404 from './views/pages/error404.ts'
import Product from './views/pages/product/product.ts'
import Navbar from './views/components/Navbar.js'
import Bottombar from './views/components/Bottombar.js'
import Utils from './services/Utils.ts'
import { searchItems } from './views/pages/main/search';
import productItems from './views/components/productJSON'
import { renderProductList } from './views/pages/cart/cartPage';

let isLoaded = false
let cartLoaded = false
// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/': Home
    , '/cart': Cart
    , '/product/:id': Product

};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const footer = null || document.getElementById('footer_container');


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    if ((request.resource === undefined) && isLoaded) {
        searchItems(productItems.products)
        return isLoaded = true
    } 
    else if ((request.resource === undefined) && !isLoaded) {
        header.innerHTML = await Navbar.render();
        await Navbar.after_render();
        footer.innerHTML = await Bottombar.render();
        await Bottombar.after_render();
        content.innerHTML = await Home.render()
        await Home.after_render()
        return isLoaded = true

    }

    if (String(request.resource).startsWith('cart?') && cartLoaded) {
        // console.log(true) 
        renderProductList()
        return 
    } else if (String(request.resource).startsWith('cart?') && !cartLoaded){
        header.innerHTML = await Navbar.render();
        await Navbar.after_render();
        footer.innerHTML = await Bottombar.render();
        await Bottombar.after_render();
        content.innerHTML = await Cart.render()
        await Cart.after_render()
        return cartLoaded = true
    }

    // Render the Header and footer of the page
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();



    // console.log(request.resource)
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead 

    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
    if(request.resource === 'cart' || request.resource === 'product') {
        cartLoaded = true
        return isLoaded = false
    }
    isLoaded = true
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

