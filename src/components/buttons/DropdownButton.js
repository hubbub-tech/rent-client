import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'bootstrap';


const DropdownButton = ({ title, options }) => {
    const ddRef = useRef();
    const [isDropdownCollapsed, setIsDropdownCollapsed] = useState(true);
    const handleDropdownCollapse = () => {
      setIsDropdownCollapsed(!isDropdownCollapsed);
      console.log({isDropdownCollapsed});
    }

    useEffect(() => {
        var dd = new Dropdown(ddRef.current, {})
    }, [isDropdownCollapsed])

    return (
      <div className="my-0">
        <div className="dropdown">
          <button
            className="btn btn-link dropdown-toggle text-dark"
            type="button"
            ref={ddRef}
            aria-expanded={!isDropdownCollapsed ? true : false}
            onClick={handleDropdownCollapse}
          >
            {title}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdown1">
            {options.map((option) => <li key={option.id}>{option.content}</li>)}
          </ul>
        </div>
      </div>
    )
}

export default DropdownButton;
