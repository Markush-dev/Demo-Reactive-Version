// @ts-nocheck

import React, { useEffect, useRef } from 'react';
import { useLoader } from 'react-three-fiber';
import { useSelector } from 'react-redux';
import * as THREE from 'three';

// import GLTF loader - originally in examples/jsm/loaders/
import { GLTFLoader } from '../../contrib/three/v126/examples/jsm/loaders/GLTFLoader.js';

// import WebARRocksMirror, a helper
// This helper is not minified, feel free to customize it (and submit pull requests bro):
import mirrorHelper from '../../contrib/WebARRocksFace/helpers/WebARRocksMirror.js';
import { createMaterial2d } from '../../utils/CreateMaterial2D.js';

const loader: any = new GLTFLoader();
let mesh = null;

const Scene = React.memo(function (props) {

  mirrorHelper.clean();
  const objRef = useRef();

  const frame = useSelector(state => state.videocam.frame);
  const glassesModel = useSelector(state => state.videocam.glassesModel);
  const showFrame = useSelector(state => state.videocam.showFrame);
  const showGlasses = useSelector(state => state.videocam.showGlasses);

  useEffect(() => {
    const threeObject3DParent: any = objRef.current;
    console.log(`Three obj parrent`);
    if (threeObject3DParent.children.length === 0) {
      console.log(`threeObject3DParent.children.length not found`);
      return;
    }
    const threeObject3D = threeObject3DParent.children[0];
    if (threeObject3D.children.length === 0) {
      console.log('threeObject3D.children.length not found');
      return;
    }
    const model = threeObject3D.children[0];

    mirrorHelper.set_glassesPose(model);
    mirrorHelper.tweak_materials(model, props.glassesBranches);
    mirrorHelper.set_faceFollower(threeObject3DParent, threeObject3D, props.faceIndex);
    window.plapp = threeObject3D;
    console.debug(`Hook of setting glasses model`);

    // return () =>  {
    //     mirrorHelper.clean();
    // }

  }, [glassesModel, showGlasses, showFrame, frame, props.sizing]);

  if (frame && showFrame) {

    const geometry = new THREE.PlaneGeometry(2, 2);
    mesh = new THREE.Mesh(geometry, createMaterial2d(useLoader(THREE.TextureLoader, frame), true));
    console.log(mesh);
    mesh.renderOrder = 999; // render last
    mesh.frustumCulled = false;
  }

  // import main model:
  const gltf = useLoader(GLTFLoader, glassesModel);
  console.log(`Gltf model`);
  console.log(gltf);
  const model = gltf.scene.clone();

  // import and create occluder:
  const isDebugOccluder = false; // true to debug the occluder
  const gltfOccluder = useLoader(GLTFLoader, props.GLTFOccluderModel);
  const occluderModel = gltfOccluder.scene.clone();
  const occluderMesh = mirrorHelper.create_occluderMesh(occluderModel, isDebugOccluder);
  console.log(`Scene did a render`);
  // console.log(customMesh)
  // console.log(three)
  console.log(`Props`);
  console.log(props);

  return (
    <object3D ref={objRef}>
      <object3D>
        {model && showGlasses ? <primitive object={model} /> : null}
        {occluderMesh ? <primitive object={occluderMesh} /> : null}


        {mesh && showFrame ? <primitive object={mesh} /> : null}
      </object3D>
    </object3D>
  );
});

export default Scene;

function modelLoader(model: any): Promise<any> {
  return new Promise((resolve, reject) => {
    loader.load(model, (data: any) => resolve(data), null, reject);
  });
}