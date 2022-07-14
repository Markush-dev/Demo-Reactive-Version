// @ts-nocheck
import React from 'react'
import Bee from '../../../assets/Background-img/' 
import { v4 as uuid } from 'uuid'
import { backgroundData } from "./background-data";
 import { BackgroundSelector } from './BackgroundSelector'
import { NonBackgroundSelector } from './NonBackgroundSelector';

import { StickerData } from './Sticker-data';

import Slider from "react-slick";
import { FrameContainer } from '../FrameContainer/FrameContainer';
import {NoneFrameSelector} from "../FrameContainer/NoneFrameSelector";

import { FrameSelector } from '../FrameContainer/FrameSelector';
import { useDispatch } from 'react-redux'
import { addStickerToBackground } from '../../../stores/actions/stickers.actions'

import { NoneStickerSelector } from './NoneStickerSelector';
import { StickerSelector }  from './StickerSelector';

/*

    Container for FrameSelector
    Uploads frames and draws selector for each
*/

export const SlickSTicker = (props) => {  
 

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              initialSlide: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          }
        ]
      };


    const dispatch = useDispatch()

    function setSticker(url:any) {
        console.log("sticker clicked")
         
        dispatch(addStickerToBackground(url))
    }


    return (
        <div
        className='bgSlider'
        style={{  
            position:"relative",
          zIndex:5,
            top:props.top}}
            
         >
        <div
          style={{

            zIndex:5,
            }}
        className='glasses-slider'>
           <Slider {...settings}>
                        <div>
                             <NoneStickerSelector />
                        </div>
                         {
                         StickerData.map((sticker,i) => {
                            return <StickerSelector key={i} props={sticker}>

                            </StickerSelector>
                              })
                          }
                  </Slider>
        </div>
      </div>
    )
}