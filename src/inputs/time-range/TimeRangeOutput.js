import cancelSvg from '../assets/cancel.svg';

export const TimeRangeOutput = ({ index, timeRange, timeRanges, setTimeRanges }) => {

  const handleRemove = () => {
    let editableTimeRanges = [...timeRanges];
    editableTimeRanges.splice(index, 1);

    setTimeRanges(editableTimeRanges);
  };

  return (
    <div className="card my-2 py-0">
      <div className="card-body">
        <button type="button" className="btn btn-danger btn-sm me-3" onClick={handleRemove}>
          <img src={cancelSvg} alt="cancel" />
        </button>
        <span className="my-0 fw-bold text-muted">{timeRange.start} to {timeRange.end}</span>
      </div>
    </div>
  );
}
