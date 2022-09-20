import { useParams } from 'react-router-dom';

import { CheckoutSuccess } from './CheckoutSuccess';
import { CheckoutCancel } from './CheckoutCancel';

export const Index = () => {
  let { status } = useParams();

  return status === 'success'
    ? <CheckoutSuccess />
    : <CheckoutCancel />
}
