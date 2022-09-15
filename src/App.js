import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { Route, Routes, Navigate } from 'react-router-dom';

import Flash from './base/Flash';
import Navbar from './base/Navbar';
import Footer from './base/Footer';

import { Index as Cart } from './views/cart';
import { Index as Checkout } from './views/checkout';

import { Index as Login } from './views/auth/login';
import { Index as ItemFeed } from './views/items/feed';
import { Index as ItemDetails } from './views/items/details';

import { PageNotFound } from './views/errors/E404';
import { Story } from './views/static/Story';
import { Faqs } from './views/static/Faqs';

import { useAnalytics } from './base/Analytics';

import { parseCookies } from './helper.js'


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
