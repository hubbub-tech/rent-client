import { Fragment, useState, useEffect, useContext } from 'react';

import { FlashContext } from '../../providers/FlashProvider';

export const RentalsCancelLogisticsButton = ({ logisticsId }) => {

  const defaultBtnClassName = "btn btn-danger btn-sm my-1 d-flex justify-content-end";
  const [btnClassName, setBtnClassName] = useState(defaultBtnClassName);

  const [isDisabled, setIsDisabled] = useState(false);

  const { renderFlash } = useContext(FlashContext);

  const postData = async(url) => {
    const response = await fetch(url, { mode: "cors", credentials: "include" });
    const data = await response.json();

    renderFlash(data.message, "info", 10000);

    (response.ok)
      ? setIsDisabled(true)
      : setIsDisabled(false);

    setBtnClassName("btn btn-outline-danger btn-sm my-1 d-flex justify-content-end");
  };

  const handleCancellation = () => {
    setIsDisabled(true);
    setBtnClassName("btn btn-secondary btn-sm my-1 d-flex justify-content-end");

    postData(process.env.REACT_APP_SERVER + `/delivery/cancel?logistics_id=${logisticsId}`)
    .catch(console.error);
  }

  return (
    <Fragment>
      <button
        type="button"
        onClick={handleCancellation}
        className={btnClassName}
        disabled={isDisabled}
      >
        Cancel Event
      </button>
    </Fragment>
  );
}
