import { useEffect } from 'react';

import { DeliveryTimeInput } from './DeliveryTimeInput';
import { DeliveryTimeOutput } from './DeliveryTimeOutput';

export const DeliveryTimeslotsDisplay = ({ timeslots, setTimeslots }) => {

  useEffect(() => {
    console.log("component re-render!");
  }, [timeslots]);

  return (
    <div className="col">
      {timeslots.map((timeRange, index) => (
        <DeliveryTimeOutput
          key={index}
          timeRange={timeRange}
          index={index}
          timeslots={timeslots}
          setTimeslots={setTimeslots}
        />
      ))}
      <DeliveryTimeInput timeslots={timeslots} setTimeslots={setTimeslots} />
    </div>
  );
}
