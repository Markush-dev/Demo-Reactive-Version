
// @ts-nocheck
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setFrame, setShowFrame } from '../../../stores/actions/videocam.actions'

interface Props {
    frame: string,
    name: string
}

export const FrameSelector = (props: Props) => {

    const dispatch = useDispatch()
    const showFrame = useSelector(state => state.videocam.showFrame)
    function changeFrame() {
        if (!showFrame) {
            dispatch(setShowFrame(true))
        }

        dispatch(setFrame(props.frame))
    }


    return (
        <div>
            <button className='VTOButton' onClick={changeFrame} >
                <div>
                    <img src={props.frame} alt="" style={{width: "50px", height: "50px"}}/>
                </div>
            </button>
            { <img src={props.image}></img> }
        </div>
    )

}