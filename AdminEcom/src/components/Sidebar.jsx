import { Nav } from 'react-bootstrap';
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaPlusCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Custom CSS for full height

const Sidebar = () => {


  return (
    <div className={`sidebar`}>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FaTachometerAlt className="sidebar-icon" />
            <span className="link-text">Dashboard</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/users"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FaUsers className="sidebar-icon" />
            <span className="link-text">Users</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/products"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FaBoxOpen className="sidebar-icon" />
            <span className="link-text">Products</span>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/addproducts"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <FaPlusCircle className="sidebar-icon" />
            <span className="link-text">Add Products</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
