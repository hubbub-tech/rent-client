import { useEffect } from 'react';

import { TimeRangeInput } from './TimeRangeInput';
import { TimeRangeOutput } from './TimeRangeOutput';

export const TimeRangeSelector = ({ timeRanges, setTimeRanges }) => {

  useEffect(() => {
    console.log("Re-render triggered!");
  }, [timeRanges]);

  return (
    <div className="col">
      {timeRanges.map((timeRange, index) => (
        <TimeRangeOutput
          key={index}
          index={index}
          timeRange={timeRange}
          timeRanges={timeRanges}
          setTimeRanges={setTimeRanges}
        />
      ))}
      <TimeRangeInput timeRanges={timeRanges} setTimeRanges={setTimeRanges} />
    </div>
  );
}
