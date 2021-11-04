import React from 'react';

const ProfilePhoto = ({urlBase, user, size }) => {
  if (user.profile.has_pic) {
    return (
      <div className="mx-auto d-block"  style={{"width": size, "height": size}}>
        <img
          className="card-img-top"
          src={`${urlBase}/${user.id}.jpg`}
          style={{"borderRadius": "50%"}}
          alt={user.name}
        />
      </div>
    );
  } else {
    return (
      <div className="mx-auto d-block" style={{"width": size, "height": size}}>
        <img
          className="card-img-top"
          src="/static/users/roaree.jpg"
          style={{"borderRadius": "50%"}}
          alt="roaree"
        />
      </div>
    );
  }
}

export default ProfilePhoto;
