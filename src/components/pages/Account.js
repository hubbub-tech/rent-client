import React from 'react';

const AccountHeader = (imgHost, user, profile, cart) => {
  const imgLink = imgHost + "/" + user.id.toString() + ".jpg";
  if (profile.has_pic) {
    const profilePicture = () => {
      <div className="crop-circle mx-auto d-block">
        <img src={imgLink} alt={user.name} />
      </div>
    }
  } else {
    const profilePicture = () => {
      <div className="mx-auto d-block" style={{"width": "300px", "height": "300px"}}>
        <img
          className="card-img-top"
          src="../static/users/roaree.jpg"
          style={{"borderRadius": "50%"}}
          alt="roaree" />
      </div>
    }
  }
  return (
    <div className="container-fluid index-background">
      <div className="row">
        <div className="col-lg-4 col-sm-3"></div>
        <div className="col-lg-4 col-sm-6 mt-5">
          <div className="mx-auto d-block" style={{"width": "300px", "height": "300px"}}>
            <img
              className="card-img-top"
              src="../static/users/roaree.jpg"
              style={{"borderRadius": "50%"}}
              alt="roaree" />
          </div>
        </div>
        <div className="col-lg-4 col-sm-3"></div>
      </div>
    </div>
  );
}

const AccountSettings = (isAccountOwner, user, profile) => {
  if (isAccountOwner === false) {
    return (
      <div className="row justify-content-center g-0">
        <h2 className="text-center mt-3">{user.name}</h2>
      </div>
    );
  } else {
    return (
      <div className="row justify-content-center g-0">
        <h2 className="text-center mt-3">{user.name}</h2>
        <div className="col-6">
          <p className="text-end"><a className="me-2" href="/account/u.edit">Change Photo</a>|</p>
        </div>
        <div className="col-6 dropdown">
          <a className="dropdown-toggle ms-2" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">Edit My Profile</a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><h6 className="dropdown-header">Profile</h6></li>
            <p className="mx-3 mb-1">Phone Number - {profile.phone}</p>
            <p className="mx-3 mb-1">Payment - {user.payment}</p>
            <p className="mx-3 mb-1 text-alert">
              <small>Note: You are the only one who can view these details.</small>
            </p>
            <li><hr className="dropdown-divider"/></li>
            <li><h6 className="dropdown-header">Actions</h6></li>
            <li><a className="dropdown-item" href="/account/u.edit">Edit Profile</a></li>
            <li><a className="dropdown-item" href="/account/u.password">Change Password</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

const UserRentals = (isAccountOwner, user, rentals) => {
  if (isAccountOwner) {
    const accordionIndex = (index) => "item-accordion-" + index.toString();
    const headerIndex = (itemId, index) => "header-" + itemId.toString() + "-" + index.toString();
    const collapseIndex = (itemId, index) => "collapse-" + itemId.toString() + "-" + index.toString();
    return (
      <div className="row">
        <div className="col-md mt-2">
          <h3>Rental History</h3>
          {rentals.map((item, index) => (
          <div className="accordion mb-3" id={accordionIndex(index)} key={item.id}>
            <div className="accordion-item">
              <p className="accordion-header" id={headerIndex(item.id, index)}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#" + collapseIndex(item.id, index)}
                  aria-expanded="true"
                  aria-controls={collapseIndex(item.id, index)}>
                  {item.name} Current
                </button>
              </p>
              <div
                className="accordion-collapse collapse"
                id={collapseIndex(item.id, index)}
                aria-labelledby={headerIndex(item.id, index)}
                data-bs-parent={"#" + accordionIndex(index)}>
                <div className="accordion-body">
                  <p className="card-text py-1">Listed by
                    <a href="/account/u.{{ item.lister.id }}">LISTER NAME</a>
                  </p>
                  <small className="card-text my-1">Scheduled to rent from SOMESTARTDATE to SOMEENDDATE.</small>
                </div>
                <hr className="divider"/>
                <a href="/inventory/item.{{ item.id }}">
                  <div className="accordion-body my-1">
                    <p className="card-text">View Item</p>
                  </div>
                </a>
                <hr className="divider"/>
                <a href="/account/u/review.item.{{ item.id }}">
                  <div className="accordion-body my-1">
                    <p className="card-text">Review Item</p>
                  </div>
                </a>
                <hr className="divider"/>
                <a href="/return/order.ORDERID">
                  <div className="accordion-body my-1"><p className="card-text">Early Return</p></div>
                </a>
              </div> //jdjdjdjdjdjdjjddjjxcjdj
            </div>
          </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="row">
        <div className="col-md mt-2">
          <p className="text-center">You do not have any active rentals. Check out our
            <a href="/inventory">Inventory</a>!
          </p>
        </div>
      </div>
    );
  }
}

const AccountPrivileges = (isAccountOwner) => {
  if (isAccountOwner) {
    return (
      <div>
        <a href="/account/u/edit.item.{{ item.id }}">
          <div className="accordion-body my-1"><p className="card-text">Edit Item</p></div>
        </a>
        <hr className="divider"/>
        <a style="color: red;" href="/account/u/hide-or-seek.item.{{ item.id }}">
          <div className="accordion-body my-1"><p className="card-text">Hide Item</p></div>
        </a>
      </div>
    );
  } else {
    return (
      <div>
        <div className="accordion-body my-1">
          <p className="card-text" style="color: red;">This listing has expired.</p>
        </div>
      </div>
    );
  }
}

const AccountListings = (isAccountOwner, user, listings) => {
  if (listings.length > 0) {
    return (
      <div className="col-md mt-2">
        <h3>{user.name}'s Listings ({listings.length})</h3>
        {rentals.map((item, index) => (
          <div className="accordion mb-3" id="item-accordion-{{ loop.index }}" key={index}>
            <div className="accordion-item">
              <p className="accordion-header" id="header-{{ item.id }}-{{ loop.index }}">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-{{ item.id }}-{{ loop.index }}"
                  aria-expanded="true"
                  aria-controls="collapse-{{ item.id }}-{{ loop.index }}">{{ item.name }}
                  <span className="text-danger text-end mx-2">IF NOT ITEM.ISAVAILABLE (Inactive)</span>
                </button>
              </p>
              <div
                id="collapse-{{ item.id }}-{{ loop.index }}"
                className="accordion-collapse collapse"
                aria-labelledby="header-{{ item.id }}-{{ loop.index }}"
                data-bs-parent="#item-accordion-{{ loop.index }}">
                <div className="accordion-body">
                  <p className="card-text">Priced @ {item.price} per day</p>
                  <small className="card-text my-1">Currently available from {calendar.date_started} to {calendar.date_ended}.</small>
                </div>
                <hr className="divider"/>
                <a href="/inventory/item.{{ item.id }}">
                  <div className="accordion-body my-1"><p className="card-text">View Item</p></div>
                </a>
                <hr className="divider"/>
                <AccountPrivileges isAccountOwner={isAccountOwner} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <p className="text-center">They have not listed anything yet.</p>
    );
  }
}

const Account = (urlPrefix, user, profile, cart, rentals, listings) => {
  return (
    <main>
      <AccountHeader imgHost={urlPrefix} user={user} profile={profile} cart={cart} />
      <AccountSettings isAccountOwner={false} user={user} profile={profile} />
      <div className="container-md">
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
        <UserRentals isAccountOwner={false} user={user} rentals={rentals} />
        <AccountListings isAccountOwner={false} user={user} listings={listings} />
      </div>
    </main>
  );
}

export default Account;
