import React, { useContext } from 'react';

import { Route, Routes } from 'react-router-dom';

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

import {
  LegacyFeed,
  LegacyDetails,
  LegacyRentals
} from './views/legacy';

import { useAnalytics } from './hooks/Analytics';


const App = () => {

  const { userId } = useContext(SessionContext);

  useAnalytics(userId);

  return (
    <SessionProvider>
      <div className="App">
        <Navbar />
        <FlashProvider>
          <Routes>

            <Route exact path="/login" element={<Login />} />

            <Route exact path="/register" element={<Register />} />

            <Route exact path="/" element={<Main />} />

            <Route exact path="/list" element={<ListItem />} />

            <Route exact path="/items/feed" element={<ItemFeed />} />

            <Route exact path="/item/:itemId" element={<ItemDetails />} />

            <Route exact path="/cart" element={<Cart />} />

            <Route exact path="/checkout/overview" element={<CheckoutOverview />} />

            <Route exact path="/checkout/success" element={<CheckoutSuccess />} />

            <Route exact path="/checkout/cancel" element={<CheckoutCancel />} />

            <Route exact path="/rentals" element={<Rentals />} />

            <Route exact path="/rentals/schedule" element={<DeliveryMenu />} />

            <Route exact path="/rentals/extend/:orderId" element={<ExtendRental />} />

            <Route exact path="/extend/success" element={<ExtendSuccessPage />} />

            <Route exact path="/extend/cancel" element={<ExtendCancelPage />} />

            <Route exact path="/orders/early-return/:orderId" element={<EarlyReturnRental />} />

            <Route exact path="/early-return/success" element={<EarlyReturnSuccessPage />} />

            <Route exact path="/early-return/cancel" element={<EarlyReturnCancelPage />} />

            <Route exact path="/orders/dropoff/:onTimestamp" element={<DeliveryDropoffs />} />

            <Route exact path="/orders/dropoff/confirmation" element={<DropoffConfirmation />} />

            <Route exact path="/orders/pickup/:onTimestamp" element={<DeliveryPickups />} />

            <Route exact path="/orders/pickup/confirmation" element={<PickupConfirmation />} />

            <Route exact path="/orders/early-return/:orderId" element={<EarlyReturnRental />} />

            <Route exact path="/story" element={<Story />} />

            <Route exact path="/faqs" element={<Faqs />} />

            <Route exact path="/inventory" element={<LegacyFeed />} />

            <Route exact path="/inventory/search=:searchTerm" element={<LegacyFeed />} />

            <Route exact path="/inventory/i/id=:itemId" element={<LegacyDetails />} />

            <Route exact path="/accounts/u/orders" element={<LegacyRentals />} />

            <Route element={<PageNotFound />} />
          </Routes>
        </FlashProvider>
        <Footer />
      </div>
    </SessionProvider>
  );
}

export default App;
