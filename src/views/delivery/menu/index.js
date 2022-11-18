import { useState, useEffect } from 'react';

import { MenuTabNavItem } from './MenuTabNavItem';
import { MenuTabContent } from './MenuTabContent';

import { DropoffDates } from '../dropoffs';
import { PickupDates } from '../pickups';

export const Index = () => {

  const [unschedDropoffOrders, setUnschedDropoffOrders] = useState([]);
  const [unschedPickupOrders, setUnschedPickupOrders] = useState([]);

  const [activeTab, setActiveTab] = useState('Dropoffs');

  useEffect(() => {
    const getData = async(url) => {
      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      const data = await response.json();

      return data;
    };

    getData(process.env.REACT_APP_SERVER + '/orders/unscheduled')
    .then(data => {
      setUnschedDropoffOrders(data.unscheduled_dropoff_orders);
      setUnschedPickupOrders(data.unscheduled_pickup_orders);
    })
    .catch(console.error);
  }, []);

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 mt-4">
            <h1>Schedule Dropoffs & Pickups</h1>
            <p>Provide your availability for each day an item will be dropped off or picked up from the location of your choice.</p>
            <ul className="nav nav-tabs">
              <MenuTabNavItem id='Dropoffs' activeTab={activeTab} setActiveTab={setActiveTab} />
              <MenuTabNavItem id='Pickups' activeTab={activeTab} setActiveTab={setActiveTab} />
            </ul>
            <div className="my-3">
              <MenuTabContent id='Dropoffs' activeTab={activeTab}>
                <DropoffDates orders={unschedDropoffOrders} />
              </MenuTabContent>
              <MenuTabContent id='Pickups' activeTab={activeTab}>
                <PickupDates orders={unschedPickupOrders} />
              </MenuTabContent>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </main>
  );
}
