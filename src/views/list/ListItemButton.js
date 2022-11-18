import { useState, useEffect } from 'react';

export const ListItemButton = ({ isLoading, disabled }) => {

  const [btnClassName, setBtnClassName] = useState("btn btn-hubbub");
  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    if (isLoading) {
      setIsDisabled(true);
      setBtnClassName("btn btn-secondary");
    } else {
      setIsDisabled(disabled);
      setBtnClassName("btn btn-hubbub");
    }
  }, [isLoading, disabled]);

  return (
    <button
      type="submit"
      className={btnClassName}
      disabled={isDisabled}
    >
      List Item
    </button>
  );
}
