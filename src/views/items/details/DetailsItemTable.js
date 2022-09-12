export const DetailsItemTable = ({ item }) => {
  return (
    <table className="table table-borderless">

      <tbody>
        {/*<tr>
          <td>Product Code:</td>
          <td>FBB00255</td>

        </tr>*/}
        <tr>
          <td>Availability:</td>
          {item.is_transactable
            ? <td>In Stock (available {item.calendar.available_days_in_next_90} days of next 90 days)</td>
            : <td>Out of Stock</td>
          }

        </tr>
        <tr>
          <td>Tags:</td>
          <td>{item.tags.map((tag) => (
            <span key={tag}> { tag } </span>
          ))}</td>

        </tr>

      </tbody>
    </table>
  );
}
