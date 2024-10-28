import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaUsers, FaBox, FaShoppingCart } from 'react-icons/fa';
import './Dashboard.css'; // Custom CSS for additional styles

const Dashboard = () => {

  const [users, setUsers] = useState();
  const [products, setProducts] = useState();
  const [cart, setCart] = useState();

  useEffect(() => {

    // USER
    fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))



    // Products
    fetch("http://localhost:3001/products", {
      method: "GET",
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))


    // AddtoCart Products
    fetch("http://localhost:3001/addtocart", {
      method: "GET",
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => setCart(data[0].quantity))
  }, [cart  ]);

  console.log();
  

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={4} className="mb-4">
          <Card className="dashboard-card user-card">
            <Card.Body className="d-flex align-items-center">
              <div className="icon-container">
                <FaUsers className="dashboard-icon" />
              </div>
              <div className="ml-3">
                <Card.Title>Total Users</Card.Title>
                <Card.Text className="count-text">{users ? (users.length) : ("0")}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="dashboard-card product-card">
            <Card.Body className="d-flex align-items-center">
              <div className="icon-container">
                <FaBox className="dashboard-icon" />
              </div>
              <div className="ml-3">
                <Card.Title>Total Products</Card.Title>
                <Card.Text className="count-text">{products ? (products.length) : ("0")}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="dashboard-card order-card">
            <Card.Body className="d-flex align-items-center">
              <div className="icon-container">
                <FaShoppingCart className="dashboard-icon" />
              </div>
              <div className="ml-3">
                <Card.Title>Total Orders</Card.Title>
                <Card.Text className="count-text">{cart ? (cart) : ("0")}</Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
