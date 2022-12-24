"use strict";
import './styles/style.scss';
import Home from './views/pages/main/home'
import Cart from './views/pages/cart'
import Error404 from './views/pages/error404.js'
import Product from './views/pages/product.ts'
import Navbar from './views/components/Navbar.js'
import Bottombar from './views/components/Bottombar.js'
import Utils from './services/Utils.ts'
import { searchItems } from './views/pages/main/search';
import productItems from './views/components/productJSON'

let isLoaded = false
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

    // Render the Header and footer of the page
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    // console.log(request)
    // if((request.resource).startsWith('?')) {
    //     return
    // }
    
    if ((request.resource === undefined) && isLoaded) {
        // content.innerHTML = await Home.render()
        // await Home.after_render()
        searchItems(productItems.products)
        return isLoaded = true
    } 
    else if ((request.resource === undefined) && !isLoaded) {
        content.innerHTML = await Home.render()
        await Home.after_render()
        return isLoaded = true
    }
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    // console.log(page)
    // if ()
    content.innerHTML = await page.render();
    await page.after_render();
    if(request.resource === 'cart' || request.resource === 'product') {
        return isLoaded = false
    }
    isLoaded = true
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

