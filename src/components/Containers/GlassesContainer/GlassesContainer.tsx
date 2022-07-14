// @ts-nocheck
import React from 'react'
import DealWithItGlasses from '../../../assets/Glasses/Deal_With_It.glb';
import DealWithItGlasses2 from '../../../assets/Glasses/glasses2.glb';
import SunGlasses from '../../../assets/Glasses/sunglasses.glb';
import Helmet from '../../../assets/Glasses/motorcycleHelmet.glb';
import SunGlassesPng from '../../../assets/Glasses/sunglasses.png';
import DealWithItPng from '../../../assets/Glasses/Deal_With_It.png';
import DealWithItGlassesPng from '../../../assets/Glasses/CyberGlasses.png';
import { GlassesSelector } from './GlassesSelector';
import { v4 as uuid } from 'uuid';
import { NoneGlassesSelector } from './NoneGlassesSelector';

import Slider from "react-slick";


const glasses = [
    { model: DealWithItGlasses, image: DealWithItPng, name: 'Deal with it' },
    { model: DealWithItGlasses2, image: DealWithItGlassesPng, name: 'Deal with it' },
    { model: SunGlasses, image: SunGlassesPng, name: 'Sun glasses' },
    { model: Helmet, image: SunGlassesPng, name: 'Helmet' },
    
]

/*
    Container for GlassesSelector
    Uploads glasses models and draws selector for each

    Original webAR.rocks guide how to upload new glasses
    https://github.com/WebAR-rocks/WebAR.rocks.face/tree/master/demos/VTOGlasses
*/

export const GlassesContainer = () => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              initialSlide: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          }
        ]
      };
 

    return (
        <>

          <div style={{width:"100%",display:"flex"}}>
            <Slider {...settings}>
               <NoneGlassesSelector />
               {glasses.map((glassesObj,index) =>
                                <div key={uuid()}>                  
                                
                                    <GlassesSelector
                                        model={glassesObj.model}
                                        image={glassesObj.image}
                                        name={glassesObj.name}
                                    />
                                    
                                </div>
                            )}
            </Slider>
          </div>

              
              
        </>

    )
}