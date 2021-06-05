import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Flash from './components/base/Flash';
import Navbar from './components/base/Navbar';
import Footer from './components/base/Footer';
import Main from './components/pages/Main';
import Shop from './components/pages/Shop';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Logout from './components/pages/Logout';

//import MetaData from './components/base/MetaData';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flashMessages, setFlashMessages] = useState([]);
  const [cartSize, setCartSize] = useState(null);
  useEffect(() => {
    fetch('/login_status')
    .then(res => res.json())
    .then(data => {
      setIsLoggedIn(data.is_logged_in);
      setCartSize(data.cart_size);
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} cartSize={cartSize} />
        <Flash flashMessages={flashMessages} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/inventory">
            <Shop />
          </Route>
          <Route exact path="/login">
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setFlashMessages={setFlashMessages}
              setCartSize={setCartSize} />
          </Route>
          <Route exact path="/register">
            <Register isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
