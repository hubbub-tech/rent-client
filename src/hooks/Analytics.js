import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

export const useAnalytics = (userId = null) => {
  const location = useLocation();

  useEffect(() => {
      if (!window.location.href.includes("localhost")) {
        if (userId !== null) {
          ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID, {
            gaOptions: { userId: userId }
          });
        } else {
          ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID);
        }
      }
  }, []);

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};
