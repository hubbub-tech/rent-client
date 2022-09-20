export const OrderCancelButton = ({ orderId }) => {

  const handleCancellation = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const getData = async(url) => {
        const response = await fetch(url, { mode: 'cors', credentials: 'include' });
        const data = await response.json();
      };

      getData(process.env.REACT_APP_SERVER + `/orders/cancel?order_id=${orderId}`)
      .catch(console.error);

      window.location.reload(false);
    } else {
      console.log('Your order was NOT cancelled.');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancellation}
      className="btn btn-danger btn-sm"
    >
      Cancel
    </button>
  );
}
