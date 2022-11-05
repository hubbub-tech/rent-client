export const DateSingleInputBase = ({ value, handleValueChange }) => {
  return (
    <div className="input-group input-group-sm mt-2">
      <span className="input-group-text">Selected</span>
      <input
        size={10}
        placeholder="YYYY-MM-DD"
        value={value}
        onChange={handleValueChange}
        className="form-control"
      />
    </div>
  );
}
