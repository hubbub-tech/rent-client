import { useState, useEffect } from 'react';

import { ListItemForm } from './ListItemForm';

export const Index = () => {

  const [tags, setTags] = useState([]);

  useEffect(() => {

    const getData = async(url) => {
      const response = await fetch(url, { mode: "cors", credentials: "include" });
      const data = await response.json();

      setTags(data.tags);
    };

    getData(process.env.REACT_APP_SERVER + '/api/v0/tags')
    .catch(console.error);
  }, []);

  return (
    <main>
      <div className="container-md my-3">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 mt-4">
            <h1>List an Item</h1>
            <p>Put an item up on Hubbub for the world to rent!</p>
            <hr />
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
        </div>
        <div className="row mb-3">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <ListItemForm tags={tags} />
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </main>
  );
}
