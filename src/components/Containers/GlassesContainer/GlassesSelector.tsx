//@ts-nocheck
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setGlassesModel, setShowGlasses } from '../../../stores/actions/videocam.actions'

interface Props {
    model: any,
    image: string,
    name: string
}

export const GlassesSelector = (props: Props) => {

    const dispatch = useDispatch()
    const showGlasses = useSelector(state => state.videocam.showGlasses)

    function changeGlassesModel() {
        console.log("glass change")
        if (!showGlasses) {
            dispatch(setShowGlasses(true))
        }
        dispatch(setGlassesModel(props.model))
    }


    return (
        
        <div>
            <button className='VTOButton' onClick={changeGlassesModel}>
                <div className='white-wrapp'>
                    <img src={props.image} alt="" style={{width: "50px", height: "30px"}}/>
                </div>
            </button>
            {/* <img src={props.image}></img> */}
        </div>
    )

}