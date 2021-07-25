import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const useAnalytics = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
      if (!window.location.href.includes("localhost")) {
        ReactGA.initialize(process.env.UA_TOKEN);
        console.log("Initializing gtags...")
      }
      setInitialized(true);
  }, []);

  useEffect(() => {
      if (initialized) {
        ReactGA.pageview(location.pathname + location.search);
      }
  }, [initialized, location]);
};

export default useAnalytics;
