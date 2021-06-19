import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Flash from './components/base/Flash';
import Navbar from './components/base/Navbar';
import Footer from './components/base/Footer';
import Main from './components/pages/Main';
import Shop from './components/pages/Shop';
import List from './components/pages/List';
import ItemDetails from './components/pages/ItemDetails';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Logout from './components/requests/Logout';
import CheckoutProcessor from './components/requests/CheckoutProcessor';
import Checkout from './components/pages/Checkout';
import Account from './components/pages/Account';
import Rentals from './components/pages/Rentals';
import Dropoffs from './components/pages/Dropoffs';
import Pickups from './components/pages/Pickups';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userId, setUserId] = useState(null);
  const [flashMessages, setFlashMessages] = useState([]);
  useEffect(() => {
    fetch('/login_status')
    .then(res => res.json())
    .then(data => {
      setUserId(data.user_id);
      setIsLoggedIn(data.user_id ? true : false);
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar userId={userId} isLoggedIn={isLoggedIn} />
        <Flash flashMessages={flashMessages} />
        <Switch>
          <Route exact path="/"><Main /></Route>
          <Route exact path="/inventory">
            <Shop isSearching={false} />
          </Route>
          <Route exact path="/inventory/search=:searchTerm">
            <Shop isSearching={true} />
          </Route>
          <Route exact path="/list">
            <List setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/inventory/i/id=:itemId">
            <ItemDetails
              isLoggedIn={isLoggedIn}
              setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/checkout">
            <Checkout setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/accounts/u/id=:userId">
            <Account isOwner={false} />
          </Route>
          <Route exact path="/accounts/u/orders">
            <Rentals />
          </Route>
          <Route exact path="/schedule/dropoffs/:dropoffDate">
            <Dropoffs setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/schedule/pickups/:pickupDate">
            <Pickups setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/login">
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/register">
            <Register
              setFlashMessages={setFlashMessages}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route exact path="/logout"><Logout /></Route>
          <Route exact path="/checkout/confirmation/token=:token">
            <CheckoutProcessor setFlashMessages={setFlashMessages} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
