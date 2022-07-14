// @ts-nocheck
import React, { useRef } from "react";
import styles from "../../src/styles/index.scss";
import { createRef, useState, useCallback, useEffect } from "react";
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { IndividualSticker } from "../components/IndividualSticker/individualSticker";
import { backgroundData } from "./pageData/background.data";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";



// Background Removal
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";

import {
  Button,
  Stack
} from "@mui/material";
import * as THREE from 'three';
import { createMaterial2d } from '../utils/CreateMaterial2D';
import { Canvas, useLoader } from 'react-three-fiber';
import { computeSizing } from '../utils/ComputeSizing';

const FinalImagePage = () => {
  // USESTATE
  const photo = useSelector((state) => state.selfie.photo);
  const [imageSrc, setImageSrc] = useState("");
  const [originalImage] = useImage(photo?.currentSrc);
  const history = useHistory();
  const refFrameCanvas = useRef();
  if (!photo) {
    history.push("/");
  }

  useEffect(() => {

    if (photo != null) {
      console.log("photo not null");

      const w = photo.width * 0.6;
      const h = photo.height * 0.6;

      const margins = (window.innerWidth - w);

      const left = (window.innerWidth - w - margins / 2); //20% margin left
      const right = window.innerWidth * 0.2; //20% margin left

      //refFrameCanvas.current.width = window.innerWidth;
      //refFrameCanvas.current.height = h;
      const ctx = refFrameCanvas.current.getContext("2d");
      setImageSrc(photo?.currentSrc)
      const img3 = new Image()
      img3.src = photo?.currentSrc
      img3.onload = () => {
        //ctx.drawImage(img3, left, 10, w, h)
      }
    } else {
      console.log("photo null");
    }
  }, [photo])

  async function downloadImage() {
    const image = await fetch(photo.currentSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog); //convert object url

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "Augmented Picture";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function startAgain() {
    location.reload(); 
  }
  if (!photo) return null;

  return (
    <section id="photo_type_selection">
      <div className="header"></div>

      <div style={{ justifyContent: "center", alignItems: "center" }}>
        <div className="upload_image" 
        style={{ width: "100%",  textAlign: "center" }}>
          {imageSrc && (
            <img src={imageSrc}
            height="50%"
            width="50%"
            />
          )}
          <canvas ref={refFrameCanvas} className='' style={{ display: "none" }}></canvas>
        </div>
        <div className="assets_section">

          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", marginTop: '10px' }}>

            <Stack direction="row" spacing={2}>
              <Button onClick={startAgain} variant="contained" color="primary" >Start Over</Button>
              <Button onClick={downloadImage} variant="contained" color="success"  >Download</Button>
            </Stack>


          </div>

          <div>{/* <button onClick={removeBg}>remove BG</button> */}</div>

          <div className="captured2">

          </div>

        </div>
      </div>
    </section>
  );
};

export default FinalImagePage;
