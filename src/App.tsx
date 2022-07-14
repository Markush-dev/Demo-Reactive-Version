
import * as React from "react";
import {
    useState
} from "react";

import { Switch, Route, BrowserRouter as Router ,Link } from 'react-router-dom'
import './styles/index.scss'

import 'material-icons/iconfont/material-icons.css';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import LogRocket from 'logrocket';

import { useHistory } from "react-router-dom";
import HDCamPage from "./pages/HDCam-page";
//React Lazy Const
const SelfiePage = React.lazy(()=>import("./pages/Selfie-page"));
const HomePage = React.lazy(()=>import("./pages/Home-page"));
const CapturedPhoto = React.lazy(()=>import("./pages/SelfieCaptured-page"));
const FinalImagePage = React.lazy(()=>import("./pages/FinalImagePage"));
const SliderTest = React.lazy(()=>import("./pages/SliderTest-page"));
const FilterImage = React.lazy(()=>import("./pages/FilterImage"));


//Loading Component 
const Loading = ()=>{
    const LoadingDesign = (
        <>
           <div className="lds-roller">
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
            </div>
        </>
    );
    return LoadingDesign;
}

const App = () => {

const [prePage,setPrepage] = useState(false);
const welcomePageFn = ()=>{
    return (
        setPrepage(true)
    );
}

const PreLoadindCmp = ()=>{
    //Control Scrolling Event
      let x=window.scrollX;
      let y=window.scrollY;
      window.onscroll = ()=>{ 
        window.scrollTo(x, y); 
    };

    const design = (
        <>
             <div className="preLoading-main-div">
                   <div>
                        <h1>Welcome to  the Photo Booth</h1>
                        <div className="flex-control-mobile">
                           <Link to="/SelfiPage" className="btn-preloading-first">
                              Getting Started
                            </Link>
                             <Link to="/HDCamPage" className="btn-preloading-second">
                                Getting Started (HD)
                             </Link>
                         </div>
                     </div>
                     <div>
                       <img  className="preLoading-Image"  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/6279c650-938a-490a-9d2c-2fe9a3543d95/d2omkws-2ffc145b-3730-43ec-8ffe-d7afb927b759.png" />
                     </div>
            </div>
        </>
    );
    return design;
}
 
    const design = (
        <>
           <Router>
        <Switch>
            {/* <Route path="/selfie">
                <SelfiePage />
            </Route> */}

             <Route path="/filter-image">
                <React.Suspense fallback={<><Loading /></>}>
                    <FilterImage />
                </React.Suspense>
            </Route>

            <Route path="/photo">
                <React.Suspense fallback={<><Loading /></>}>
                    <CapturedPhoto />
                </React.Suspense>
            </Route>
            <Route path="/FinalImagePage" >
                 <React.Suspense fallback={<><Loading /></>}>
                    <FinalImagePage />
                 </React.Suspense>
            </Route>

            <Route path="/HDCameraPage" >
                 <React.Suspense fallback={<><Loading /></>}>
                    <SliderTest />
                 </React.Suspense>
            </Route>
            
            <Route path="/SelfiPage" >
                 <React.Suspense fallback={<><Loading /></>}>
                    <SelfiePage />
                 </React.Suspense>
            </Route>
            <Route path="/HDCamPage">
                <HDCamPage/>
            </Route>
            <Route path="/">
                <React.Suspense fallback={<><Loading /></>}>
                    
                       <PreLoadindCmp />
                    
                </React.Suspense>
            </Route>
        </Switch>
    </Router>
        </>
    );
    return design;

}

export default App