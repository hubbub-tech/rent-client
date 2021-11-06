import React from "react";
import Cookies from 'js-cookie';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ItemPhoto from '../icons/ItemPhoto';
import EditItemPhotoForm from "../forms/EditAccountPhotoForm";

const EditItemPhoto = ({ setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const history = useHistory();
  const { itemId } = useParams();

  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }
  const [item, setItem] = useState({
    "calendar": {},
    "details": {}
  });
  const [urlBase, setUrlBase] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/accounts/i/edit/id=${itemId}`, {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setItem(data.item);
        setUrlBase(data.photo_url);
      } else if (statusCode === 403) {
        setFlashMessages(data.flashes);
        history.push('/logout');
      } else if (statusCode === 404){
        setFlashMessages(data.flashes);
        history.push('/404');
      } else {
        setFlashMessages(data.flashes);
        history.push('/');
      }
    });
  }, []);

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-10">
            <h1 className="text-center mb-3">Change Photo for {item.name}</h1>
            <p className="text-center mt-3">
              If you are updating the item photo, take a clear, unobstructed photo
              of your item for the listing with a solid background and good lighting.
              Portrait photos preferred. These small steps will make it more attractive for customers!
            </p>
          </div>
          <div className="col-sm-1"></div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-3">
            <ItemPhoto
              src={`${urlBase}/${item.id}.jpg`}
              className="card-img"
              item={item}
            />
          </div>
          <div className="col-sm-7">
            <EditItemPhotoForm item={item} setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </main>
  );
}

export default EditItemPhoto;
