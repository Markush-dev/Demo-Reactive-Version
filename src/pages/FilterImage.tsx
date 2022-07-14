// @ts-nocheck
import  "../../src/styles/instagram.min.css";
import "../../src/styles/instagram.css";

import React, { useRef } from "react";
import styles from "../../src/styles/index.scss";
import { createRef, useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Button,
  Stack
} from "@mui/material";

import Slider from "react-slick";
import {
  Link
} from "react-router-dom";

const FilterImage = () => {

  const [filterChange,setFilterChange] = useState("normal");

  const response = useSelector((response)=>response.selfie.photo.currentSrc);

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
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  };

 const nextPageBtn = ()=>{
   //console.log(filterChange);
   //window.location.href = "/photo";
 }

 const ReRenderCmpFilter = ()=>{
  //it re-renders the component through Window Prototyping
 history.go(-1);
 location.reload();
 window.location.href = "/SelfiPage";
}

 return (
    <>
    
     <center>

    <div style={{objectFit:"cover"}}>
       <img className={filterChange}   src={response} /> 
     </div>

      
     <div className="main-con-slider" >

      <Slider  {...settings}>
          <div>
             <button onClick={()=>{
               setFilterChange("normal")
              }}>
               <img width="100%"  src={response} ></img>
             </button>
          </div>

          <div>
             <button onClick={()=>{
               setFilterChange("filter-clarendon")
               }}>
               <img width="100%"  className="filter-clarendon" src={response} ></img>
             </button>
          </div>

          <div>
             <button onClick={()=>{
               setFilterChange("filter-1977")
             }}>
             <img width="100%"  className="filter-1977"  src={response} ></img>
             </button>
          </div>

          <div>
             <button onClick={()=>{
               setFilterChange("filter-amaro")
             }}>
               <img width="100%"  className="filter-amaro" src={response} ></img>
             </button>
          </div>

          <div>
             <button onClick={()=>{
               setFilterChange("filter-clarendon")
             }}>
               <img width="100%"  className="filter-clarendon" src={response} ></img>
             </button>
          </div>

            <div>
               <button onClick={()=>setFilterChange("filter-inkwell")}>
                 <img className="filter-inkwell" width="100%"  src={response} ></img>
               </button>
            </div>
       </Slider>

       <Button onClick={ReRenderCmpFilter} variant="contained" sx={{mt:2,mr:2}} color="secondary" >Prev</Button>
       <Button  component={Link} to="/photo" variant="contained" sx={{mt:2}} onClick={nextPageBtn}>Next</Button>

      </div>
     </center>


    
    </>
  );
};

export default FilterImage;
