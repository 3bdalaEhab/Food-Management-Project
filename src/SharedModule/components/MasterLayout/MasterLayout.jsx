import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import './MasterLayout.css';

export default function MasterLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container fluid className="p-0 master-layout">
      <Row className="g-0 h-100">
        <Col md={sidebarOpen ? 3 : 'auto'} className={`sidebar-wrapper transition ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
          <SideBar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        </Col>
        <Col md={sidebarOpen ? 9 : 12} className="main-content">
          <div className="navbar-wrapper sticky-top">
            <NavBar onMenuToggle={toggleSidebar} />
          </div>
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
