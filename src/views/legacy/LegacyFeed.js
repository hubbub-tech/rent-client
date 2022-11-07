import { Navigate, useParams } from 'react-router-dom';

// for '/inventory' and '/inventory/search=:searchTerm'
export const LegacyFeed = () => {

  const { searchTerm } = useParams();

  return (searchTerm)
    ? <Navigate to={`/items/feed?search=${searchTerm}`} />
    : <Navigate to='/items/feed' />;
}
