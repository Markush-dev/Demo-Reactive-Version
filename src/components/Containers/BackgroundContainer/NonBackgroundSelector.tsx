//@ts-nocheck
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { changeBackground, setShowGlasses } from '../../../stores/actions/background.actions'

interface Props {
    model: any,
    image: string,
    name: string
}

export const NonBackgroundSelector = (props: Props) => {

    const dispatch = useDispatch()

    function setBackground() {
        console.log("background change")

        dispatch(changeBackground(null))
    }


    return (
        <div className='VTOButton' onClick={setBackground}>
            <span style={{opacity: '0.5'}}>NONE</span>  
        </div>
    )

}