// @ts-nocheck
import React from 'react';
import { v4 as uuid } from 'uuid';
import Helmet from '../../../assets/Glasses/motorcycleHelmet.glb';
import DealWithItGlasses from '../../../assets/Glasses/Deal_With_It.glb';
import DealWithItGlasses2 from '../../../assets/Glasses/glasses2.glb';
import SunGlasses from '../../../assets/Glasses/sunglasses.glb';
import SunGlassesPng from '../../../assets/Glasses/sunglasses.png';
import DealWithItPng from '../../../assets/Glasses/Deal_With_It.png';
import DealWithItGlassesPng from '../../../assets/Glasses/CyberGlasses.png';
import HelmetPng from '../../../assets/Glasses/helmet.png';

// import { NoneFrameSelector } from './NoneFrameSelector'
import Slider from 'react-slick';
import { GlassesSelector } from './GlassesSelector';
import { NoneGlassesSelector } from './NoneGlassesSelector';
/*
    Container for FrameSelector
    Uploads frames and draws selector for each
*/
const glasses = [
  { model: DealWithItGlasses, image: DealWithItPng, name: 'Deal with it' },
  { model: DealWithItGlasses2, image: DealWithItGlassesPng, name: 'Deal with it' },
  { model: SunGlasses, image: SunGlassesPng, name: 'Sun glasses' },
  { model: Helmet, image: HelmetPng, name: 'Helmet' },
];

export const GlassesCarousal = () => {
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className="bgSlider"
    >
      <div className="glasses-slider"
           style={{}}>
        <div>
          <Slider {...settings}>
            <NoneGlassesSelector />

            {glasses.map((backgroudPath, i) => {
              return (
                <div key={uuid()}>
                  <GlassesSelector
                    model={backgroudPath.model}
                    image={backgroudPath.image}
                    name={backgroudPath.name}
                  />

                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};