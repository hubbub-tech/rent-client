import React from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';

import { Route, Routes } from 'react-router-dom';

import Flash from './base/Flash';
import { Footer } from './base/Footer';
import { Navbar } from './base/Navbar';

import { Index as Cart } from './views/cart';
import { Index as Checkout } from './views/checkout';

import { Index as OrderHistory } from './views/orders';

import { Index as ExtendRental } from './views/extend';
import { Index as ExtendCheckout } from './views/extend/checkout';

import { Index as Login } from './views/auth/login';
import { Index as ItemFeed } from './views/items/feed';
import { Index as ItemDetails } from './views/items/details';

import { PageNotFound } from './views/errors/E404';
import { Story } from './views/static/Story';
import { Faqs } from './views/static/Faqs';

import { useAnalytics } from './hooks/Analytics';


export const AppContext = React.createContext({
  userId: Cookies.get('userId'),
  sessionToken: Cookies.get('sessionToken'),
});

const App = () => {
  const userId = Cookies.get('userId');
  const sessionToken = Cookies.get('sessionToken');

  const [flashMessages, setFlashMessages] = useState([]);

  useAnalytics(userId);

  return (
    <AppContext.Provider value={{ userId , sessionToken }}>
      <div className="App">
        <Navbar isLoggedIn={true} />
        <Flash flashMessages={flashMessages} setFlashMessages={setFlashMessages} />
        <Routes>

          <Route exact path="/cart" element={<Cart />} />

          <Route exact path="/checkout/:status" element={<Checkout />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/items/feed" element={<ItemFeed />} />

          <Route exact path="/item/:itemId" element={<ItemDetails />} />

          <Route exact path="/orders/history" element={<OrderHistory />} />

          <Route exact path="/orders/extend/:orderId" element={<ExtendRental />} />

          <Route exact path="/extend/:status" element={<ExtendCheckout />} />

          <Route exact path="/story" element={<Story />} />

          <Route exact path="/faqs" element={<Faqs />} />

          <Route element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
