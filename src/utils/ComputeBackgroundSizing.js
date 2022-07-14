
const computeBackgroundSizing = (frameWidth,frameHeight,bgImgWidth,bgImgHeight) => {
  
  /**
   *  Ref: https://konvajs.org/docs/sandbox/Scale_Image_To_Fit.html
   */

  console.log(frameWidth);
  // computing center-top
  const aspectRatio = frameWidth / frameHeight;

  let newWidth;
  let newHeight;

  let x = 0;
  let y = 0;

  const imageRatio = bgImgWidth / bgImgHeight;

  if (aspectRatio >= imageRatio) {
    newWidth = bgImgWidth.width;
    newHeight = bgImgWidth.width / aspectRatio;
  } else {
    newWidth = bgImgWidth.height * aspectRatio;
    newHeight = bgImgWidth.height;
  }

  //center-top

  x = (bgImgWidth.width - newWidth) / 2;
  y = 0;

  
  return { newWidth, newHeight, x, y};
 
};

export {
  computeBackgroundSizing
};