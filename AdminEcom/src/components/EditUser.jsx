import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'

export default function EditUser() {
  const { eid } = useParams();


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate()

  useEffect(() => {

    fetch(`http://localhost:3001/users/${eid}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((data) => setFormData(data))

  }, []);

  console.log(formData);


  const getFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/users/${eid}`, {
      method: "PUT",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (res.ok) {
          alert("Edit User Successfully")
          navigate('/users')
        }
      })
  }

  return (
    <div className="container mt-4">
      <Card className="p-4">
        <Card.Body>
          <Card.Title className="mb-4">
            Edit User by <Badge bg="secondary">Admin</Badge>
          </Card.Title>
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    onChange={getFormData}
                    value={formData.username}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="validationFormik02">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={getFormData}
                    value={formData.email}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="validationFormik03">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={getFormData}
                    value={formData.password}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="text-end">
              <Button variant="primary" type="submit">
                Edit User
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
