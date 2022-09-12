import { DetailsRecCard } from './DetailsRecCard';

export const DetailsRecommendations = ({ items }) => {
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-12">
          <h3>Related Items</h3>
        </div>
      </div>
      <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-2 mt-2">
        {items.map((item) => (
          <DetailsRecCard key={item.id} src={null} item={item} />
        ))}
      </div>
    </div>
  );
}
