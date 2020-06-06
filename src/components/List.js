import React, { useEffect, useState } from "react";
import {Button} from 'semantic-ui-react';
const fetch = require('node-fetch');

const List = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    console.log('in useEffect')
    const fetchList = async () => {
      const response = await fetch("http://localhost:3001/api/v1/users");
      const list = await response.json();
      setList(list.data);
    };

    fetchList();
    }, []);
    console.log(list)

  const fetchUsers = async() => {
    const URL = 'http://localhost:3001/api/v1/users';
    const response = await fetch(URL)
    const jsonData = await response.json();
    let users = []
    users = await jsonData.data;
    console.log(users);
    setList(users)
  }

  const deleteUser = async(id) => {
    console.log(id)
    const data = {id: id}
    const conf = { 
      method: 'DELETE', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    await fetch('http://localhost:3001/api/v1/user', conf)
    .then(resp => resp.json())
    .then(function(resp) {
      if (resp.status !== 'success') {
        console.log(resp.error)
        alert(resp.error)
      }
    })
  }

  const click = (event) => {
    fetchUsers();
    console.log("users")
  }

  const del = (id) => {
    deleteUser(id);
    console.log("del")
    fetchUsers();
    console.log("users")
  }
  
  return (
    <div>
      <h3>List of users</h3>
      <ul>
        {list.map((dream) => (
          <li key={dream.id}>{dream.email}<Button id={dream.id} onClick = {()=>del(dream.id)}>Delete</Button></li>
        ))}
      </ul>
      <Button name = "users" onClick = {click}>Get users</Button>
    </div>
  );
};

export default List;