import React from 'react';

import RegisterForm from '../forms/RegisterForm';

const Register = ({ setFlashMessages }) => {
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <h1 className="text-center">Sign Up</h1>
          <p className="text-center">Join the revolution in ownership.</p>
          <div className="col-sm-3"></div>
          {/*
            <div className="col-sm-4">
              <ul className="instructions">
                <li>
                  When you order an item from Hubbub, you don't have to pay until
                  the item is delivered to you! We ask for your Venmo/Payment method
                  to simplify payment after we dropoff you order.<mark>Note: you don't
                   need to have a Venmo to use Hubbub :)</mark>
                </li>
                <br />
                <li>
                  Hubbub stands out when it comes to easy dropoffs and pickups. We make sure to
                  keep you up-to-date with your orders so you feel like you're in
                  control of the process. We use your phone number to stay in touch
                  with you on delivery routes.
                </li>
                <br />
                <li>
                  Hubbub asks for your address so we can make the delivery process as
                  seamless for you as possible! We use this address as the recommended
                  delivery/pickup location; however, you can always change this location
                  when scheduling dropoffs and pickups. You can also change your address
                  on your account page. Finally, <mark>your location info is always private</mark>.
                </li>
                <br />
                <li>
                  Hubbub is passionate about user privacy. That is why all account details
                  you choose to share with Hubbub is securely protected and is <mark><i>NEVER</i></mark>
                distributed to or shared with 3rd parties.
                </li>
              </ul>
            </div>
          */}
          <div className="col-sm-6">
            <RegisterForm setFlashMessages={setFlashMessages} />
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </main>
  );
}

export default Register;
