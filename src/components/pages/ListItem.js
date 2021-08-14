import React from "react";

import ListForm from "../forms/ListForm";

const ListItem = ({ setFlashMessages }) => {
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <h1 className="text-center">List</h1>
          <p className="text-center">Start your side hustle <i><mark>today</mark></i>.</p>
          <div className="col-sm-1"></div>
          <div className="col-sm-4">
            <h5 className="text-center">Quick Tips</h5>
              <ul className="instructions">
                <li>
                  Be sure to set your item at its original retail price. This helps us
                  set the most precise listing value for your item.
                </li>
                <br />
                <li>
                  Provide a good description for your item. This is an opportunity to
                  capture details that maybe don't come through in the photo. Its
                  probably best to keep it tweet length.
                </li>
                <br />
                <li>
                  Take a clear, unobstructed photo of your item for the listing with
                  a solid background and good lighting. Portrait photos preferred.
                  These small steps will make it more attractive for customers!
                </li>
                <br />
                <li>
                  Photos must be formatted as <mark><i>.jpg, .png, or .jpeg</i></mark> to be accepted.
                </li>
              </ul>
          </div>
          <div className="col-sm-6">
            <ListForm setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </main>
  );
}

export default ListItem;
