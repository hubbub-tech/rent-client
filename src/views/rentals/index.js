import { useState, useEffect } from 'react';

import { RentalsTabNavItem } from './RentalsTabNavItem';
import { RentalsTabContent } from './RentalsTabContent';

import { OrderList } from './orders';

import { DropoffList, DropoffScheduleCard } from './dropoffs';
import { PickupList, PickupScheduleCard } from './pickups';

export const Index = () => {

  const [orders, setOrders] = useState([]);

  const defaultLogistics = [{ orders: [{}], to: {}, from: {} },];
  const [dropoffs, setDropoffs] = useState(defaultLogistics);
  const [pickups, setPickups] = useState(defaultLogistics);

  const [activeTab, setActiveTab] = useState('Orders');

  useEffect(() => {
    const getData = async(url) => {
      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      const data = await response.json();

      return data;
    };

    getData(process.env.REACT_APP_SERVER + '/orders/history')
    .then(data => setOrders(data.orders))
    .catch(console.error);

    getData(process.env.REACT_APP_SERVER + '/dropoffs')
    .then(data => setDropoffs(data.dropoffs))
    .catch(console.error);

    getData(process.env.REACT_APP_SERVER + '/pickups')
    .then(data => setPickups(data.pickups))
    .catch(console.error);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8 mt-4">
          <h1>Rentals</h1>
          <p>Manage your past, current, and future rentals from here.</p>
          <ul className="nav nav-tabs">
            <RentalsTabNavItem id='Orders' activeTab={activeTab} setActiveTab={setActiveTab} />
            <RentalsTabNavItem id='Dropoffs' activeTab={activeTab} setActiveTab={setActiveTab} />
            <RentalsTabNavItem id='Pickups' activeTab={activeTab} setActiveTab={setActiveTab} />
          </ul>
          <div className="my-3">
            <RentalsTabContent id='Orders' activeTab={activeTab}>
              <OrderList orders={orders} />
            </RentalsTabContent>
            <RentalsTabContent id='Dropoffs' activeTab={activeTab}>
              <DropoffScheduleCard orders={orders} />
              <DropoffList dropoffs={dropoffs} />
            </RentalsTabContent>
            <RentalsTabContent id='Pickups' activeTab={activeTab}>
              <PickupScheduleCard orders={orders} />
              <PickupList pickups={pickups} />
            </RentalsTabContent>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}
