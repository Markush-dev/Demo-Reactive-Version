// @ts-nocheck
import React from 'react'
import Bee from '../../../assets/Frames/Bees.png'
import Spongebob from '../../../assets/Frames/Spongebob.png'
import BeeRevert from '../../../assets/Frames/BeesRevert.png'
import SpongebobRevert from '../../../assets/Frames/SpongebobRevert.png'

import { v4 as uuid } from 'uuid'
import { FrameSelector } from './FrameSelector'
 import { NoneFrameSelector } from './NoneFrameSelector'

const frames = [
    // { frame: Bee, name: 'Bess frame' },
    // { frame: Spongebob, name: 'Spongebob frame' },
  // { frame: BeeRevert, name: 'Bess frame Revert' },
  // { frame: SpongebobRevert, name: 'Spongebob frame Revert' },
]

/*
    Container for FrameSelector
    Uploads frames and draws selector for each
*/

export const FrameContainer = () => {

   return (
     <div className='bgSlider'>
       <div className='glasses-slider'>
           <NoneFrameSelector />
           {frames.map((frame) =>
             <div key={uuid()}>
               <FrameSelector
                 frame={frame.frame}
                 name={frame.name}
               />
             </div>
           )}
       </div>
     </div>

  )
}