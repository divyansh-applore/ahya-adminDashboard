import React from 'react';
import './Loader.css';

const Loader = ()=>{
    return(
        <div style={{width:'100%',height:"100vh",display:'flex',justifyContent:"center",alignItems:'center'}} className="loader-wrapper">
           <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}


export default Loader;