import Cookies from 'js-cookie';
import { redirect, useLocation } from 'react-router-dom';

export const useCredentials = () => {

  const userId = Cookies.get('userId');
  const sessionToken = Cookies.get('sessionToken');

  const redirectPath = `/login?redirect=${window.location.pathname + window.location.search}`;
  if (!userId || !sessionToken) return redirect(redirectPath);
  return;
}
