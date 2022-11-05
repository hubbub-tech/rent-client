import { useState, useEffect } from 'react';

export const RentalsTabNavItem = ({ id, activeTab, setActiveTab }) => {

  const defaultClassName = 'nav-link text-muted';
  const [className, setClassName] = useState(defaultClassName);

  const handleActivate = () => setActiveTab(id);

  useEffect(() => {
    (id === activeTab)
      ? setClassName('nav-link text-hubbub active')
      : setClassName(defaultClassName);
  }, [activeTab]);

  return (
    <li className="nav-item">
      <button className={className} onClick={handleActivate}>
        { id }
      </button>
    </li>
  );
}
