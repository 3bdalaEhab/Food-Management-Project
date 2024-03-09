import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return <>
    <div className="container-fluid  px-0">
      <div className="d-flex ">
        <div className="  ">
          <SideBar />
        </div>
        <div className="w-100 vh-100 overflow-auto px-3">
          <NavBar />
          <Outlet />
        </div>
      </div>
    </div></>
}
