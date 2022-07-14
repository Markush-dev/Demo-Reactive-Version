// @ts-nocheck

import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { ReactReduxContext, Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

// import neural network model:
import NN from "../../contrib/WebARRocksFace/neuralNets/NN_GLASSES_3.json";

// import WebARRocksMirror, a helper
// This helper is not minified, feel free to customize it (and submit pull requests bro):
import mirrorHelper from "../../contrib/WebARRocksFace/helpers/WebARRocksMirror.js";

// import occluder
import GLTFOccluderModel from "../../assets/Occluder/occluder.glb";

// import envMap:
import envMap from "../../assets/Occluder/venice_sunset_1k.hdr";

import Scene from "../Scene/Scene.tsx";
import { computeSizing } from "../../utils/ComputeSizing";
import { getPauseButtonText } from "../../utils/GetPauseButtonText";
import { setGlDomElement } from "../../stores/actions/three.actions";
import { GlassesContainer } from "../Containers/GlassesContainer/GlassesContainer";

let _threeFiber = null;
let _threeVideoMesh = null;

// fake component, display nothing
// just used to get the Camera and the renderer used by React-fiber:
const DirtyHook = (props) => {
  const threeFiber = useThree();
  _threeFiber = threeFiber;
  props.provideGlDomElement(_threeFiber.gl.domElement);

  useFrame(mirrorHelper.update.bind(null, props.sizing, threeFiber.camera));
  mirrorHelper.set_lighting(threeFiber.gl, threeFiber.scene, props.lighting);

  return null;
};

// misc private vars:
const _settings = {
  glassesBranches: {
    // Branch fading parameters (branch become transparent near the ears)
    fadingZ: -0.9, // where to start branch fading. - -> to the back
    fadingTransition: 0.6, // 0 -> hard transition

    // Branch bending (glasses branches are always bent to slightly tighten the head):
    bendingAngle: 5, //in degrees. 0 -> no bending
    bendingZ: 0, //start brench bending at this position. - -> to the back
  },

  lighting: {
    envMap,
    pointLightIntensity: 0.8, // intensity of the point light. Set to 0 to disable
    pointLightY: 200, // larger -> move the pointLight to the top
    hemiLightIntensity: 0, // intensity of the hemispheric light. Set to 0 to disable (not really useful if we use an envmap)
  },

  // occluder 3D model:
  GLTFOccluderModel,

  bloom: {
    threshold: 0.5, // apply bloom is light intensity is above this threshold
    intensity: 8, // intensity of the effect
    kernelSizeLevel: 0, // 0 -> SMALL kernel
    computeScale: 0.1, // 0.5 -> compute using half resolution
    luminanceSmoothing: 0.7,
  },
};

const Videocam = (props) => {
  const PI = 3.1415;
  const scale = 100;

  console.log(`Three fiber`);
  console.log(_threeFiber);
  console.log(mirrorHelper);

  const dispatch = useDispatch();

  // state:
  const [sizing, setSizing] = useState(computeSizing());
  const [isInitialized] = useState(true);
  const currentTick = useSelector((state) => state.selfie.timer);
  const processStatus = useSelector((state) => state.selfie.processIsEnd);

  // refs:
  const togglePauseRef = useRef();
  const canvasFaceRef = useRef();

  const provideGlDomElement = (element) => {
    dispatch(setGlDomElement(element));
  };

  let _timerResize = null;
  let _isPaused = false;
  let selfieTimer: any

  const handle_resize = () => {
    // do not resize too often:
    if (_timerResize) {
      clearTimeout(_timerResize);
    }
    _timerResize = setTimeout(do_resize, 200);
  };

  const do_resize = () => {
    _timerResize = null;
    const newSizing = computeSizing();
    setSizing(newSizing);
  };

  useEffect(() => {
    if (_timerResize === null) {
      mirrorHelper.resize();
    }
  }, [sizing]);

  const toggle_pause = () => {
    if (_isPaused) {
      // we are in paused state => resume
      mirrorHelper.resume(true);
    } else {
      mirrorHelper.pause(true);
    }
    _isPaused = !_isPaused;
    togglePauseRef.current.innerHTML = getPauseButtonText(_isPaused);
  };

  if (_threeFiber) {
    console.log(`Three fiber dom element`);
    console.log(_threeFiber.scene);
  }

  const capture_image = () => {
    const threeCanvas = _threeFiber.gl.domElement;
    mirrorHelper.capture_image(threeCanvas).then((cv) => {
      // download the image in a new window:
      const dataURL = cv.toDataURL("image/png");
      const img = new Image();
      img.src = dataURL;
      img.onload = () => {
        const win = window.open("");
        win.document.write(img.outerHTML);
      };
    });
  };

  useEffect(() => {
    // MT216 : create the frame. We reuse the geometry of the video
    // const calqueMesh = new THREE.Mesh(WebARRocksFaceThreeHelper.videoMesh.geometry, createMaterial2d(new THREE.TextureLoader().load('./frame.png'), true))
    // calqueMesh.renderOrder = 999; // render last
    // calqueMesh.frustumCulled = false;

    mirrorHelper
          .init({
            NN,
            canvasFace: canvasFaceRef.current,
            maxFacesDetected: 1,
          })
          .then(() => {
            // handle resizing / orientation change:
            window.addEventListener("resize", handle_resize);
            window.addEventListener("orientationchange", handle_resize);

            console.log("WEBARROCKSMIRROR helper has been initialized");
          });

        return () => {
          _threeFiber = null;
          window.removeEventListener("resize", handle_resize);
          window.removeEventListener("orientationchange", handle_resize);
          return mirrorHelper.destroy();
        };
    
  }, [isInitialized]);

  return (
    <div>
      {processStatus ? (
        <div
          style={{
            position: "absolute",
            zIndex: 5000,
            display: "flex",
            justifyContent: "center",
            fontSize: "9em",
            fontWeight: "bold",
            alignItems: "center",
            ...sizing,
          }}
        >
          <span>{currentTick}</span>
        </div>
      ) : (
        ""
      )}
      {/* <div processIsEnd={processStatus} style={{
                position: 'absolute',
                zIndex: 5000,
                display: 'flex',
                justifyContent: 'center',
                fontSize:'9em',
                fontWeight: 'bold',
                alignItems: 'center',
                ...sizing
            }}>
                <span>{currentTick}</span>                 
            </div> */}
      {/* Canvas managed by three fiber, for AR: */}
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Canvas
            className="mirrorX"
            style={{
              position: "fixed",
              zIndex: 2,
              ...sizing,
            }}
            gl={{
              preserveDrawingBuffer: true, // allow image capture
            }}
            updateDefaultCamera={false}
          >
            <DirtyHook
              sizing={sizing}
              lighting={_settings.lighting}
              provideGlDomElement={provideGlDomElement}
            />

            <Suspense fallback={null}>
              <Provider store={store}>
                <Scene
                  sizing={sizing}
                  GLTFOccluderModel={_settings.GLTFOccluderModel}
                  faceIndex={0}
                  glassesBranches={_settings.glassesBranches}
                />
              </Provider>
            </Suspense>
          </Canvas>
        )}
      </ReactReduxContext.Consumer>
      {/* <div className='centerNumber'>
                <span>{currentTick}</span> 
            </div> */}
      <div className="VTOButtons">
        <div className="glasses-row" >
         
        </div>
      </div>
      {/* Canvas managed by WebAR.rocks, just displaying the video (and used for WebGL computations) */}
      <canvas
        className="mirrorX"
        ref={canvasFaceRef}
        style={{
          position: "fixed",
          zIndex: 1,
          ...sizing,
        }}
        width={sizing.width}
        height={sizing.height}
      />
    </div>
  );
};

export default Videocam;

// Additional light
/*
        <EffectComposer>
          <Bloom luminanceThreshold={_settings.bloom.threshold} luminanceSmoothing={_settings.bloom.luminanceSmoothing} intensity={_settings.bloom.intensity}
            kernelSize={_settings.bloom.kernelSizeLevel}
            height={_settings.bloom.computeScale * sizing.height} />
        </EffectComposer> */
