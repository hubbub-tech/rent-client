import React from 'react';

const ProfileCard = ({urlBase, user}) => {
  if (user.profile.has_pic) {
    return (
      <div className="crop-circle mx-auto d-block">
        <img src={`${urlBase}/${user.id}.jpg`} alt={user.name} />
      </div>
    );
  } else {
    return (
      <div className="mx-auto d-block" style={{"width": "300px", "height": "300px"}}>
        <img className="card-img-top" src="static/users/roaree.jpg" style={{"borderRadius": "50%"}} alt="roaree" />
      </div>
    );
  }
}

export default ProfileCard;
