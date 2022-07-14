
// @ts-nocheck
import React from 'react'

import { useDispatch } from 'react-redux'
import { setShowGlasses } from '../../../stores/actions/videocam.actions'


/*
    Selector for hide glasses
*/

export const NoneGlassesSelector = () => {

    const dispatch = useDispatch()

    function hideGlasses() {
        dispatch(setShowGlasses(false))
    }

    return (
        <div className='VTOButton' onClick={hideGlasses}>
            <span style={{opacity: '0.5'}}>NONE</span>
        </div>
    )

}