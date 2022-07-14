
const computeSizing = () => {
  // compute  size of the canvas:
  // Value Declare Defaults
  let left = 200;
  let top = 0;
   //breakpoints using Window Javascript Object Protyping 
   // Window X Large Screen 1100 to 1300 Width
  if(window.innerWidth > 1100){
    left = 220;
  }
  //window large Screen 900 to 1099 
  if(window.innerWidth < 900){
    left = 0;
    top = 30;
  }
  // Window Medium Screen 800 to 899 => Table
  if(window.innerWidth < 800){
    left = 100;
    top = 0;
  }
    // Window Medium Screen 600 to 799 => Mobile
  if(window.innerWidth < 600){
    left = 0;
    top = 25;
  }

  const totalMarginLeftRight = left*2;
  const width = window.innerWidth-totalMarginLeftRight;
  const height = window.innerHeight; 

  console.log('width:'+width);
  console.log('height:'+height);
  console.log('top:'+top);
  console.log('left:'+left);
  return { width, height, top, left};

  // compute position of the canvas:
  //const left = 50;//(wWidth - width) / 2;
  //console.log("cwidth:"+width + "cheight:" +height); 
};

export {
  computeSizing
};