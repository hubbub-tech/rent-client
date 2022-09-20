export const CartTxnMethodRadio = ({ setTxnMethod }) => {
  return (
    <div className="my-3">
      <select
        className="form-select form-select-sm"
        aria-label=".form-select-sm example"
        onChange={e => setTxnMethod(e.target.value)}
      >
        <option value="in-person" defaultValue="in-person">Select payment method...</option>
        <option value="in-person">In-person</option>
        <option value="online">Online</option>
      </select>
    </div>
  );
}
