import obiwanJpeg from './assets/obiwan404.jpeg';

export const PageNotFound = () => {

  return (
    <main>
      <div className="container-md my-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center text-hubbub display-3 mt-5">404</h1>
            <h2 className="text-center text-muted fst-italic fs-3 mb-5">This is not the page you are looking for...</h2>
            <p className="text-center">Return to <a href="/">Home Page</a>.</p>
            <p className="text-center">Go to <a href="/items/feed">Rent Page</a>.</p>
          </div>
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <img
              className="rounded mx-auto d-block img-fluid my-5 border border-white"
              src={obiwanJpeg}
              alt="Jedi Mind Tricks"
            />
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </main>
  );
}
