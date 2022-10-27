import { useParams } from 'react-router-dom';

import { ExtendSuccess } from './ExtendSuccess';
import { ExtendCancel } from './ExtendCancel';

export const Index = () => {
  let { status } = useParams();

  return status === 'success'
    ? <ExtendSuccess />
    : <ExtendCancel />
}
