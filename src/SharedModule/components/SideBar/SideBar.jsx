import { useState, useEffect, useRef, useContext } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import avatarSidebar from "../../../assets/3.png";
import "./sideBa.css";
import { Modal } from "react-bootstrap";
import ChangePass from "../../../AuthModule/components/ChangePass/ChangePass";
import { handleJwtToken } from "../JwtToken/JwtToken";

export default function SideBar() {
  const navigate = useNavigate();
  // const [userOrAdmin, setUserOrAdmin] = useState(true)
  const [openSidebar, setOpenSidebar] = useState(false);
  const [show, setShow] = useState(false);
  const sidebarRef = useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // ?===============User or Admin ===============>>
  const [jwtDecode, setJwtDecode] = useState({})

  useEffect(() => {
    const jwtToken = handleJwtToken()
    setJwtDecode(jwtToken)
  }, [])





  const handleToggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };



  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSidebar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  let logout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ChangePass handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <div className="sidebar-container" ref={sidebarRef}>
        <Sidebar className="position-fixed z-3 h-100" collapsed={!openSidebar}>
          <div className={`${!openSidebar ? "text-end ms-2 w-100 relative-image mt-3" : ""} `}>
            <img onClick={handleToggleSidebar} className="w-75 cursor-pointer-imageAtSideBar" src={avatarSidebar} alt="Avatar" />
          </div>
          <Menu>

            <MenuItem component={<Link to={"/dashboard"}></Link>} icon={<i className="fa-solid fa-house"></i>}> Home </MenuItem>

            <MenuItem component={<Link to={"/dashboard/RecipesList"}></Link>} icon={<i className="fa-solid fa-utensils"></i>}> Recipes </MenuItem>
            {jwtDecode?.userGroup === "SuperAdmin" ? <>
              <MenuItem component={<Link to={"/dashboard/UserList"}></Link>} icon={<i className="fa-solid fa-user-group"></i>}> Users </MenuItem>
              <MenuItem component={<Link to={"/dashboard/CategoriesList"}></Link>} icon={<i className="fa-solid fa-layer-group"></i>}> Categories </MenuItem>
            </> : <MenuItem component={<Link to={"/dashboard/FavoriteList"}></Link>} icon={<i className="fa-regular fa-heart"></i>}> Favorite </MenuItem>
            }


            <MenuItem onClick={handleShow} icon={<i className="fa-solid fa-unlock"></i>}> Change Password </MenuItem>
            <MenuItem onClick={logout} icon={<i className="fa-solid fa-right-from-bracket"></i>}> LogOut</MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
