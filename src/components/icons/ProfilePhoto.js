import React from 'react';

const ProfilePhoto = ({src, user, size }) => {
  if (user.profile_pic) {
    return (
      <div className="mx-auto d-block" style={{"width": size, "height": size}}>
        <img
          className="card-img-top"
          src={src}
          style={{"borderRadius": "50%"}}
          alt="hubbub user"
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
