import "./NavBar.css"
import avatar from "../../../assets/images.png"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { handleJwtToken } from "../JwtToken/JwtToken";

export default function NavBar() {
  const navigate = useNavigate();
  const [jwtDecode, setJwtDecode] = useState({})

  useEffect(() => {
    const jwtToken = handleJwtToken()
    setJwtDecode(jwtToken)
  }, [])


  let logout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };
  return (
 
    <nav className="navbar pe-2  mt-3 rounded-4 navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid ">
        <form className="col-sm-6 col-12 navbar-brand">
          <div className="input-group">
            <input className="search form-control rounded-pill  bg-white h-25 border-0" type="search" placeholder="🔍 Search Here" aria-label="Search" />
          </div>
        </form>
        <button className="navbar-toggler mx-sm-0 mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mt-lg-0 mt-3" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex col-lg-6 col-xl-3 gap-3   align-items-center justify-content-around ms-auto  mb-2 mb-lg-0">
            <li className="nav-item mt-1 me-3 ">
              
                <div className="avatar d-flex mt-1 align-items-center justify-content-center gap-1">
                  <img className="rounded-circle  w-100" src={avatar} alt="avatar" />
                  <h6 className="mt-1">{jwtDecode?.userName}</h6>
                </div>

            </li>





           <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
             <li className="order-lg-0 order-1 nav-item dropdown">
               <a className="nav-link dropdown-toggle mx-auto text-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            
               </a>
               <ul className="dropdown-menu ">
                 <li className="text-center">
            <Link className=" fw-medium  logoutButton" onClick={logout} > LogOut <i className="fa-solid fa-right-from-bracket"></i></Link>

                 </li>
                
               </ul>
             </li>
            
             <li className="nav-item">
               <i className="fa-solid fa-bell"></i>   
                    </li>
           </div>
          </ul>

        </div>
      </div>
    </nav>
  );
}
