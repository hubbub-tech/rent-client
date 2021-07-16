import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

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
import Error404 from './components/static/Error404';

const App = () => {
  const [flashMessages, setFlashMessages] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['userId', 'auth', 'cartSize', 'isLoggedIn']);
  const isLoggedIn = (cookies.isLoggedIn === 'true');
  return (
    <Router>
      <div className="App">
        <Navbar cookies={cookies} isLoggedIn={isLoggedIn} />
        <Flash flashMessages={flashMessages} setFlashMessages={setFlashMessages} />
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
            {isLoggedIn && <ListItem cookies={cookies} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/inventory/i/id=:itemId">
            <ItemDetails cookies={cookies} setCookie={setCookie} isLoggedIn={isLoggedIn} setFlashMessages={setFlashMessages} />
          </Route>
          <Route exact path="/checkout">
            {isLoggedIn && <Checkout cookies={cookies} setCookie={setCookie} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/accounts/o/extend/id=:orderId">
            {isLoggedIn && <ExtendRental cookies={cookies} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/accounts/o/early/id=:orderId">
            {isLoggedIn && <EarlyReturn cookies={cookies} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/accounts/u/id=:userId">
            {isLoggedIn && <Account cookies={cookies} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/accounts/u/orders">
            {isLoggedIn && <Rentals cookies={cookies} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/schedule/dropoffs/:dropoffDate">
            {isLoggedIn && <Dropoffs cookies={cookies} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/schedule/pickups/:pickupDate">
            {isLoggedIn && <Pickups cookies={cookies} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/accounts/i/edit/id=:itemId">
            {isLoggedIn && <EditItem cookies={cookies} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/accounts/u/edit">
            {isLoggedIn && <EditAccount cookies={cookies} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/accounts/u/address">
            {isLoggedIn && <EditUserAddress cookies={cookies} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/accounts/u/password">
            {isLoggedIn && <EditPassword cookies={cookies} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/login">
            {!isLoggedIn && <Login cookies={cookies} setCookie={setCookie} setFlashMessages={setFlashMessages} />}
            {isLoggedIn && <Redirect to='/' />}
          </Route>
          <Route exact path="/register">
            {!isLoggedIn && <Register setFlashMessages={setFlashMessages} />}
            {isLoggedIn && <Redirect to='/' />}
          </Route>
          <Route exact path="/logout">
            {isLoggedIn && <Logout setCookie={setCookie} removeCookie={removeCookie} setFlashMessages={setFlashMessages} />}
            {!isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route exact path="/story">
            <Story />
          </Route>
          <Route exact path="/faqs">
            <Faqs />
          </Route>
          <Route component={Error404} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
