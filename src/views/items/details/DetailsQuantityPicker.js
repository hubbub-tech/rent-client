export const DetailsQuantityPicker = () => {
  return (
    <div class="input-group input-spinner  ">
      <input type="button" value="-" className="button-minus  btn  btn-sm " data-field="quantity" />
      <input type="number" step="1" max="10" value="1" name="quantity" className="quantity-field form-control-sm form-input   " />
      <input type="button" value="+" className="button-plus btn btn-sm " data-field="quantity" />
    </div>
  );
}
