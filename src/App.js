import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga';
import { Route, Switch, Redirect } from 'react-router-dom';

import Flash from './components/base/Flash';
import Navbar from './components/base/Navbar';
import Footer from './components/base/Footer';
import useAnalytics from './components/base/Analytics';

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
import EditItemPhoto from './components/pages/EditItemPhoto';
import ReviewItem from './components/pages/ReviewItem';
import EditAccount from './components/pages/EditAccount';
import EditPassword from './components/pages/EditPassword';
import ExtendRental from './components/pages/ExtendRental';
import EarlyReturn from './components/pages/EarlyReturn';
import EditAccountPhoto from './components/pages/EditAccountPhoto';
import EditUserAddress from './components/pages/EditUserAddress';
import RecoverPassword from './components/pages/RecoverPassword';
import ResetPassword from './components/pages/ResetPassword';

import Story from './components/static/Story';
import Faqs from './components/static/Faqs';
import Error404 from './components/static/Error404';

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
      <Switch>
        <Route exact path="/">
          <Main setFlashMessages={setFlashMessages} />
        </Route>
        <Route exact path="/inventory">
          <Shop isSearching={false} />
        </Route>
        <Route exact path="/inventory/search=:searchTerm">
          <Shop isSearching={true} />
        </Route>
        <Route exact path="/list">
          {isLoggedIn && <ListItem setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/inventory/i/id=:itemId">
          <ItemDetails isLoggedIn={isLoggedIn} setFlashMessages={setFlashMessages} />
        </Route>
        <Route exact path="/checkout">
          {isLoggedIn && <Checkout setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/accounts/o/extend/id=:orderId">
          {isLoggedIn && <ExtendRental setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/accounts/o/early/id=:orderId">
          {isLoggedIn && <EarlyReturn setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/accounts/u/id=:userId">
          {isLoggedIn && <Account setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/accounts/u/orders">
          {isLoggedIn && <Rentals setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/schedule/dropoffs/:dropoffDate">
          {isLoggedIn && <Dropoffs setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/schedule/pickups/:pickupDate">
          {isLoggedIn && <Pickups setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/accounts/i/edit/id=:itemId">
          {isLoggedIn && <EditItem setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/accounts/i/photo/id=:itemId">
          {isLoggedIn && <EditItemPhoto setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/accounts/o/review/id=:orderId">
          {isLoggedIn && <ReviewItem setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/accounts/u/edit">
          {isLoggedIn && <EditAccount setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/accounts/u/photo">
          {isLoggedIn && <EditAccountPhoto setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/accounts/u/address">
          {isLoggedIn && <EditUserAddress setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/accounts/u/password">
          {isLoggedIn && <EditPassword setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/login">
          {!isLoggedIn && <Login setFlashMessages={setFlashMessages} />}
          {isLoggedIn && <Redirect to='/' />}
        </Route>
        <Route exact path="/register">
          {!isLoggedIn && <Register setFlashMessages={setFlashMessages} />}
          {isLoggedIn && <Redirect to='/' />}
        </Route>
        <Route exact path="/logout">
          {isLoggedIn && <Logout setFlashMessages={setFlashMessages} />}
          {!isLoggedIn && <Redirect to='/login' />}
        </Route>
        <Route exact path="/password/recovery">
          {!isLoggedIn && <RecoverPassword setFlashMessages={setFlashMessages} />}
          {isLoggedIn && <Redirect to='/' />}
        </Route>
        <Route exact path="/password/reset/token=:resetToken">
          {!isLoggedIn && <ResetPassword setFlashMessages={setFlashMessages} />}
          {isLoggedIn && <Redirect to='/' />}
        </Route>
        <Route exact path="/story">
          <Story />
        </Route>
        <Route exact path="/faqs">
          <Faqs setFlashMessages={setFlashMessages} />
        </Route>
        <Route>
          <Error404 setFlashMessages={setFlashMessages }/>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
