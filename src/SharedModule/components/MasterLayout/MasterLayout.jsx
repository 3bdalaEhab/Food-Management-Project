import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export default function MasterLayout() {
  return (
    <div className="container-fluid px-0">
      <div className="d-flex">
        <SideBar />
        <div className="w-100 vh-100 overflow-auto px-3">
          <NavBar />
          <div className="py-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
