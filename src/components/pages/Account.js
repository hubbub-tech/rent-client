import React from 'react';

import AccountBanner from '../banners/AccountBanner';
import RentalAccordion from '../accordions/RentalAccordion';
import ListingAccordion from '../accordions/ListingAccordion';
import AccountSettings from '../toolbars/AccountSettings';

const Account = ({urlBase, isOwner, user, profile, orders, rentals, listings, calendars}) => {
  return (
    <main>
      <AccountBanner urlBase={urlBase} user={user} profile={profile} />
      <div className="container-md">
        <AccountSettings isOwner={isOwner} user={user} profile={profile} />
        <div className="row justify-content-center">
          <p className="text-center text-muted mb-1"><small>Bio</small></p>
          <div className="col-sm-6 col-12">
            <p className="text-center text-muted mt-0">
              <small>{{ user.profile.bio }}</small>
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 text-center mt-2">
            <p className="mx-3 mb-1"><strong>Email</strong> - {user.email}</p>
          </div>
          <div className="col-md-4 text-center mt-2">
            <p className="mx-3 mb-1"><strong>Member Since</strong> - { user.date_joined }</p>
          </div>
        </div>
        <hr />
        {isOwner &&
          <div className="row">
            <div className="col-md mt-2">
              <h3>Rental History</h3>
              {rentals.map((item, index) => (
                <RentalAccordion
                  order={orders[item.id]}
                  item={item}
                  key={index} />
              ))}
            </div>
          </div>
        }
        <div className="col-md mt-2">
          <h3>{user.name} Listings ({listings.length})</h3>
          {listings.map((item) => (
            <ListingAccordion
              isOwner={isOwner}
              item={item}
              calendar={calendars[item.id]}
              key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Account;
