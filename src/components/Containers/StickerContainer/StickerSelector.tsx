//@ts-nocheck
import React from 'react'

import {
    useDispatch
 } from 'react-redux'

import { 
    addStickerToBackground
 } from '../../../stores/actions/stickers.actions'
import { FrameContainer } from '../FrameContainer/FrameContainer';

export const StickerSelector = (props) => {

    console.log(props);

    const dispatch = useDispatch()

    function setSticker() {
        console.log("background change")
        dispatch(addStickerToBackground(props.props.url))
    }


    return (
        <div>
            <img
            style={{background:"white"}}
            className="VTOButton"
            alt={props.props.alt}
            src={props.props.url}
            onMouseDown={()=>{ setSticker() }}
                            />
        </div>
    )

}