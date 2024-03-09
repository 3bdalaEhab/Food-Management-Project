import "./NavBar.css"
import avatar from "../../../assets/images.png"
import icon from "../../../assets/4 4.svg"
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

    <nav className="navbar  shadow shadow-sm pe-2   rounded-bottom-4 navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid ">
        <form className="col-sm-6 col-12 navbar-brand d-none d-md-block">
          <div className="input-group">
            <input className="search form-control rounded-pill  bg-white h-25 border-0" type="search" placeholder="🔍 Search Here" aria-label="Search" />
          </div>
        </form>
        <Link className="navbar-brand d-md-none"><div>
          <img className="w-100 logo-navbar" src={icon} alt="" />
       </div></Link>
        <button className="navbar-toggler mx-sm-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mt-lg-0 mt-3" id="navbarSupportedContent">
          <ul className="d-none  gap-4 navbar-nav d-md-flex col-lg-6 col-xl-3 gap-3   align-items-center justify-content-around ms-auto  mb-2 mb-lg-0">
            <li className="nav-item mt-1 me-3 ">

                <div className="avatar d-flex mt-1 mx-auto  align-items-center justify-content-center gap-1">
                  <img className="rounded-circle   w-100" src={avatar} alt="avatar" />
                  <h6 className="mt-1">{jwtDecode?.userName}</h6>
                </div>

            </li>





           <div className="d-flex flex-column flex-lg-row align-items-center gap-3">
             <li className="order-lg-0 order-1 nav-item dropdown">
               <a className="nav-link dropdown-toggle mx-auto text-center" role="button" data-bs-toggle="dropdown" aria-expanded="false">

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
  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-auto text-center d-md-none ">
          <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={"/dashboard/RecipesList"} className="nav-link active" aria-current="page">Recipes</Link>
            </li>
          {jwtDecode?.userGroup === "SuperAdmin" ? <>
          
            <li className="nav-item">
              <Link to={"/dashboard/UserList"} className="nav-link active" aria-current="page">Users</Link>
            </li>
            <li className="nav-item">
              <Link to={"/dashboard/CategoriesList"} className="nav-link active" aria-current="page">Categories</Link>
            </li>
          
          </>:<>
          <li className="nav-item">
              <Link to={"/dashboard/FavoriteList"} className="nav-link active" aria-current="page">Favorites</Link>
            </li>
          
          </>
}

           
          
           

            <li className="nav-item dropdown">
              <Link to={"/dashboard/"} className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">

              </Link>


              <ul className="dropdown-menu text-center p-1 text-center mx-auto">
                <li className="my-2" ><Link  className="dropdown text-success" >Change Password</Link> </li>
                <li><Link onClick={()=>logout()} className="dropdown-item text-danger fw-bold" >Logout <i className="ms-1 fa-solid fa-right-long"></i></Link></li>
              </ul>
            </li>

          </ul>

        </div>
      </div>
    </nav>

//     <nav className="navbar  rounded-bottom-5 shadow shadow-sm navbar-expand-lg bg-body-tertiary d-md-none">
//       <div className="container-fluid">
//         <Link className="navbar-brand"><div>
//           <img className="w-100 logo-navbar" src={icon} alt="" />
//         </div></Link>
//         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-auto text-center">
//           <li className="nav-item">
//               <Link to={"/dashboard"} className="nav-link active" aria-current="page">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/dashboard/RecipesList"} className="nav-link active" aria-current="page">Recipes</Link>
//             </li>
//           {jwtDecode?.userGroup === "SuperAdmin" ? <>
          
//             <li className="nav-item">
//               <Link to={"/dashboard/UserList"} className="nav-link active" aria-current="page">Users</Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/dashboard/CategoriesList"} className="nav-link active" aria-current="page">Categories</Link>
//             </li>
          
//           </>:<>
//           <li className="nav-item">
//               <Link to={"/dashboard/FavoriteList"} className="nav-link active" aria-current="page">Favorites</Link>
//             </li>
          
//           </>
// }

           
          
           

//             <li className="nav-item dropdown">
//               <Link to={"/dashboard/"} className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">

//               </Link>


//               <ul className="dropdown-menu text-center p-1 text-center mx-auto">
//                 <li className="my-2" ><Link  className="dropdown text-success" >Change Password</Link> </li>
//                 <li><Link onClick={()=>logout()} className="dropdown-item text-danger fw-bold" >Logout <i className="ms-1 fa-solid fa-right-long"></i></Link></li>
//               </ul>
//             </li>

//           </ul>

//         </div>
//       </div>
//     </nav>



  );
}
