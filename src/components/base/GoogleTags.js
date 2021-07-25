//react doesn't support script tag
import { useEffect } from 'react';
import ReactGA from 'react-ga';

export const makePageView = (pageName) => {
  ReactGA.pageview(pageName);
}

export const useAnalytics = (pageName) => {
  useEffect(() => {
    ReactGA.initialize( process.env.UA_TOKEN );
    makePageView(pageName);
  }, [pageName]);
}

export default useAnalytics;
