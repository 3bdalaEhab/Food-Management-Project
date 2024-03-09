import React from 'react'
import logo from "../../../assets/4 4.svg";
import Vector from "../../../assets/Vector.png";
import error from "../../../assets/Group 48101676.png";
import { Link } from 'react-router-dom';

export default function Notfound() {
  return <>
      <div className="container-fluid  vh-100 p-0">
    <div className=" notFound-container py-5 h-100 d-flex flex-column justify-content-around align-items-center">
<img className='logo ' src={logo} alt="error" />        
<img className='w-25 ' src={error} alt="error" />        
      
      <Link className='btn btn-success my-5' to={"/dashboard"} ><i className="fa-solid fa-left-long me-2"></i>Back To Home</Link>
      </div>
    </div>

  </>
}
