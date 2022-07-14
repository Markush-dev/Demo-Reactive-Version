// @ts-nocheck
import React from 'react'
import Bee from '../../../assets/Background-img/' 
import { v4 as uuid } from 'uuid'
import { backgroundData } from "./background-data";
 import { BackgroundSelector } from './BackgroundSelector'
import { NonBackgroundSelector } from './NonBackgroundSelector';
// import { NoneFrameSelector } from './NoneFrameSelector'
 
import Slider from "react-slick";
/*
    Container for FrameSelector
    Uploads frames and draws selector for each
*/

export const SlickSliderBackground = (props) => {  

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };


    return (
        <div
        className='bgSlider'
        style={{  
            position:"relative",
            zIndex:5,
            top:props.top}}
            
         >
        <div  
        className='glasses-slider'>
            <div> 
            <Slider {...settings}>
                        <NonBackgroundSelector />
                            
                            {backgroundData.map((backgroudPath, i) => {
                                return(
                                <div key={uuid()}>
                                    <BackgroundSelector
                                        alt={backgroudPath.alt}
                                        url={backgroudPath.url}
                                        key={i} />
                                
                                </div>
                                )
                    })}
            </Slider>
        </div>
      </div>
      </div>
    )
}