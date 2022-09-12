import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';
import { Route, Routes, Navigate } from 'react-router-dom';

import Flash from './base/Flash';
import Navbar from './base/Navbar';
import Footer from './base/Footer';
import useAnalytics from './base/Analytics';

import Main from './components/pages/Main';

import Story from './components/static/Story';
import Faqs from './components/static/Faqs';
import Error404 from './components/static/Error404';

import { Index as ItemFeed } from './views/items/feed';
import { Index as ItemDetails } from './views/items/details';

import { parseCookies } from './helper.js'


export const UserContext = React.createContext();

const App = () => {
  const userId = Cookies.get('userId');
  const sessionToken = Cookies.get('sessionToken');

  const [flashMessages, setFlashMessages] = useState([]);

  useAnalytics(userId);

  return (
    <UserContext.Provider value={{ userId , sessionToken }}>
      <div className="App">
        <Navbar isLoggedIn={true} />
        <Flash flashMessages={flashMessages} setFlashMessages={setFlashMessages} />
        <Routes>
          <Route exact path="/" element={<Main setFlashMessages={setFlashMessages} />} />

          <Route exact path="/items/feed" element={<ItemFeed />} />

          <Route exact path="/item/:itemId" element={<ItemDetails />} />

          <Route exact path="/story" element={<Story />} />

          <Route exact path="/faqs" element={<Faqs setFlashMessages={setFlashMessages} />} />

          <Route element={<Error404 setFlashMessages={setFlashMessages }/>} />
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
