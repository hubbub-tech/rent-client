import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

export const useAnalytics = (userId) => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
      if (!window.location.href.includes("localhost")) {
        if (userId !== null) {
          ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID, {
            gaOptions: { siteSpeedSampleRate: 100, name: 'logged-in', userId: userId }
          });
        } else {
          ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID, {
            gaOptions: { siteSpeedSampleRate: 100, name: 'anonymous' }
          });
        }
      }
      setInitialized(true);
  }, []);

  useEffect(() => {
    if (userId !== null) ReactGA.pageview(location.pathname + location.search, ['logged-in']);
    else ReactGA.pageview(location.pathname + location.search, ['anonymous']);
  }, [location]);
};
