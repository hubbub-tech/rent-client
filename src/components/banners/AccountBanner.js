import React from 'react';

import ProfileCard from '../cards/ProfileCard';

const AccountBanner = ({urlBase, user, profile}) => {
  return (
    <div className="container-fluid index-background">
      <div className="row">
        <div className="col-lg-4 col-sm-3"></div>
        <div className="col-lg-4 col-sm-6 mt-5">
          <div className="mx-auto d-block" style={{"width": "300px", "height": "300px"}}>
            <ProfileCard
              hasPicture={profile.has_pic}
              imgPath={`${urlBase}/${user.id}.jpg`}
              userName={user.name} />
          </div>
        </div>
        <div className="col-lg-4 col-sm-3"></div>
      </div>
    </div>
  );
}

export default AccountBanner;
