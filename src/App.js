import React, { useContext } from 'react';

import { Route, Routes } from 'react-router-dom';

import { FlashProvider } from './providers/FlashProvider';
import { SessionContext, SessionProvider } from './providers/SessionProvider';

import { Footer } from './base/Footer';
import { Navbar } from './base/Navbar';

import { Index as Cart } from './views/cart';
import { Index as Checkout } from './views/checkout';

import { Index as Main } from './views/main';
import { Index as ListItem } from './views/list';

import { Index as OrderHistory } from './views/orders';
import { Index as DeliveryDropoffs } from './views/delivery/dropoffs';
import { Index as DeliveryPickups} from './views/delivery/pickups';

import { Index as ExtendRental } from './views/extend';
import { Index as ExtendCheckout } from './views/extend/checkout';

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

            <Route exact path="/cart" element={<Cart />} />

            <Route exact path="/checkout/:status" element={<Checkout />} />

            <Route exact path="/login" element={<Login />} />

            <Route exact path="/register" element={<Register />} />

            <Route exact path="/" element={<Main />} />

            <Route exact path="/list" element={<ListItem />} />

            <Route exact path="/items/feed" element={<ItemFeed />} />

            <Route exact path="/item/:itemId" element={<ItemDetails />} />

            <Route exact path="/orders/history" element={<OrderHistory />} />

            <Route exact path="/orders/dropoff/:onTimestamp" element={<DeliveryDropoffs />} />

            <Route exact path="/orders/pickup/:onTimestamp" element={<DeliveryPickups />} />

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
