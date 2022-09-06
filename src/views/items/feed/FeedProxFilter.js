export const FeedProxFilter = ({ renderedItems, setRenderedItems, zipCode }) => {
  return (
    <div className="form-check form-check-reverse mt-md-4 mt-2 mb-3">
      <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" checked />
      <label className="form-check-label" for="inlineCheckbox1">
        Sorted in proximity to
        <span className="text-hubbub"> {zipCode}. </span>
        Wrong zip code?
      </label>
    </div>
  );
}
