import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';

export const useCredentials = () => {
  const userId = Cookies.get('userId');
  const sessionToken = Cookies.get('sessionToken');
  if (!userId || !sessionToken) return redirect('/login');
  return;
}
