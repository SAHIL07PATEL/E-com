import React, { useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
// import Products from './components/Products';
import './App.css'; // Custom CSS for content adjustment

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Function to toggle the sidebar's state
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Admin Panel</Navbar.Brand>
          </Container>
        </Navbar>

        <div className="d-flex">
          <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={handleSidebarToggle} />
          <main className={`content-area ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              {/* <Route path="/products" element={<Products />} /> */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
