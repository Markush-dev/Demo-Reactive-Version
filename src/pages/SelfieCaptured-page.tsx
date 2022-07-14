// @ts-nocheck
import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { Image as KonvaImage, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import { IndividualSticker } from '../components/IndividualSticker/individualSticker';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import { setSelfiePhoto } from '../stores/actions/selfie.actions';

import { computeSizing } from '../utils/ComputeSizing';
import { ComputeCaptureButtonSizing } from '../utils/ComputeCaptureButtonSizing';
import { SlickSliderBackground } from '../components/Containers/BackgroundContainer/SlickSliderBackground';
import { SlickSTicker } from '../components/Containers/StickerContainer/SlickSticker';

import { Button, Stack } from '@mui/material';
import { setShowFrame } from '../stores/actions/videocam.actions';
import * as THREE from 'three';
import { createMaterial2d } from '../utils/CreateMaterial2D';
import { useLoader } from 'react-three-fiber';

var axios = require('axios');

const CapturedPhoto = () => {
  const photo = useSelector((state) => state.selfie.photo);
  const history = useHistory();
  const dispatch = useDispatch();
  if (!photo || !photo.currentSrc) {
    history.push('/');
  }
  if (!photo) return null;
  const [originalImage] = useImage(photo?.currentSrc); // orignal image from camera

  const [bgRemovedImage, setBgRemovedImage] = useState(photo?.currentSrc); // bg removed image saved here
  const [canvasImage, setCanvasImage] = useState(originalImage); // bg removed image to display on canvas
  const [backgroundImage, setBackgroundImage] = useState(null); // when user select background it will be saved here
  const [frameImage, setFrameImage] = useState(null);          // frame image when user select frame
  const [bgRemovedApiImage, setBgRemovedApiImage] = useState(null);
  const [images, setImages] = useState([]);
  const [NextTrue, setNextTrue] = useState(false);
  const [selectedId, selectSticker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] =  useState(0)
  // to apply backgrounds
  const refBgRemoveTempCanvas = useRef();
  const refFrameCanvas = useRef();
  const refResultCanvas = useRef();
  const mainCanvasRef = useRef(); // stage canvas
  const test = useRef<HTMLImageElement>()

  const [sizing, setSizing] = useState(computeSizing());
  const [btnSizing, setBtnSizing] = useState(ComputeCaptureButtonSizing());
  const frame = useSelector(state => state.videocam.frame);
  const showFrame = useSelector(state => state.videocam.showFrame);
  const { background } = useSelector((response) => response);
  const { sticker } = useSelector((response) => response);

  useEffect(() => {

    if (sticker && sticker.url) {
      console.log('sticker added');

      addStickerToPanel(sticker.url, 200, 100, 100);
    } else {
      addStickerToPanel(null, 200, 100, 100);
    }

  }, [sticker]);

  useEffect(() => {
    if (bgRemovedImage) {
      console.log('final image changed', bgRemovedImage);
      const imgTemp = new Image();
      imgTemp.src = bgRemovedImage;
      setCanvasImage(imgTemp);
    }
  }, [bgRemovedImage]);

  useEffect(() => {
    if (frame) {
      console.log('Frame image changed', frame);
      const img = new Image();
      img.src = frame;
      img.height = sizing.height
      img.width = sizing.width
      setFrameImage(img);
    }
  }, [frame]);

  useEffect(() => {
    console.log('orignal one time');
    if (photo?.currentSrc) {
      refFrameCanvas.current.width = sizing.width;
      refFrameCanvas.current.height = sizing.height;
      const ctx = refFrameCanvas.current.getContext('2d');
      const img3 = new Image();
      img3.src = photo.currentSrc;
      img3.onload = async () => {

        console.log('orignal image height:{0}, width:{1}', img3.height, img3.width);
        ctx.drawImage(img3, 0, 0, sizing.width, sizing.height);

        const removeBg = async () => {
          await bgRemovalApi();
        };

        removeBg();
      };
    }
  }, []);

  useEffect(() => {
    if (background) {
      if (background.url == null) {
        setBackgroundImage(null);
      } else {
        changeBg(background.url);
      }
    }
  }, [background]);

  const changeBg = (url) => {
    // console.log(canvasImage);
    //await bgRemoval(bg3)
    const img3 = new Image();
    img3.src = url;
    img3.width = sizing.width;
    img3.height = sizing.height;
    img3.onload = () => {
      console.log('background height:{0}, width:{1}', img3.height, img3.width);
      setBackgroundImage(img3);
    };
  };

  const FinalPage = () => {
    selectSticker(null);
    console.log('FinalPage clicked');

    setTimeout(() => {
      const imgData = mainCanvasRef.current.toDataURL();
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        dispatch(setSelfiePhoto(img));
        setImages([]);

        history.push('/FinalImagePage');

      };
    }, 1600);

  };

  const NextStick = () => {
    setNextTrue(!NextTrue);
  };

  const RetakeFn = () => {
    setTimeout(() => {
      history.goBack();
    }, 500);

  };

  const bgRemovalApi = async () => {

    var FormData = require('form-data');
    var data = new FormData();
    data.append('image_url', refFrameCanvas.current.toDataURL());
    data.append('get_base64', '1');

    var config = {
      method: 'post',
      url: 'https://api.removal.ai/3.0/remove',
      headers: {
        'Rm-Token': '623bff8a494c24.16547880',
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    console.log('calling api for bg removal');

    setIsLoading(true);
    // return;
    axios(config)
      .then(function (response) {
        setIsLoading(false);
        if (response.status == 200) {

          //console.log(response.data.preview_demo);
          //console.log(response.data.base64);
          const base64ImageRemovedBg = 'data:image/png;base64,' + response.data.base64;

          setBgRemovedApiImage(base64ImageRemovedBg);
          setBgRemovedImage(base64ImageRemovedBg);

        }
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const resetAllButtons = useCallback(() => {
    images.forEach((image) => {
      if (image.resetButtonRef.current) {
        image.resetButtonRef.current();
      }
    });
  }, [images]);

  const handleCanvasClick = useCallback(
    (event) => {
      if (event.target.attrs.id === 'backgroundImage') {
        resetAllButtons();
      }
    }, [resetAllButtons]);

  const ReRenderCmp = () => {
    //it re-renders the component through Window Prototyping
    history.go(-2);
    location.reload();
    window.location.href = '/SelfiPage';
  };

  const addStickerToPanel = (src, width, x, y) => {
    console.log('inside addStickerToPanel:', src);
    setImages((currentImages) => [
      ...currentImages,
      {
        width,
        x,
        y,
        src,
        resetButtonRef: createRef(),
      },
    ]);
  };

  const checkDeselect = (e) => {

    console.log('stage click:', e.target.attrs.id);
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target.attrs.id === 'backgroundImage';
    if (clickedOnEmpty) {
      console.log('stage click:', selectedId);
      selectSticker(null);
    }
  };

  return (
    <div>
      <>
        {/* No display only used to save images for processing */}

        <img src="/Backgrounds/envMap.jpg" style={{ display: 'none' }} />

        <canvas ref={refFrameCanvas} className="captured_image_canvas frame" style={{ display: 'none' }}></canvas>
        <canvas ref={refBgRemoveTempCanvas} className="captured_image_canvas outline"
                style={{ display: 'none' }}></canvas>
        <canvas ref={refResultCanvas} className="captured_image_canvas result" style={{ display: 'none' }}></canvas>

      </>

      {/* This is the main stage where images are displayed */}

      <Stage
        ref={mainCanvasRef}
        width={sizing.width}
        height={sizing.height}
        style={{
          marginLeft: sizing.left,
          position: 'fixed',
          // transform:'rotateY(180deg)',
          zIndex: 1,
        }}
        onClick={handleCanvasClick}
        onTap={handleCanvasClick}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}>

        {/* background layer */}

        {backgroundImage &&
          <Layer>
            <KonvaImage
              image={backgroundImage}
              id="backgroundImage"

            />
          </Layer>
        }

        <Layer>
          <KonvaImage
            image={backgroundImage ? canvasImage : originalImage}

            id="backgroundImage"
          />


        </Layer>
        <Layer >
          <KonvaImage image={frameImage}
                      />

          {images.map((image, i) => {
            return (
              <IndividualSticker
                onDelete={() => {
                  const newImages = [...images];
                  newImages.splice(i, 1);
                  setImages(newImages);
                }}
                onDragEnd={(event) => {
                  image.x = event.target.x();
                  image.y = event.target.y();

                }}
                key={i}
                image={image}
                isSelected={i === selectedId}
                onSelect={() => {
                  selectSticker(i);
                }}
              />
            );
          })}

        </Layer>
      </Stage>
      <>
      </>

      {
        !NextTrue ?
          <SlickSliderBackground top={btnSizing.top}></SlickSliderBackground>
          :
          <SlickSTicker top={btnSizing.top}></SlickSTicker>

      }
      <div style={{
        marginTop: btnSizing.top + 30,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
      }}>
        <div>

          <Stack direction="row" spacing={2}>
            {/* Orev Sticker and Final Page Button*/}
            {
              NextTrue ?
                <div>
                  <Button
                    sx={{ mr: 2 }}
                    onClick={() => {
                      setNextTrue(!NextTrue);
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Prev
                  </Button>

                  <Button
                    onClick={FinalPage}

                    variant="contained"
                    color="primary"
                  >
                    Next
                  </Button>
                </div>
                :
                null
            }

            {/* Next Sticker and Retake Button*/}

            {
              !(NextTrue) ?
                <div>
                  <Button
                    sx={{ mr: 2 }}
                    onClick={ReRenderCmp}
                    variant="contained"
                    color="secondary"
                  >
                    Retake
                  </Button>

                  <Button
                    onClick={NextStick}
                    variant="contained"
                    color="success"
                  >
                    Next
                  </Button>
                </div>
                :
                null
            }
          </Stack>
        </div>
      </div>

      <div>{/* <button onClick={removeBg}>remove BG</button> */}</div>


    </div>
  );
};

export default CapturedPhoto;
