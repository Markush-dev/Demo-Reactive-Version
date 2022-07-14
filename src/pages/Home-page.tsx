import React from 'react'
import { useHistory } from 'react-router-dom'


// const homeImage = {
//     minHeight: '100vh',
//     borderRadius: "30px",
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     backgroundAttachment: 'fixed',
//     height: '100%',
//     width: '100%',
//     backgroundImage: 'url(man.jpg)',
//     margin: "0px 3px"
// }
const btnRow = {
    width: "100%",
    height: "150px",
    backgroundColor: "black",
    position: "relative"
}

const HomePage = () => {

    const history = useHistory();

    const goToSelfiePage = () => {
        history.push('/selfie')
    }
    console.log(document.body.clientWidth);
    return (
        <>
        {document.body.clientWidth > 500 ? <div className='plugApp'>
            <h1>Please use mobile device to open the app</h1>
        </div> : 
        <div className='img'>
            <div className='btn-row'>
                <div className='btn-wrapper'>
                    <button style={{marginRight: "15px"}} className='black-btn' onClick={() => goToSelfiePage()}>Selfie</button>
                    {/* <button className='green-btn' onClick={() => alert('In development')}>Upload</button> */}
                </div>                
            </div>            
        </div>
        }
            
        </>
    )
}

export default HomePage