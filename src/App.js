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

import { Index as Feed } from './views/items/feed';

import { parseCookies } from './helper.js'

const App = () => {
  const hubbubId = Cookies.get('hubbubId');
  const hubbubToken = Cookies.get('hubbubToken');
  const isLoggedIn = hubbubId !== undefined && hubbubToken !== undefined;
  const [flashMessages, setFlashMessages] = useState([]);

  useAnalytics(hubbubId);
  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} />
      <Flash flashMessages={flashMessages} setFlashMessages={setFlashMessages} />
      <Routes>
        <Route exact path="/" element={<Main setFlashMessages={setFlashMessages} />} />

        <Route exact path="/items/feed" element={<Feed />} />

        <Route exact path="/story" element={<Story />} />

        <Route exact path="/faqs" element={<Faqs setFlashMessages={setFlashMessages} />} />

        <Route element={<Error404 setFlashMessages={setFlashMessages }/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
