//@ts-nocheck
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { 
    addStickerToBackground 
} from '../../../stores/actions/stickers.actions'

interface Props {
    model: any,
    image: string,
    name: string
}
export const NoneStickerSelector = (props:props) => {

    const dispatch = useDispatch()

    function setSticker() {
        console.log("background change")
        dispatch(addStickerToBackground(false))
    }
    
    return (
        
        <div className='VTOButton' onClick={setSticker}>
             <span style={{opacity: '0.5'}}>NONE</span>  
        </div>
    )


}