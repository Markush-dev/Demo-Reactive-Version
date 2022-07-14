// @ts-nocheck
import React, { useRef } from "react";
import styles from "../../src/styles/index.scss";
import { createRef, useState, useCallback,useEffect } from "react";
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useImage from "use-image";
import { IndividualSticker } from "../components/IndividualSticker/individualSticker";
import { backgroundData } from "./pageData/background.data";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

// Background Removal
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl"; 
import { SlickSliderBackground } from "../components/Containers/BackgroundContainer/SlickSliderBackground";

const SliderTest = () => {

  async function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log(dataUri);

    await downloadImage(dataUri);
    
  }
  async function downloadImage(dataUri) {
    const image = await fetch(dataUri);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog); //convert object url
 
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "Augmented Picture";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
    />
  );
};

export default SliderTest;
