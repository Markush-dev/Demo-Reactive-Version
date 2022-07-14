// @ts-nocheck

import { useEffect, useRef, useState } from "react"
import React from 'react'
import { useLoader } from "react-three-fiber"
import * as THREE from 'three'

// import GLTF loader - originally in examples/jsm/loaders/
import { GLTFLoader } from '../../contrib/three/v126/examples/jsm/loaders/GLTFLoader.js'

// import WebARRocksMirror, a helper
// This helper is not minified, feel free to customize it (and submit pull requests bro):
import mirrorHelper from '../../contrib/WebARRocksFace/helpers/WebARRocksMirror.js'
import { createMaterial2d } from "../../utils/CreateMaterial2D.js"
import { DebugCube } from "../../utils/DebugCube.js"

const loader: any = new GLTFLoader();

const SceneImage = (props: any) => {

    const objRef = useRef()
    
    mirrorHelper.clean()

    let mesh = null

    useEffect(() => {
        const threeObject3DParent: any = objRef.current
        console.log(`Three obj parrent`)
        console.log(objRef.current)
        if (threeObject3DParent.children.length === 0) {
            console.log(`threeObject3DParent.children.length not found`)
            return
        }
        const threeObject3D = threeObject3DParent.children[0]
        if (threeObject3D.children.length === 0) {
            console.log('threeObject3D.children.length not found')
            return
        }
        const model = threeObject3D.children[0]

        mirrorHelper.set_glassesPose(model)
        mirrorHelper.tweak_materials(model, props.glassesBranches)
        mirrorHelper.set_faceFollower(threeObject3DParent, threeObject3D, props.faceIndex)
        window.plapp = threeObject3D;

        console.debug(`Hook of setting glasses model`)

        // return () =>  {
        //     mirrorHelper.clean();
        // }

    }, [props.GLTFModel, props.sizing, props.showGlasses, props.showFrame, props.customFrame])

    if (props.customFrame) {


        console.log(`Frame found in props`)
        console.log(props.customFrame)
        console.log(props.customFrame.data_url)

        const frameUrl = props.customFrame.data_url ? props.customFrame.data_url : props.customFrame

        const geometry = new THREE.PlaneGeometry(2, 2);
        mesh = new THREE.Mesh(geometry, createMaterial2d(useLoader(THREE.TextureLoader, frameUrl), true))
        mesh.renderOrder = 999; // render last
        mesh.frustumCulled = false;
    }

    useEffect(() => {

    }, [props.GLTFModel])

    // import main model:
    const [igltf, setiglft] = useState(useLoader(GLTFLoader, props.GLTFModel))
    const gltf = useLoader(GLTFLoader, props.GLTFModel)
    console.log(`Gltf model`)   
    console.log(gltf)
    const model = gltf.scene.clone()

    // import and create occluder:
    const isDebugOccluder = false // true to debug the occluder
    const gltfOccluder = useLoader(GLTFLoader, props.GLTFOccluderModel)
    const occluderModel = gltfOccluder.scene.clone()
    const occluderMesh = mirrorHelper.create_occluderMesh(occluderModel, isDebugOccluder)
    console.log(`Scene did a render`)
    // console.log(customMesh)
    // console.log(three)
    console.log(`Props`)
    console.log(props)

    return (
            <object3D ref={objRef}>
                <object3D>
                    {model && props.showGlasses ? <primitive object={model} /> : <DebugCube />}
                    {occluderMesh ? <primitive object={occluderMesh} /> : null}


                    {mesh && props.showFrame ? <primitive object={mesh} /> : null}
                </object3D>
            </object3D>
    )
}

export default SceneImage

function modelLoader(model: any): Promise<any> {
    return new Promise((resolve, reject) => {
        loader.load(model, (data: any) => resolve(data), null, reject);
    });
}