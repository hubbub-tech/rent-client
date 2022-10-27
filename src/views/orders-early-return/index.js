import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { EarlyReturnForm } from './EarlyReturnForm';
import { EarlyReturnItemPhoto } from './EarlyReturnItemPhoto';
import { EarlyReturnBreadcrumbs } from './EarlyReturnBreadcrumbs';

import { printDate } from '../utils.js';

export const Index = () => {

  const { orderId } = useParams();

  const dateToday = new Date();
  const [order, setOrder] = useState({ item: { calendar: {} }, extensions: [] });
  const [srcUrl, setSrcUrl] = useState();

  useEffect(() => {

    const getData = async(url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include" });
      const data = await response.json();

      setOrder(data.order);
      setSrcUrl(data.order.item.image_url);

    };

    getData(process.env.REACT_APP_SERVER + `/order/${orderId}`)
    .catch(console.error);

  }, [orderId]);

  return (
    <main>
      <div className="mt-4">
        <div className="container">
          <div className="row ">
            <div className="col-12">
              <EarlyReturnBreadcrumbs order={order} />
            </div>
          </div>
        </div>
      </div>
      <section className="mt-8">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <EarlyReturnItemPhoto className="img-fluid px-5 py-5" src={srcUrl} alt={order.item.name} />
            </div>
            <div className="col-md-6">
              <div className="ps-lg-10 mt-6 mt-md-0">
                <a href={`/accounts/u/id=${order.item.lister_id}`} className="mb-4 d-block">{ order.item.lister_name }</a>

                <h1 className="fs-2 mb-1">{ order.item.name }</h1>
                <div className="text-small mb-1">
                  <a href="#!" className="text-decoration-none text-danger">
                    Reservation ending { printDate(order.ext_dt_end) }
                  </a>
                </div>
                <div className="fs-5 mt-3">
                  <span className="fw-bold text-dark">Return your rental early</span>
                </div>

                <hr className="my-6" />

                <div className="row">
                  <EarlyReturnForm order={order} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
