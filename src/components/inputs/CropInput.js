import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const CropInput = ({ setSelectedFile, aspectRatio, label }) => {
  const [upImg, setUpImg] = useState();
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [isCropped, setIsCropped] = useState(false);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    aspect: aspectRatio
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const saveCroppedImage = (canvas) => {
    const setCropToFile = (blob) => setSelectedFile(blob);
    canvas.toBlob(setCropToFile, 'image/png', 1);
  }

  // This displays the uploaded file to the user--in this case, an image
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <div className="image-input">
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">{label}</label>
        <input
          className="form-control"
          type="file"
          id="formFile"
          name="image"
          accept="image/*"
          onChange={onSelectFile}
        />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div className="mx-auto d-block">
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0)
          }}
        >
        </canvas>
      </div>
      <div className="d-grid gap-2">
        <button
          type="button"
          className="btn btn-outline-success"
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() => saveCroppedImage(previewCanvasRef.current, completedCrop)}
        >
          Set Crop
        </button>
      </div>
    </div>
  );
}

export default CropInput;
