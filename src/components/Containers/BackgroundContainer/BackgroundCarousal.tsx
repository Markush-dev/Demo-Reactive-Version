// @ts-nocheck
import React from 'react'
import Bee from '../../../assets/Background-img/'
import { v4 as uuid } from 'uuid'
import { backgroundData } from "./background-data";
 import { BackgroundSelector } from './BackgroundSelector'
import { NonBackgroundSelector } from './NonBackgroundSelector';
// import { NoneFrameSelector } from './NoneFrameSelector'


/*
    Container for FrameSelector
    Uploads frames and draws selector for each
*/

export const BackgroundCarousal = (props) => {
    return (
        <div
        className=""
        style={{
                  position:"relative",
                  top:props.top,
                  left:"40%",
                  borderRadius:"2px",
                  padding:"5px",
                  display:"flex",
                  background:"rgba(0,0,0,0.6)",
                  width:'fit-content',
                  border:"none",
                  overflow:"scroll"}}>

                      <NonBackgroundSelector />

                        {backgroundData.map((backgroudPath, i) => {
                            return(
                            <div key={uuid()}>
                                <BackgroundSelector
                                    alt={backgroudPath.alt}
                                    url={backgroudPath.url}
                                    key={i}
                                     />
                            </div>
                            )
                })}
        </div>
    )
}