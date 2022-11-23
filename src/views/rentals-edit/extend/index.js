import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { RentalEditItemPhotoLg } from '../RentalEditItemPhotoLg';

import { ExtendBreadcrumbs } from './ExtendBreadcrumbs';
import { ExtendCostMessage } from './ExtendCostMessage';
import { ExtendReservationButton } from './ExtendReservationButton';

import { DateSinglePicker } from '../../../inputs/date-single';

import { printDate } from '../../utils.js';

export const Index = () => {

  const { orderId } = useParams();

  const dateToday = new Date();
  const [order, setOrder] = useState({ item: { calendar: {} }, extensions: [] });
  const [dtEnded, setDtEnded] = useState(undefined);

  const [srcUrl, setSrcUrl] = useState();

  const [minDate, setMinDate] = useState(dateToday);
  const [maxDate, setMaxDate] = useState(dateToday);

  useEffect(() => {

    const getData = async(url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include" });
      const data = await response.json();

      setOrder(data.order);
      setSrcUrl(data.order.item.image_url);

      setMinDate(new Date(data.order.ext_dt_end * 1000));
      setMaxDate(new Date(data.order.item.calendar.dt_ended * 1000));
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
            <div className="col-md-1"></div>
            <div className="col-md-6">
              <RentalEditItemPhotoLg className="img-fluid px-5 py-5" src={srcUrl} alt={order.item.name} />
            </div>
            <div className="col-md-4">
              <div className="ps-lg-10 mt-6 mt-md-0">
                <h1 className="fs-2 mb-1">{ order.item.name }</h1>
                <div className="text-small mb-1">
                  <p className="text-danger">Reservation ending { printDate(order.ext_dt_end) }</p>
                </div>
                <div className="fs-5 mt-3">
                  <ExtendCostMessage order={order} dtEnded={dtEnded} />
                </div>

                <hr className="my-6" />

                <div className="row">
                  <div className="col-md-12 mb-4">
                    <DateSinglePicker
                      minDate={minDate}
                      maxDate={maxDate}
                      selectedDate={dtEnded}
                      setSelectedDate={setDtEnded}
                      defaultMonth={minDate}
                    />
                    <ExtendReservationButton dtEnded={dtEnded} orderId={order.id} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>
    </main>
  );
}


export { ExtendSuccessPage } from './ExtendSuccessPage'
export { ExtendCancelPage } from './ExtendCancelPage';
