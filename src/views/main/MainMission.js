import { MainNewsletter } from './MainNewsletter';

export const MainMission = () => {
  return (
    <section>
      <div className="container-md mb-5">
        <div className="row mt-5">
          <div className="col-sm-1"></div>
          <div className="col-sm-5">
            <h2 className="text-start mt-5 mb-3">
              We believe that what’s best for <span className="text-hubbub">you</span> can
               also be what’s best for the <span className="text-hubbub">climate</span> 🌎.
            </h2>
            <p className="text-start fs-5 mb-5">
              Our goal is to make it incredibly easy and enjoyable for you to get
              the products you need without always having to buy everything yourself.
              In doing so, we’re also able to extend the useful lifespan of items
              already in existence, keep quality items out of landfill, and reduce
              the need to produce and ship new stuff around the world.
            </p>
          </div>
          <div className="col-sm-5">
            <MainNewsletter />
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    </section>
  );
}
