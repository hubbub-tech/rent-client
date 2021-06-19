import React from 'react';

const AccountCard = ({ user }) => {
  return (
    <div className="card" style={{"width": "18rem"}}>
      <div className="card-body">
        <h6 className="card-subtitle mb-3 text-alert">You are the only one who can view these details.</h6>
        <hr className="dropdown-divider"/>
        <p className="card-text my-3">Phone Number - {user.profile.phone}</p>
        <p className="card-text">Payment - {user.payment}</p>
        <hr className="dropdown-divider"/>
        <a className="card-link" href="/account/u/edit">Edit Profile</a>
        <a className="card-link" href="/account/u/password">Change Password</a>
      </div>
    </div>
  );
}

export default AccountCard;
