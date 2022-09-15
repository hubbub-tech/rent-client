import { useParams } from 'react-router-dom';

import { CheckoutSuccess } from './CheckoutSuccess';
import { CheckoutCancel } from './CheckoutCancel';

export const Index = () => {
  let { status } = useParams();
  console.log("yo~")

  return status === 'success'
    ? <CheckoutSuccess />
    : <CheckoutCancel />
}
