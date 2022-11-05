export const CartEditItemButton = ({ toggle, onClick, disabled, form }) => {

  return (toggle)
    ? <div className="gap-2 d-block">
        <button className="btn btn-success btn-sm mx-1" form={form} type="submit">Submit</button>
        <button className="btn btn-secondary btn-sm mx-1" onClick={onClick} type="button">Back</button>
      </div>
    : <button
        className="btn btn-dark btn-sm"
        type="button"
        onClick={onClick}
        disabled={disabled()}
      >
        Edit
      </button>
}
