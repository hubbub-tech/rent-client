export const CartTxnMethodRadio = ({ setTxnMethod }) => {
  return (
    <div className="my-3">
      <select className="form-select form-select-sm" aria-label=".form-select-sm example">
        <option defaultValue="in-person">Select payment method...</option>
        <option
          value="in-person"
          onSelect={e => setTxnMethod(e.target.value)}
        >
          In-person
        </option>
        <option
          value="online"
          onSelect={e => setTxnMethod(e.target.value)}
        >
          Online
        </option>
      </select>
    </div>
  );
}
