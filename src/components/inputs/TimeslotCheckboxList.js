import React from 'react';

const TimeslotCheckboxList = ({ timeslots }) => {
  const [checkboxTimes, setCheckboxTimes] = useState(timeslots);
  return (
    <div>
      {checkboxTimes.map((checkbox, index) => (
        <label class="form-check-label" for={`checkbox-${index}`}>
          { checkbox.time }
          <input
            type="checkbox"
            id={`checkbox-${index}`}
            checked={checkbox.checked}
            onChange={e => {
              const newCheckboxes = [...checkboxTimes];
              newCheckboxes[index].checked = e.target.checked;
              setCheckboxTimes(newCheckboxes);
            }}
          />
        </label>
      ))}
    </div>
  );
}

export default TimeslotCheckboxList;
