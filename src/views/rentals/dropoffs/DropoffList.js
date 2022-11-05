import { DropoffEvent } from './DropoffEvent';

export const DropoffList = ({ dropoffs }) => {

  return (dropoffs)
    ? <div className="row">
      {dropoffs.map((dropoff, index) => (
        <DropoffEvent key={dropoff.id} dropoff={dropoff} orders={dropoff.orders} />
      ))}
      </div>
    : null;
}
