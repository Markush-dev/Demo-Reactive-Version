import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { computeSizing } from "../utils/ComputeSizing";
import { setSelfiePhoto } from '../stores/actions/selfie.actions'
import { useHistory } from 'react-router-dom'





const HDCamPage = () => {

  const webcamRef = React.useRef(null);
  const history = useHistory()
  const [sizing, setSizing] = useState(computeSizing());
  const dispatch = useDispatch();
  
  const [imageSrc, setImageSrc] = useState("");
  const [imgTaken, setSetImgTaken] = useState(false);

  const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "user"
  };


  // 1920x1080
  // 720x1280
  return (
    <div>
      <div
        style={{
          display: imgTaken ? 'none' : ''
        }}
      >
        <Webcam
          ref={webcamRef}
          forceScreenshotSourceSize
          videoConstraints={{
            height: 1080,
            width: 1920
          }}
          height={sizing.height-50}
          width={sizing.width}
          screenshotFormat='image/png'
        >
          {({ getScreenshot }) => (
            <button
              onClick={() => {
                const imageSrc = getScreenshot()
                console.log(imageSrc);

                if (!imageSrc) return;

                setImageSrc(imageSrc);

                const img = new Image()
                img.src = imageSrc
                img.onload = () => {
                  console.log("w;", img.width);
                  console.log("h;", img.height);

                  dispatch(setSelfiePhoto(img))
                  history.push('/photo')

                }

                //dispatch(setSelfiePhoto(img))
                setSetImgTaken(true);
              }}
            >
              Capture photo
            </button>
          )}

        </Webcam>
      </div>
      {imageSrc && (
        <img src={imageSrc} />
      )}
    </div>
  );
};

export default HDCamPage;