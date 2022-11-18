import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { DetailsItemPhoto } from './DetailsItemPhoto';
import { DetailsItemTable } from './DetailsItemTable';
import { DetailsBreadcrumbs } from './DetailsBreadcrumbs';
import { DetailsAddCartButton } from './DetailsAddCartButton';
import { DetailsItemDescription } from './DetailsItemDescription';
import { DetailsRecommendations } from './DetailsRecommendations';

import { printDate, printMoney } from '../../utils.js';
import { useViewport } from '../../../hooks/Viewport';
import { SessionContext } from '../../../providers/SessionProvider';
import { DateRangePicker } from '../../../inputs/date-range';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const Index = () => {

  const { itemId } = useParams();

  const { userId, sessionToken } = useContext(SessionContext);

  const [recommendations, setRecommendations] = useState([]);

  const defaultItem = { calendar: {}, tags: [] };
  const [item, setItem] = useState(defaultItem);

  const [rentalCost, setRentalCost] = useState(undefined);

  const defaultSelected = { from: undefined, to: undefined };
  const [dtRange, setDtRange] = useState(defaultSelected);

  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  useEffect(() => {

    const getData = async(url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include" });
      const data = await response.json();

      setItem(data.item);
      setRecommendations(data.recommendations);

      const dtToday = new Date();
      const dtStarted = new Date(data.item.calendar.dt_started * 1000);
      setMinDate(dtToday > dtStarted ? dtToday : dtStarted);
      setMaxDate(new Date(data.item.calendar.dt_ended * 1000));

      console.log(dtToday > dtStarted ? dtToday : dtStarted);
      console.log(new Date(data.item.calendar.dt_ended * 1000));
    };

    getData(process.env.REACT_APP_SERVER + `/item/${itemId}`)
    .catch(console.error);
  }, [rentalCost]);


  return (
    <main>
    <div className="mt-4">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <DetailsBreadcrumbs item={item} />
          </div>
        </div>
      </div>
    </div>
    <section className="mt-8">
      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <DetailsItemPhoto className="img-fluid px-5 py-5" src={item.image_url} alt={item.name} />
          </div>
          <div className="col-md-4">
            <div className="ps-lg-10 mt-4 mt-md-0 mb-2">
              {item.name
                ? <h1 className="fs-2">{ item.name }</h1>
                : <Skeleton height="50px" />
              }

              <div className="text-small text-muted mb-2">
                {item.calendar.next_avail_date_start && <span>Next available: </span>}
                {item.calendar.next_avail_date_start
                  ? printDate(item.calendar.next_avail_date_start)
                  : <Skeleton />
                }
              </div>
              <div className="fs-5 mt-3">
                {rentalCost === undefined
                  ? <span className="fw-bold text-dark">How long do you want to rent?</span>
                  : <span className="fw-bold text-dark">
                      Rent for: <span className="text-success">{ printMoney(rentalCost) }</span>
                    </span>
                }
              </div>

              <hr className="my-6" />

              <div className="row">
                <div className="col-12">
                  <div className="mb-1">
                    <DateRangePicker
                      minDate={minDate}
                      maxDate={maxDate}
                      defaultMonth={new Date()}
                      selectedRange={dtRange}
                      setSelectedRange={setDtRange}
                    />
                  </div>
                  <DetailsAddCartButton
                    setRentalCost={setRentalCost}
                    dtRange={dtRange}
                    itemId={item.id}
                  />
                </div>
              </div>
              <div className="col-12 mt-3">
                <DetailsItemTable item={item} />
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>

          <DetailsItemDescription item={item} />
          <DetailsRecommendations items={recommendations} />
        </div>
      </div>
    </section>
  </main>
  );
}
