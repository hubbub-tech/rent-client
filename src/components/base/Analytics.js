import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const useAnalytics = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
      if (!window.location.href.includes("localhost")) {
        ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID);
      }
      setInitialized(true);
  }, []);
  
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};

export default useAnalytics;
