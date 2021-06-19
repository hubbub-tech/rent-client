import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProfileCard from '../cards/ProfileCard';
import ListingCard from '../cards/ListingCard';
import AccountCard from '../cards/AccountCard';

const Account = ({ myId }) => {
  const { userId } = useParams();
  const [user, setUser] = useState({"profile": {}, "cart": {}});
  const isOwner = myId == userId;
  const [urlBase, setUrlBase] = useState(null);
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
      <div className="container-fluid index-background">
        <div className="row">
          <div className="col-lg-4 col-sm-3"></div>
          <div className="col-lg-4 col-sm-6 mt-5">
            <div className="mx-auto d-block" style={{"width": "300px", "height": "300px"}}>
              <ProfileCard urlBase={urlBase} user={user} />
            </div>
          </div>
          <div className="col-lg-4 col-sm-3"></div>
        </div>
      </div>
      <div className="container-md">
        <div className="row justify-content-center g-0">
          <h2 className="text-center mt-3">{user.name}</h2>
        </div>
        <div className="row justify-content-center">
          <p className="text-center text-muted mb-1"><small>Bio</small></p>
          <div className="col-sm-6 col-12">
            <p className="text-center text-muted mt-0">
              <small>{ user.profile.bio }</small>
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 text-center mt-2">
            <p className="mx-3 mb-1"><strong>Email</strong> - {user.email}</p>
          </div>
          <div className="col-md-4 text-center mt-2">
            <p className="mx-3 mb-1"><strong>Member Since</strong> - { user.dt_joined }</p>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center">
          {isOwner &&
            <div className="col-md-4 mt-2">
              <h3 className="my-4">Your Settings</h3>
               <AccountCard user={user} />
            </div>
          }
          <div className={`${isOwner ? 'col-md-8' : 'col-md-12'} mt-2`}>
            <h3 className="my-4">Hubbub Listings ({listings.length})</h3>
            {listings.map((item) => (
              <ListingCard isOwner={isOwner} item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Account;
