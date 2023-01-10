/* eslint-disable consistent-return */

/* eslint-disable no-return-assign */

import './styles/style.scss';
import Home from './views/pages/main/home';
import Cart from './views/pages/cart/cart';
import Error404 from './views/pages/error404';
import Product from './views/pages/product/product';
import Navbar from './views/components/Navbar';
import Bottombar from './views/components/Bottombar';
import Utils from './services/Utils';
import searchItems from './views/pages/main/search';
import { productItems } from './views/components/productItems';
import { renderProductList } from './views/pages/cart/cartPage';

let isLoaded = false;
let cartLoaded = false;


const routes = {
  '/': Home,
  '/cart': Cart,
  '/product/:id': Product,
};

const router = async () => {
  const header =
    null || (document.getElementById('header_container'));
  const content =
    null || (document.getElementById('page_container'));
  const footer =
    null || (document.getElementById('footer_container'));

  const request = Utils.parseRequestURL();

  const parsedURL =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  if (request.resource === undefined && isLoaded) {
    searchItems(productItems.products);
    return (isLoaded = true);
  }
  if (request.resource === undefined && !isLoaded) {
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();
    content.innerHTML = await Home.render();
    await Home.after_render();
    return (isLoaded = true);
  }

  if (String(request.resource).startsWith('cart?') && cartLoaded) {
    renderProductList();
    return;
  }
  if (String(request.resource).startsWith('cart?') && !cartLoaded) {
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();
    content.innerHTML = await Cart.render();
    await Cart.after_render();
    return (cartLoaded = true);
  }

  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer.innerHTML = await Bottombar.render();
  await Bottombar.after_render();

  const page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
  if (request.resource === 'cart' || request.resource === 'product') {
    cartLoaded = true;

    return (isLoaded = false);
  }
  isLoaded = true;
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);
