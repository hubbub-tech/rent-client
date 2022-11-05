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

export const Index = () => {

  const { itemId } = useParams();

  const { userId, sessionToken } = useContext(SessionContext);

  const [recommendations, setRecommendations] = useState([]);

  const defaultItem = { calendar: {}, tags: [] };
  const [item, setItem] = useState(defaultItem);
  const [srcUrl, setSrcUrl] = useState();

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
      setSrcUrl(data.item.image_url);
      setRecommendations(data.recommendations);

      const dtToday = new Date();
      const dtStarted = new Date(item.calendar.dt_started * 1000);
      setMinDate(dtToday > dtStarted ? dtToday : dtStarted);
      setMaxDate(new Date(item.calendar.dt_ended * 1000));
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
            <DetailsItemPhoto className="img-fluid px-5 py-5" src={srcUrl} alt={item.name} />
          </div>
          <div className="col-md-4">
            <div className="ps-lg-10 mt-6 mt-md-0">
              <a href={`/accounts/u/id=${item.lister_id}`} className="mb-4 d-block hubbub-link">{ item.lister_name }</a>

              <h1 className="fs-2 mb-1">{ item.name }</h1>
              <div className="text-small mb-1">
                <a href="#!" className="text-decoration-none text-muted">
                  Next available { printDate(item.calendar.next_avail_date_start) }
                </a>
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
