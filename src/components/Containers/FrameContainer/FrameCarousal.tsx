// @ts-nocheck
import React from 'react';
import Bee from '../../../assets/Frames/Bees.png'
import Spongebob from '../../../assets/Frames/Spongebob.png'
import { v4 as uuid } from 'uuid';
import { FrameSelector } from './FrameSelector';
import { NoneFrameSelector } from './NoneFrameSelector';
import Slider from 'react-slick';

const frames = [
  { frame: Bee, name: 'Bess frame Revert' },
  { frame: Spongebob, name: 'Spongebob frame Revert' },
]

export const FrameCarousal = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bgSlider">
      <div className="glasses-slider">
        <Slider {...settings}>
          <NoneFrameSelector />
          {frames.map((frame) =>
            <div key={uuid()}>
              <FrameSelector
                frame={frame.frame}
                name={frame.name}
              />
            </div>,
          )}
        </Slider>
      </div>
    </div>

  );
};