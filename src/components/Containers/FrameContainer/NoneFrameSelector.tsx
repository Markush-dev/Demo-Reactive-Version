
// @ts-nocheck
import React from 'react'

import { useDispatch } from 'react-redux'
import { setShowFrame } from '../../../stores/actions/videocam.actions'

/*
    Selector for hide frame
*/

export const NoneFrameSelector = () => {

    const dispatch = useDispatch()

    function hideFrame() {
        dispatch(setShowFrame(false))
    }

    return (
        <div className='VTOButton' onClick={hideFrame}>
            <span style={{opacity: '0.5'}}>NONE</span>
            {/* <img src={props.image}></img> */}
        </div>
    )

}