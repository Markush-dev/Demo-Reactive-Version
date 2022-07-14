// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import mirrorHelper from '../../contrib/WebARRocksFace/helpers/WebARRocksMirror.js';
import { GlassesCarousal } from '../Containers/GlassesContainer/GlassesCarousal';
import { setProcessEnd, setSelfiePhoto, setTimerTime } from '../../stores/actions/selfie.actions';
import { ComputeCaptureButtonSizing } from '../../utils/ComputeCaptureButtonSizing';
import { Stack } from '@mui/material';
import { setFrame, setShowFrame } from '../../stores/actions/videocam.actions';
import { FrameCarousal } from '../Containers/FrameContainer/FrameCarousal';

const SelfieControls = () => {

  // const threeFiber = useThree()
  const history = useHistory();
  const dispatch = useDispatch();
  const glDomElement = useSelector(state => state.three.glDomElement);
  let currentTick = useSelector(state => state.selfie.timer);
  let processStatus = useSelector(state => state.selfie.processIsEnd);
  const [selfieCheck, setSelfieCheck] = useState(false);

  // state:
  const [sizing, setSizing] = useState(ComputeCaptureButtonSizing());
  const [btnSizing, setBtnSizing] = useState(ComputeCaptureButtonSizing());
  const [isInitialized] = useState(true);
  const [cameraVoice, setCameraVoice] = useState(false);

  // const frame = useSelector(state => state.videocam.frame)
  let selfiTimeSec = 2;
  let selfieTimer: any;

  let _timerResize = null;

  // let selfieTimerTime = 4
  console.log('render');
  // useEffect(()=>{
  //   if(!frame) return
  //     if(frame==='/static/media/Bees.267ad703.png'){
  //       dispatch(setFrame('/static/media/BeesRevert.66888e42.png'))
  //     } else dispatch(setFrame('/static/media/SpongebobRevert.5a7feff2.png'))
  //
  // },[frame])

  useEffect(() => {
    setBtnSizing(prevState => ({
      ...prevState,
      top: prevState.top - 120,
    }));
    window.addEventListener('resize', handle_resize);
    window.addEventListener('orientationchange', handle_resize);

    return () => {
      window.removeEventListener('resize', handle_resize);
      window.removeEventListener('orientationchange', handle_resize);
    };
  }, [isInitialized]);

  const handle_resize = () => {
    // do not resize too often:
    if (_timerResize) {
      clearTimeout(_timerResize);
    }
    _timerResize = setTimeout(do_resize, 200);
  };

  const do_resize = () => {
    _timerResize = null;
    const newSizing = ComputeCaptureButtonSizing();
    setSizing(newSizing);
  };

  const goUp = () => {
    let t, s;
    s = document.body.scrollTop || window.pageYOffset;

    t = setInterval(() => { if (s > 0) window.scroll(0, s -= 5); else clearInterval(t); }, 5);
  };

  const capture_image = () => {
    dispatch(setShowFrame(false));

    const block = document.getElementById('block-none');
    block.style.display = 'none';

    dispatch(setProcessEnd(true));
    setSelfieCheck(true);
    if (!glDomElement) return;

    selfieTimer = setInterval(() => {
      // console.log(selfieTimerTime)
      dispatch(setTimerTime(--currentTick));
      dispatch(setProcessEnd(true));

      // setTimer(selfieTimerTime)
      console.log(currentTick);

      if (currentTick === 0) {

        clearInterval(selfieTimer);
        mirrorHelper.capture_image(glDomElement).then((cv) => {

          // download the image in a new window:
          const dataURL = cv.toDataURL('image/png');
          const img = new Image();
          img.src = dataURL;
          img.onload = () => {
            dispatch(setSelfiePhoto(img));
            dispatch(setProcessEnd(false));
            dispatch(setTimerTime(4));
            setSelfieCheck(false);

            setTimeout(() => {
              history.push('/photo');
            }, 600);

          };

        });
      }
    }, 1000);

    setTimeout(() => {
      setCameraVoice(true);
    }, 3000);

    goUp();
  };

  return (
    <>

      <div className="" id="block-none" style={{
        marginTop: btnSizing.top,
      }}>

        <Stack direction="column">
          <div>
            <FrameCarousal />
            <GlassesCarousal />

          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={capture_image} /*className='next-btn'*/ style={{
              marginTop: '20px',

              borderRadius: '50px',
              padding: '20px',
              display: 'flex',
              border: '2px solid black',
            }}>
                                            <span className="material-icons" style={{
                                              fontSize: '30px',
                                              color: '#5a89c8',
                                            }}>
                                                camera_alt
                                            </span>
            </button>
          </div>

        </Stack>


      </div>


      <div className="btn-relative">

        {processStatus ? <div className="checkerItem">
            <div className="chekerFlex">
            </div>
          </div> :
          <div className="VTOButtons"
               style={{
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}>

            <center>
              <div /*className='next-btn_row'*/>


              </div>
            </center>
          </div>
        }

      </div>


      {
        cameraVoice ? <audio style={{ opacity: 0 }} controls autoPlay>
          <source src="Audio/cameraVoi.mp3" type="audio/mp3"></source>
        </audio> : null
      }
    </>
  );
};

export default SelfieControls;