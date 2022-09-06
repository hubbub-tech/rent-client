import React from 'react';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useParams, useNagivate, Link } from 'react-router-dom';

import { printDate } from '../../helper.js'
import ProfilePhoto from '../icons/ProfilePhoto';
import ListingCard from '../cards/ListingCard';

const Account = ({ setFlashMessages }) => {
  let statusOK;
  let statusCode;

  const history = useNagivate();
  const isStatusOK = (res) => {
    statusOK = res.ok;
    statusCode = res.status;
    return res.json();
  }
  const { userId } = useParams();
  const [user, setUser] = useState({"cart": {}});
  const hubbubId = Cookies.get('hubbubId');
  const isOwner = hubbubId == userId;
  const [urlBase, setUrlBase] = useState();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER + `/accounts/u/id=${userId}`, {
      credentials: 'include'
    })
    .then(isStatusOK)
    .then(data => {
      if (statusOK) {
        setUser(data.user);
        setListings(data.listed_items);
        setUrlBase(data.photo_url);
      } else if (statusCode === 403) {
        setFlashMessages(data.messages);
        history.push('/logout');
      } else if (statusCode === 404) {
        setFlashMessages(data.messages);
        history.push('/404');
      }
    });
  }, [userId]);

  return (
    <main>
      <div className="container-md">
        <div className="row mt-5">
          <div className="col-sm-4 col-12 my-3">
            <ProfilePhoto src={`${urlBase}/${userId}.jpg`} user={user} size="300px" />
            <div className="row justify-content-center g-0">
              <h2 className="text-center mt-3">{user.name}</h2>
            </div>
            <p className="text-center text-muted mb-1"><small>Bio</small></p>
            <p className="text-center text-muted mt-0">
              <small>{ user.bio }</small>
            </p>
            <div className="card my-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="badge bg-dark">Email</span>
                  <span> {user.email}</span>
                </li>
                <li className="list-group-item">
                  <span className="badge bg-dark">Member Since</span>
                  <span> {printDate(user.dt_joined)}</span>
                </li>
              </ul>
            </div>
            {isOwner &&
              <div className="card my-3">
                <div className="card-header">
                  <p className="text-alert my-1">Only you can view these details.</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="badge bg-dark">Phone</span>
                    <span> {user.phone}</span>
                  </li>
                </ul>
                <Link className="btn btn-outline-dark" to="/accounts/u/edit">Edit Profile</Link>
                <Link className="btn btn-outline-dark" to="/accounts/u/photo">Change Photo</Link>
                <Link className="btn btn-outline-dark" to="/accounts/u/password">Change Password</Link>
                <Link className="btn btn-outline-dark" to="/accounts/u/address">Change Address</Link>
              </div>
            }
          </div>
          <div className="col-sm-8 col-12 my-3">
            <h3 className="my-4">Listings ({listings.length})</h3>
            <hr />
            <div className="row">
              {listings.map((item) => (
                <div className="col-12 my-2" key={item.id}>
                  <ListingCard
                    setFlashMessages={setFlashMessages}
                    urlBase={urlBase}
                    isOwner={isOwner}
                    item={item}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Account;
