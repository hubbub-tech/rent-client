import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Flash from './components/base/Flash';
import Navbar from './components/base/Navbar';
import Footer from './components/base/Footer';
import Main from './components/pages/Main';
import Shop from './components/pages/Shop';
import ListItem from './components/pages/ListItem';
import ItemDetails from './components/pages/ItemDetails';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Logout from './components/requests/Logout';
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

import Story from './components/static/Story';
import Faqs from './components/static/Faqs';

const App = () => {
  const [flashMessages, setFlashMessages] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['userId', 'auth', 'cartSize', 'isLoggedIn']);
  return (
    <Router>
      <div className="App">
        <Navbar
          cookies={cookies}
        />
        <Flash
          flashMessages={flashMessages}
          setFlashMessages={setFlashMessages}
        />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/inventory">
            <Shop isSearching={false} />
          </Route>
          <Route exact path="/inventory/search=:searchTerm">
            <Shop isSearching={true} />
          </Route>
          <Route exact path="/list">
            <ListItem
              cookies={cookies}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/inventory/i/id=:itemId">
            <ItemDetails
              cookies={cookies}
              setCookie={setCookie}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cookies={cookies}
              setCookie={setCookie}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/accounts/o/extend/id=:orderId">
            <ExtendRental
              cookies={cookies}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/accounts/o/early/id=:orderId">
            <EarlyReturn
              cookies={cookies}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/accounts/u/id=:userId">
            <Account
              cookies={cookies}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/accounts/u/orders">
            <Rentals
              cookies={cookies}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/schedule/dropoffs/:dropoffDate">
            <Dropoffs
              cookies={cookies}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/schedule/pickups/:pickupDate">
            <Pickups
              cookies={cookies}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/accounts/i/edit/id=:itemId">
            <EditItem
              cookies={cookies}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/accounts/u/edit">
            <EditAccount
              cookies={cookies}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/accounts/u/address">
            <EditUserAddress
              cookies={cookies}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/accounts/u/password">
            <EditPassword
              cookies={cookies}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/login">
            <Login
              cookies={cookies}
              setCookie={setCookie}
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/register">
            <Register
              setFlashMessages={setFlashMessages}
            />
          </Route>
          <Route exact path="/logout"><Logout /></Route>
          <Route exact path="/story">
            <Story />
          </Route>
          <Route exact path="/faqs">
            <Faqs />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
