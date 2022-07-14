import React, { Suspense } from 'react'
import SelfieControls from '../components/SelfieControls/SelfieControls'
import Videocam from '../components/Videocam/Videocam'



const SelfiePage = () => {

    return (
        <>
            {
                <Suspense fallback={null}>
                    <div className="flexTest">
                        <div style={{ position: 'relative' }}>
                            <Videocam />
                        </div>
                        <div style={{
                            zIndex:9999,  
                            justifyContent:"center",alignItems:"center"
                        }}>
                            <SelfieControls />
                        </div>
                    </div>
                </Suspense>                
            }
            
        </>
    )
}

export default SelfiePage