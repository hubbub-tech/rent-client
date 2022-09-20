export const EarlyReturnButton = ({ setShowEarlyReturnView }) => {

  const toggleEarlyReturnView = () => setShowEarlyReturnView(true);

  return (
    <button
      type="button"
      onClick={toggleEarlyReturnView}
      className="btn btn-warning btn-sm"
    >
      Return Early
    </button>
  );
}
