import { useState, useEffect } from 'react';

import { ListItemForm } from './ListItemForm';

export const Index = () => {

  return (
    <main>
      <div className="container-md my-3">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 mt-4">
            <h1>How to List</h1>
            <p>Share when you will be availability for us to deliver your rentals.</p>
            <hr />
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
        </div>
        <div className="row mb-3">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <h2 className="my-3">Rentals</h2>
                HOLD
              </div>
              <div className="col-md-6">
                <ListItemForm />
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </main>
  );
}
