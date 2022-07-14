//@ts-nocheck
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { changeBackground } from '../../../stores/actions/background.actions'

interface Props {
    alt: string,
    url: string,
    key: any
} 

export const BackgroundSelector = (props: Props) => {
    const dispatch = useDispatch()

    function setBackground() {
        console.log("background change")
         
        dispatch(changeBackground(props.url))
    }


    return (
        <div>
              <img style={{}}  className="VTOButton" alt={props.alt} src={props.url}
                            onMouseDown={() => { setBackground() }}
                            />  
        </div>
    )

}