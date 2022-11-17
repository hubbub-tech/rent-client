import React, { useContext } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import {
  Route,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';

import { FlashProvider } from './providers/FlashProvider';
import { SessionContext, SessionProvider } from './providers/SessionProvider';

import { Footer } from './base/Footer';
import { Navbar } from './base/Navbar';

import { Index as Cart } from './views/cart';
import { Index as CheckoutOverview } from './views/checkout/overview';
import { Index as CheckoutSuccess } from './views/checkout/success';
import { Index as CheckoutCancel } from './views/checkout/cancel';

import { Index as Main } from './views/main';
import { Index as ListItem } from './views/list';

import { Index as Rentals } from './views/rentals';

import {
  Index as ExtendRental,
  ExtendSuccessPage,
  ExtendCancelPage
} from './views/rentals-edit/extend';

import {
  Index as EarlyReturnRental,
  EarlyReturnSuccessPage,
  EarlyReturnCancelPage
} from './views/rentals-edit/early-return';

import { Index as DeliveryDropoffs, DropoffConfirmation } from './views/delivery/dropoffs';
import { Index as DeliveryPickups, PickupConfirmation} from './views/delivery/pickups';
import { Index as DeliveryMenu } from './views/delivery/menu';


import { Index as Login } from './views/auth/login';
import { Index as Register } from './views/auth/register';

import { Index as ItemFeed } from './views/items/feed';
import { Index as ItemDetails } from './views/items/details';

import { PageNotFound } from './views/errors/E404';
import { Story } from './views/static/Story';
import { Faqs } from './views/static/Faqs';

import { StreamTest } from './views/items/feed/StreamTest';

import {
  LegacyFeed,
  LegacyDetails,
  LegacyRentals,
  LegacyCart
} from './views/legacy';

import { useAnalytics } from './hooks/Analytics';
import { useCredentials } from './hooks/Credentials';


const AppProviderLayout = () => {

  const { userId } = useContext(SessionContext);
  useAnalytics(userId);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_API_KEY}>
      <SessionProvider>
        <div className="App">
          <Navbar />
          <FlashProvider>

            <Outlet />

          </FlashProvider>
          <Footer />
        </div>
      </SessionProvider>
    </GoogleReCaptchaProvider>
  );
}


const routes = createRoutesFromElements(
  <Route element={<AppProviderLayout />} errorElement={<PageNotFound />}>

    <Route exact path="/items/stream" element={<StreamTest />} />

    <Route exact path="/login" element={<Login />} />

    <Route exact path="/register" element={<Register />} />

    <Route exact path="/" element={<Main />} />

    <Route exact path="/list" element={<ListItem />} />

    <Route exact path="/items/feed" element={<ItemFeed />} />

    <Route exact path="/item/:itemId" element={<ItemDetails />} />

    <Route exact path="/cart" loader={useCredentials} element={<Cart />} />

    <Route exact path="/checkout/overview" loader={useCredentials} element={<CheckoutOverview />} />

    <Route exact path="/checkout/success" loader={useCredentials} element={<CheckoutSuccess />} />

    <Route exact path="/checkout/cancel" loader={useCredentials} element={<CheckoutCancel />} />

    <Route exact path="/rentals" loader={useCredentials} element={<Rentals />} />

    <Route exact path="/rentals/schedule" loader={useCredentials} element={<DeliveryMenu />} />

    <Route exact path="/rentals/extend/:orderId" loader={useCredentials} element={<ExtendRental />} />

    <Route exact path="/extend/success" loader={useCredentials} element={<ExtendSuccessPage />} />

    <Route exact path="/extend/cancel" loader={useCredentials} element={<ExtendCancelPage />} />

    <Route exact path="/orders/early-return/:orderId" loader={useCredentials} element={<EarlyReturnRental />} />

    <Route exact path="/early-return/success" loader={useCredentials} element={<EarlyReturnSuccessPage />} />

    <Route exact path="/early-return/cancel" loader={useCredentials} element={<EarlyReturnCancelPage />} />

    <Route exact path="/orders/dropoff/:onTimestamp" loader={useCredentials} element={<DeliveryDropoffs />} />

    <Route exact path="/orders/dropoff/confirmation" loader={useCredentials} element={<DropoffConfirmation />} />

    <Route exact path="/orders/pickup/:onTimestamp" loader={useCredentials} element={<DeliveryPickups />} />

    <Route exact path="/orders/pickup/confirmation" loader={useCredentials} element={<PickupConfirmation />} />

    <Route exact path="/orders/early-return/:orderId" loader={useCredentials} element={<EarlyReturnRental />} />

    <Route exact path="/story" element={<Story />} />

    <Route exact path="/faqs" element={<Faqs />} />

    <Route exact path="/inventory" element={<LegacyFeed />} />

    <Route exact path="/inventory/search=:searchTerm" element={<LegacyFeed />} />

    <Route exact path="/inventory/i/id=:itemId" element={<LegacyDetails />} />

    <Route exact path="/accounts/u/orders" element={<LegacyRentals />} />

    <Route exact path="/checkout" element={<LegacyCart />} />

  </Route>
);


const router = createBrowserRouter(routes);

export const App = () => <RouterProvider router={router} />
