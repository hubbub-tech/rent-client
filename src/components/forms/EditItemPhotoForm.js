import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNagivate } from 'react-router-dom';

import CropInput from '../inputs/CropInput';
import FormErrors from '../errors/FormErrors';

const EditItemPhotoForm = ({ item, setFlashMessages }) => {
  let statusOK;

  const history = useNagivate();
  const formData = new FormData();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCropped, setIsCropped] = useState(false);
  const [errors, setErrors] = useState({
    "email": [],
    "payment": [],
    "server": []
  });

  const isStatusOK = (res) => {
    statusOK = res.ok;
    return res.json();
  }

  const submit = (e) => {
    e.preventDefault();
    const hubbubId = Cookies.get('hubbubId');
    const hubbubToken = Cookies.get('hubbubToken');

    formData.append('hubbubId', hubbubId);
    formData.append('hubbubToken', hubbubToken);
    formData.append('itemId', itemId)
    formData.append('image', selectedFile);

    fetch(process.env.REACT_APP_SERVER + '/accounts/i/photo/submit', {
      method: 'POST',
      body: formData
    })
    .then(isStatusOK)
    .then(data => {
      setFlashMessages(data.messages);

      if (statusOK) {
        history.push(`/accounts/u/id=${item.lister_id}`);
      } else {
        setErrors({ ...errors, server: data.errors });
      }
    })
    .catch(error => console.log(error));
  }

  return (
    <form encType="multipart/form-data" onSubmit={submit}>
      <div className="card mx-auto" style={{"maxWidth": "540px"}}>
        <div className="card-body">
          <FormErrors errors={errors.server} color={"red"} />
          <CropInput
            label={"Update Item Photo"}
            setSelectedFile={setSelectedFile}
            aspectRatio={3 / 4}
          />
          {selectedFile &&
            <div className="d-grid gap-2">
              <input
                className="btn btn-success mt-2"
                type='submit'
                value='Submit'
              />
            </div>
          }
        </div>
      </div>
    </form>
  );
}

export default EditItemPhotoForm;
