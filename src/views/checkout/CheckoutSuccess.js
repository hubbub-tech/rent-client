import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CheckoutSuccess = () => {

  let navigate = useNavigate();
  const [messages, setMessages] = useState(['Loading...']);

  useEffect(() => {
    const getData = async(url) => {

      const response = await fetch(url, { mode: 'cors', credentials: 'include' });
      return response
    };

    getData(process.env.REACT_APP_SERVER + '/checkout')
    .then(res => {
      if (res.ok) navigate('/items/feed');
      else navigate('/cart');
    })
    .catch(console.error);
  }, []);

  return (
    <p>{ messages }</p>
  );
}
