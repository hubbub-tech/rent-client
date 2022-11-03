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

import { Index as OrderHistory } from './views/orders';
import { Index as ExtendRental } from './views/orders-extend';
import { Index as ExtendCheckout } from './views/orders-extend/checkout';
import { Index as EarlyReturnRental } from './views/orders-early-return';

import { Index as DeliveryDropoffs } from './views/delivery/dropoffs';
import { Index as DeliveryPickups} from './views/delivery/pickups';


import { Index as Login } from './views/auth/login';
import { Index as Register } from './views/auth/register';

import { Index as ItemFeed } from './views/items/feed';
import { Index as ItemDetails } from './views/items/details';

import { PageNotFound } from './views/errors/E404';
import { Story } from './views/static/Story';
import { Faqs } from './views/static/Faqs';

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

            <Route exact path="/orders/history" element={<OrderHistory />} />

            <Route exact path="/orders/dropoff/:onTimestamp" element={<DeliveryDropoffs />} />

            <Route exact path="/orders/pickup/:onTimestamp" element={<DeliveryPickups />} />

            <Route exact path="/orders/early-return/:orderId" element={<EarlyReturnRental />} />

            <Route exact path="/orders/extend/:orderId" element={<ExtendRental />} />

            <Route exact path="/extend/:status" element={<ExtendCheckout />} />

            <Route exact path="/story" element={<Story />} />

            <Route exact path="/faqs" element={<Faqs />} />

            <Route element={<PageNotFound />} />
          </Routes>
        </FlashProvider>
        <Footer />
      </div>
    </SessionProvider>
  );
}

export default App;
