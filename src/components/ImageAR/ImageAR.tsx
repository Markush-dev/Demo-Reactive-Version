// @ts-nocheck

import React, { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree, useLoader } from 'react-three-fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// import GLTF loader - originally in examples/jsm/loaders/
import { GLTFLoader } from '../../contrib/three/v126/examples/jsm/loaders/GLTFLoader.js'

// import components:
import BackButton from '../BackButton.js'
import VTOButton from '../VTOButton.js'

// import neural network model:
import NN from '../../contrib/WebARRocksFace/neuralNets/NN_GLASSES_3.json'

// import WebARRocksMirror, a helper
// This helper is not minified, feel free to customize it (and submit pull requests bro):
import mirrorHelper from '../../contrib/WebARRocksFace/helpers/WebARRocksMirror.js'

// ASSETS:
// import 3D models of sunglasses
import GLTFModel1 from '../../assets/VTOGlasses/models3D/glasses7.glb'
import GLTFModel2 from '../../assets/VTOGlasses/models3D/Glasses.glb'

// import occluder
import GLTFOccluderModel from '../../assets/VTOGlasses/models3D/occluder.glb'

// import envMap:
import envMap from '../../assets/VTOGlasses/envmaps/venice_sunset_1k.hdr'
import frame from './frame.png'

import Scene from '../Scene/Scene.tsx'
import { DebugCube } from '../../utils/DebugCube'
import { computeSizing } from '../../utils/ComputeSizing'
import { getPauseButtonText } from '../../utils/GetPauseButtonText'
import { createMaterial2d } from '../../utils/CreateMaterial2D'
import WebARRocksFaceThreeHelper from '../../contrib/WebARRocksFace/helpers/WebARRocksFaceThreeHelper.js'
import { ImageUploader } from '../ImageUploader/ImageUploader.js'
import { useDispatch, useSelector } from 'react-redux';
import { setGlassesModel } from '../../stores/actions/videocam.actions'
import SceneImage from '../SceneImage/SceneImage'

// import Shape2D helper:
/*
    New
*/
import shape2DHelper from '../../contrib/WebARRocksFace/helpers/WebARRocksFaceShape2DHelper.js'
import WEBARROCKSFACE from '../../contrib/WebARRocksFace/dist/WebARRocksFace.module'
import Face from './face.jpg'

let _threeFiber = null
let _threeVideoMesh = null

// fake component, display nothing
// just used to get the Camera and the renderer used by React-fiber:
const DirtyHook = (props) => {
  const threeFiber = useThree()
  _threeFiber = threeFiber

  useFrame(mirrorHelper.update.bind(null, props.sizing, threeFiber.camera))
  mirrorHelper.set_lighting(threeFiber.gl, threeFiber.scene, props.lighting)

  return null
}

let cubeTexture = null
let cubeImage = null
let faceTexture = null

/*
    Component that should work with uploaded face image
    Still in development
*/

const ImageAR = (props) => {
  const PI = 3.1415
  const scale = 100

  console.log(`Three fiber`)
  console.log(_threeFiber)
  console.log(mirrorHelper)

  const dispatch = useDispatch()
  const showFrame = useSelector(state => state.videocam.showFrame);
  const showGlasses = useSelector(state => state.videocam.showGlasses)
  const frame = useSelector(state => state.videocam.frame)
  const glassesModel = useSelector(state => state.videocam.glassesModel);

  // My code

  // const videoGeometry = new THREE.BufferGeometry()
  // const videoScreenCorners = new Float32Array([-1,-1,   1,-1,   1,1,   -1,1]);
  // videoGeometry.addAttribute( 'position', new THREE.BufferAttribute( videoScreenCorners, 2 ) );
  // videoGeometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0,1,2, 0,2,3]), 1));
  // _threeVideoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
  // that.apply_videoTexture(_threeVideoMesh);
  // _threeVideoMesh.renderOrder = -1000; // render first
  // _threeVideoMesh.frustumCulled = false;
  // _threeScene.add(_threeVideoMesh);

  // state:
  const [sizing, setSizing] = useState(computeSizing())
  const [model, setModel] = useState(GLTFModel1)
  const [isInitialized] = useState(true)
  const texture = useLoader(THREE.TextureLoader, frame)

  // refs:
  const togglePauseRef = useRef()
  const canvasFaceRef = useRef()

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
      hemiLightIntensity: 0 // intensity of the hemispheric light. Set to 0 to disable (not really useful if we use an envmap)
    },

    // occluder 3D model:
    GLTFOccluderModel,

    bloom: {
      threshold: 0.5, // apply bloom is light intensity is above this threshold
      intensity: 8, // intensity of the effect
      kernelSizeLevel: 0, // 0 -> SMALL kernel
      computeScale: 0.5, // 0.5 -> compute using half resolution
      luminanceSmoothing: 0.7
    }
  }
  let _timerResize = null
  let _isPaused = false


  const handle_resize = () => {
    // do not resize too often:
    if (_timerResize) {
      clearTimeout(_timerResize)
    }
    _timerResize = setTimeout(do_resize, 200)
  }


  const do_resize = () => {
    _timerResize = null
    const newSizing = computeSizing()
    setSizing(newSizing)
  }


  useEffect(() => {
    if (_timerResize === null) {
      mirrorHelper.resize()
    }
  }, [sizing])


  const toggle_pause = () => {
    if (_isPaused) {
      // we are in paused state => resume
      mirrorHelper.resume(true)
    } else {
      mirrorHelper.pause(true)
    }
    _isPaused = !_isPaused
    togglePauseRef.current.innerHTML = getPauseButtonText(_isPaused)
  }

  if (_threeFiber) {
    console.log(`Three fiber dom element`)
    console.log(_threeFiber.scene)
  }

  const capture_image = () => {
    const threeCanvas = _threeFiber.gl.domElement
    mirrorHelper.capture_image(threeCanvas).then((cv) => {
      // download the image in a new window:
      const dataURL = cv.toDataURL('image/png')
      const img = new Image()
      img.src = dataURL
      img.onload = () => {
        const win = window.open("")
        win.document.write(img.outerHTML)
      }
    })
  }

  // console.log(`Cube txture`)
  // console.log(cubeTexture)

  // console.log(`Cube image`)
  // console.log(cubeImage)


  useEffect(() => {

    // MT216 : create the frame. We reuse the geometry of the video
    // const calqueMesh = new THREE.Mesh(WebARRocksFaceThreeHelper.videoMesh.geometry, createMaterial2d(new THREE.TextureLoader().load('./frame.png'), true))
    // calqueMesh.renderOrder = 999; // render last
    // calqueMesh.frustumCulled = false;

    mirrorHelper.init({
      NN,
      canvasFace: canvasFaceRef.current,
      maxFacesDetected: 1
    }).then(() => {
      // handle resizing / orientation change:
      window.addEventListener('resize', handle_resize)
      window.addEventListener('orientationchange', handle_resize)

      console.log('WEBARROCKSMIRROR helper has been initialized')
    })

    return () => {
      _threeFiber = null
      return mirrorHelper.destroy()
    }
  }, [isInitialized])


  // faceTexture = loadTexture(_gl, Face)
  // initTextures()


  useEffect(() => {
    setTimeout(() => {
      // if (faceTexture) {
      //     console.log(`Face texture is`)
      //     console.log(faceTexture)
      //     WEBARROCKSFACE.set_inputTexture(faceTexture, sizing.width, sizing.height)
      // }
      // faceTexture = loadTexture(gl, Face)
      let gl = WebARRocksFaceThreeHelper.getGl()
      console.log(`Gl is`)
      console.log(gl)
      // console.log(gl.canvas.width += 100)
      // console.log(canvasFaceRef.current.width += 100)

      initTextures(gl)

      setTimeout(() => {
        console.log(`Face texture is`)
        console.log(cubeTexture)
        // WEBARROCKSFACE.reset_inputTexture()
        WEBARROCKSFACE.set_inputTexture(cubeTexture, sizing.width, sizing.height)
        WebARRocksFaceThreeHelper.setVideoTexture(cubeTexture)
        // let videoTexture = WebARRocksFaceThreeHelper.getVideoTexture()

        // console.log(`Video texture`)
        // console.log(videoTexture)
        // videoTexture = cubeTexture

        console.log(`Gl is`)
        console.log(gl)


        console.log(`Canvas ref`)
        console.log(canvasFaceRef)

      }, 5000)
    }, 7000)
  }, [])

  return (
    <div>

      {/* Canvas managed by three fiber, for AR: */}
      <Canvas className='mirrorX' style={{
        position: 'fixed',
        zIndex: 2,
        ...sizing
      }}
        gl={{
          preserveDrawingBuffer: true, // allow image capture

        }}
        updateDefaultCamera={false}
      >
        <DirtyHook sizing={sizing} lighting={_settings.lighting} />

        <Suspense fallback={<DebugCube />}>

          <SceneImage
            sizing={sizing}
            GLTFModel={glassesModel}
            GLTFOccluderModel={_settings.GLTFOccluderModel}
            faceIndex={0} glassesBranches={_settings.glassesBranches}
            texture={texture}
            customFrame={frame}
            showFrame={showFrame}
            showGlasses={showGlasses}
          />

        </Suspense>

      </Canvas>

      {/* Canvas managed by WebAR.rocks, just displaying the video (and used for WebGL computations) */}
      <canvas className='mirrorX' ref={canvasFaceRef} style={{
        position: 'fixed',
        zIndex: 1,
        ...sizing
      }} width={sizing.width} height={sizing.height} />
    </div>
  )
}

export default ImageAR


// Дополнительный свет
/*
        <EffectComposer>
          <Bloom luminanceThreshold={_settings.bloom.threshold} luminanceSmoothing={_settings.bloom.luminanceSmoothing} intensity={_settings.bloom.intensity}
            kernelSize={_settings.bloom.kernelSizeLevel}
            height={_settings.bloom.computeScale * sizing.height} />
        </EffectComposer> */

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be downloaded over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
    width, height, border, srcFormat, srcType,
    pixel);

  const image = new Image();
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
      srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      // Yes, it's a power of 2. Generate mips.
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // No, it's not a power of 2. Turn off mips and set
      // wrapping to clamp to edge
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function initTextures(gl) {
  cubeTexture = gl.createTexture();
  cubeImage = new Image();
  cubeImage.onload = function () { handleTextureLoaded(gl, cubeImage, cubeTexture); }
  cubeImage.src = Face;
  console.log(`Cube image is`)
  console.log(cubeImage)
}

function handleTextureLoaded(gl, image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}