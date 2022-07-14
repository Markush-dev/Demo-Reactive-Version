// @ts-nocheck
import React, { Suspense } from 'react'
import SelfieControls from '../components/SelfieControls/SelfieControls'
import ImageAR from '../components/ImageAR/ImageAR'
import { DebugCube } from '../utils/DebugCube'

const ImagePage = () => {

    return (
        <Suspense fallback={<DebugCube />}>
            <ImageAR />
            <SelfieControls />
        </Suspense>
    )
}

export default ImagePage