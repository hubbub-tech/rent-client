import { LoginForm } from './LoginForm';

export const Index = () => {

  return (
    <main>
      <div className="mt-4">
        <div className="container my-5 mx-md-5">
          <div className="row text-center mt-5 mx-md-5">
            <div className="col-12 mt-5">
              <h1>Login</h1>
            </div>
          </div>
          <div className="row mx-md-5">
            <div className="col-lg-4 col-md-3 col-1 my-md-5"></div>
            <div className="col-lg-4 col-md-6 col-10 my-md-5 mx-md-3">
              <LoginForm />
            </div>
            <div className="col-lg-4 col-md-3 col-1 my-md-5"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
