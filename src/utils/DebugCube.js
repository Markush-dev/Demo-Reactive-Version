import React from 'react'

export const DebugCube = (props) => {
    const s = props.size || 1
    return (
        <mesh name="debugCube">
            <boxBufferGeometry args={[s, s, s]} />
            <meshNormalMaterial />
        </mesh>
    )
}