import { Navigate, useParams } from 'react-router-dom';

// for '/inventory/i/id=:itemId'
export const LegacyDetails = () => {

  const { itemId } = useParams();

  return <Navigate to={`/item/${itemId}`} />;
}
