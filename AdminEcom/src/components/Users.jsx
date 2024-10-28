/* eslint-disable react/prop-types */
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';



const Users = () => {
  const [users, setUsers] = useState();
  const [newUsermodalShow, setNewUserModalShow] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/users", {
      method: "GET",
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }, []);

  const handleDeleteUser = (user) => {
    fetch(`http://localhost:3001/users/${user.id}`, {
      method: "DELETE",
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          alert("Deleted Successfull")
          setUsers((preUser) => preUser.filter((p) => p.id !== user.id))
        }
      })
  }

  return (
    <div>

      <Button className='mb-4' variant="primary" onClick={() => setNewUserModalShow(true)}>
        Add User
      </Button>
      <Table striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {
            users && users.map((user, index) => (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <Button variant="danger" onClick={() => { handleDeleteUser(user) }}>Delete User</Button>{' '}
                  </td>
                  <td>

                    <Link to={`/edituser/${user.id}`}>
                      <Button variant="primary">
                        Edit User
                      </Button>{' '}
                    </Link>

                  </td>
                </tr>
              </>
            ))
          }
        </tbody>
      </Table>





      {/* New User Create  */}

      <AddNewUser
        show={newUsermodalShow}
        onHide={() => setNewUserModalShow(false)}
      />

    </div>
  );
};

function AddNewUser(props) {


  const [formData, setFormData] = useState();
  const navigate = useNavigate()


  const getFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (res.ok) {
          alert("Add User Successfully")
          navigate('/user')
        }
      })
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New User By Admin
        </Modal.Title>
      </Modal.Header>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3 p-lg-3">
          <Form.Group md="4" controlId="validationFormik01">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={getFormData}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group md="4" controlId="validationFormik02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={getFormData}

            />

            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group md="4" controlId="validationFormik02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={getFormData}

            />

            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Modal.Footer>
          <Button type='submit'>Add User</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Form>


    </Modal>
  );
}


export default Users;
