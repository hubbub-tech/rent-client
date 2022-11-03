export const CartRefreshButton = () => {
  const handleRefresh = () => {
    return window.location.reload(false);
  }
  return (
    <button className=""
      type="button"
      onClick={handleRefresh}
      className="btn btn-link btn-sm text-info"
    >
      Refresh
    </button>
  );
}
