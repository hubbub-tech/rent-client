import successSvg from '../assets/success.svg';

import { DeliveryReturnToRentalsButton } from '../DeliveryReturnToRentalsButton';

export const DropoffConfirmation = () => {
  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8 col-12">
            <h1>Confirmation</h1>
            <p>We've received your dropoff request.</p>
            <p>You should receive an email confirmation shortly, recording our responses.</p>
            <hr />
            <div className="row mt-5">
              <div className="col-md-1 col-4 align-middle mx-auto my-2">
                <img src={successSvg} alt="check-cancel" className="img-fluid" />
              </div>
              <div className="col-md-11 col-12 my-2">
                <p className="fs-2 mb-5 text-md-start text-center align-middle">We'll set a time for one of our couriers to drop your order off!</p>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <DeliveryReturnToRentalsButton />
              </div>
            </div>
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    </main>
  );
}
