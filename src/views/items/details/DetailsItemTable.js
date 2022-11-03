import { useNavigate } from 'react-router-dom';

export const DetailsItemTable = ({ item }) => {
  let navigate = useNavigate();

  return (
    <table className="table table-borderless">

      <tbody>
        <tr>
          <td className="fw-bolder">Availability</td>
          {item.is_transactable
            ? <td className="text-muted">In Stock (available {item.calendar.available_days_in_next_90} days of next 90 days)</td>
            : <td>Out of Stock</td>
          }
        </tr>
        <tr>
          <td className="fw-bolder">Tags</td>
          <td>{item.tags.map((tag) => (
            <span key={tag}>
              <button
                type="button"
                onClick={() => navigate(`/items/feed`)}
                className="btn btn-outline-secondary btn-sm mx-1 my-1"
              >
                { tag }
              </button>
            </span>
          ))}</td>
        </tr>
      </tbody>
    </table>
  );
}
