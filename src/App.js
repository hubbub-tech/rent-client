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
import EditItem from './components/pages/EditItem';
import EditAccount from './components/pages/EditAccount';
import EditPassword from './components/pages/EditPassword';
import ExtendRental from './components/pages/ExtendRental';
import EarlyReturn from './components/pages/EarlyReturn';
import EditUserAddress from './components/pages/EditUserAddress';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [flashMessages, setFlashMessages] = useState([]);
  useEffect(() => {
    fetch('/login/status')
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
        <Flash flashMessages={flashMessages} setFlashMessages={setFlashMessages} />
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
          <Route exact path="/accounts/i/edit/id=:itemId">
            <EditItem setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/accounts/u/edit">
            <EditAccount setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/accounts/u/address">
            <EditUserAddress setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/accounts/u/password">
            <EditPassword setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/accounts/o/extend/id=:orderId">
            <ExtendRental setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/accounts/o/early/id=:orderId">
            <EarlyReturn setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/checkout">
            <Checkout setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/accounts/u/id=:userId">
            <Account myId={userId} setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/accounts/u/orders">
            <Rentals setFlashMessages={setFlashMessages} />
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
