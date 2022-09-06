import React from "react";
import Cookies from 'js-cookie';
import { useNagivate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import WishlistForm from "../forms/WishlistForm";

const Wishlist = ({ isLoggedIn, setFlashMessages }) => {

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <h1 className="text-start">Send us your Wishlist!</h1>
            <p className="text-start">What do you wish you could find on Hubbub?</p>
            <WishlistForm isLoggedIn={isLoggedIn} setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </main>
  );
}

export default Wishlist;
