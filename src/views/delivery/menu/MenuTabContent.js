export const MenuTabContent = ({ id, activeTab, children }) => {

  return (id === activeTab)
    ? <div className="container">
        <div className="row">
          <div className="col-md-8 col-12">
            { children }
          </div>
          <div className="col-md-4 col-12">
          </div>
        </div>
      </div>
    : null;
}
