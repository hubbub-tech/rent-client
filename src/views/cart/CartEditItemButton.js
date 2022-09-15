export const CartEditItemButton = ({ onClick, disabled }) => {
  return (
    <button
      className="btn btn-dark btn-sm ms-2"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      Edit Reservation
    </button>
  );
}
