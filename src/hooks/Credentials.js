import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';

export const useCredentials = () => {
  const userId = Cookies.get('userId');
  if (!userId) return redirect('/login');
  return;
}
