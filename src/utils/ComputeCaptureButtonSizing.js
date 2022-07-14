export const ComputeCaptureButtonSizing = () => {
  // compute  size of the canvas:
  const left = window.innerWidth*0.3;
  const totalMarginLeftRight = left*2;
  const width = 100;

  
  const height = 100; 

  // compute position of the canvas:
  const top = window.innerHeight-200;
  //const left = 50;//(wWidth - width) / 2;
  return { width, height, top };
};
