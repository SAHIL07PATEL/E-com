import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/users",{
      method:"GET",
      headers:{
        'content-type' : 'application/json'
      }
    })
    .then((res)=>res.json())
    .then((data)=>setUsers(data))
  }, []);

  console.log(users);
  
  return (
    <div>
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
          <tr>
            <td>1</td>
            <td>sahil dholriya</td>
            <td>sahildholriya7@gmail.com</td>
            <td>@12345678</td>
            <td>
            <Button variant="danger">Delete User</Button>{' '}
            </td>
            <td>
            <Button variant="primary">Edit User</Button>{' '}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
