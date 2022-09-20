import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { addDays } from 'date-fns';

import { ExtendButton } from './ExtendButton';
import { ExtendItemPhoto } from './ExtendItemPhoto';
import { ExtendBreadcrumbs } from './ExtendBreadcrumbs';
import { ExtendDateInput } from './ExtendDateInput';

import { printDate } from '../items/utils.js';
import { useViewport } from '../../hooks/Viewport';
import { AppContext } from '../../App.js';

export const Index = () => {

  const { orderId } = useParams();

  const viewport = useViewport();
  const { userId, sessionToken } = useContext(AppContext);

  const [order, setOrder] = useState({ item: { calendar: {} }, extensions: [] });
  const [dtEnded, setDtEnded] = useState(null);

  const [srcUrl, setSrcUrl] = useState();

  const getMinDate = () => { return Date.parse(order.ext_dt_end) };
  const getMaxDate = () => { return Date.parse(order.item.calendar.dt_ended) };

  useEffect(() => {

    const getData = async(url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include" });
      const data = await response.json();

      setOrder(data.order);
      setSrcUrl(data.photo_url);
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
            <ExtendBreadcrumbs order={order} />
          </div>
        </div>
      </div>
    </div>
    <section className="mt-8">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ExtendItemPhoto className="img-fluid px-5 py-5" src={srcUrl} alt={order.item.name} />
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
                <span className="fw-bold text-dark">Extend your rental</span>
              </div>

              <hr className="my-6" />

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-1">
                    <ExtendDateInput
                      minDate={getMinDate()}
                      maxDate={getMaxDate()}
                      dtEnded={dtEnded}
                      setDtEnded={setDtEnded}
                      defaultMonth={getMinDate()}
                    />
                  </div>

                  <ExtendButton dtEnded={dtEnded} orderId={order.id} />
                </div>
              </div>


            </div>

          </div>

        </div>
      </div>
    </section>

  </main>
  );
}
