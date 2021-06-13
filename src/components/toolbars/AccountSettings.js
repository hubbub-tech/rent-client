import React from 'react';

const AccountSettings = ({isOwner, user}) => {
  if (isOwner) {
    return (
      <div className="row justify-content-center g-0">
        <h2 className="text-center mt-3">{user.name}</h2>
        <div className="col-6">
          <p className="text-end"><a className="me-2" href="/account/u.edit">Change Photo</a>|</p>
        </div>
        <div className="col-6 dropdown">
          <a
            className="dropdown-toggle ms-2"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false">Edit My Profile</a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><h6 className="dropdown-header">Profile</h6></li>
            <p className="mx-3 mb-1">Phone Number - {user.profile.phone}</p>
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
  } else {
    return (
      <div className="row justify-content-center g-0">
        <h2 className="text-center mt-3">{user.name}</h2>
      </div>
    );
  }
}

export default AccountSettings;
