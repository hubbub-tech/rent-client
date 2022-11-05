export const CartRemoveItemButton = ({ itemId }) => {

  const handleRemove = (e) => {
    e.preventDefault();

    const postData = async(url) => {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ itemId }),
        headers: { 'Content-Type': 'application/json' },
      });

      return response;
    };

    postData(process.env.REACT_APP_SERVER + '/cart/remove')
    .then(response => response.ok && window.location.reload(false))
    .catch(console.error);
  };

  return (
    <button
      type="button"
      onClick={handleRemove}
      className="btn btn-link btn-sm text-danger"
    >
      Remove
    </button>
  );
}
