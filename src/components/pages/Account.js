import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { stringToMoment, printMoment } from '../../helper.js'
import ProfileCard from '../cards/ProfileCard';
import ListingCard from '../cards/ListingCard';

const Account = ({ myId, setFlashMessages }) => {
  const { userId } = useParams();
  const [user, setUser] = useState({"profile": {}, "cart": {}});
  const isOwner = myId == userId;
  const [urlBase, setUrlBase] = useState({"user": null, "item": null});
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch(`/accounts/u/id=${userId}`)
    .then(res => res.json())
    .then(data => {
      setUser(data.user);
      setListings(data.listings);
      setUrlBase(data.photo_url);
    });
  }, [userId]);

  return (
    <main>
      <div className="container-md">
        <div className="row mt-5">
          <div className="col-sm-4 col-12 my-3">
            <div className="mx-auto d-block" style={{"width": "300px", "height": "300px"}}>
              <ProfileCard urlBase={urlBase.user} user={user} />
            </div>
            <div className="row justify-content-center g-0">
              <h2 className="text-center mt-3">{user.name}</h2>
            </div>
            <p className="text-center text-muted mb-1"><small>Bio</small></p>
            <p className="text-center text-muted mt-0">
              <small>{ user.profile.bio }</small>
            </p>
            <div className="card my-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="badge bg-dark">Email</span>
                  <span> {user.email}</span>
                </li>
                <li className="list-group-item">
                  <span className="badge bg-dark">Member Since</span>
                  <span> {printMoment(stringToMoment(user.dt_joined))}</span>
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
                    <span> {user.profile.phone}</span>
                  </li>
                  <li className="list-group-item">
                    <span className="badge bg-dark">Payment</span>
                    <span> {user.payment}</span>
                  </li>
                </ul>
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                  <Link className="btn btn-outline-dark" to="/accounts/u/edit">Edit Profile</Link>
                  <Link className="btn btn-outline-dark" to="/accounts/u/password">Change Password</Link>
                </div>
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
                    urlBase={urlBase.item}
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
