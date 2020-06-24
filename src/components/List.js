import React, { useEffect, useState } from "react";
import {Button} from 'semantic-ui-react';
import {copyDataToUser, copyUserToData, userPath, usersPath } from '../helpers'
const fetch = require('node-fetch');


const List = (props) => {
  const [list, setList] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    console.log('in useEffect')
    
    const fetchList = async () => {
      let request = {
        method:"GET",
        mode:"cors",
        headers:{ "Content-Type":"application/json",
                  "token":props.loginData.token}
      }
      const response = await fetch(usersPath, request);
      const list = await response.json();
      setList(list.data);
    };

    if (props.loginData.isLogged) {
      fetchList();
    }
    }, [props]);

    console.log(list)

  const fetchUsers = async() => {
    let request = {
      method:"GET",
      mode:"cors",
      headers:{ "Content-Type":"application/json",
                "token":props.loginData.token}
    }
    const response = await fetch(usersPath,request)
    const jsonData = await response.json();
    let users = []
    users = await jsonData.data;
    console.log(users);
    setList(users)
  }

  const getUser = async(id) => {
    const URL = userPath+id;
    let request = {
      method:"GET",
      mode:"cors",
      headers:{ "Content-Type":"application/json",
                "token":props.loginData.token}
    }
    const response = await fetch(URL, request)
    const jsonData = await response.json();
    console.log(jsonData)
  
    let data = await jsonData;
    let user = await copyDataToUser(data)
    console.log(user);
    setUser(user)
    return jsonData;
  }

  const deleteUser = async(id) => {
    console.log(id)
      const conf = { 
      method: 'DELETE', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json',
                  "token":props.loginData.token},
    }
    const URL = userPath+id;
    
    await fetch(URL, conf)
    .then(resp => resp.json())
    .then(function(resp) {
      if (resp.status !== 'success') {
        console.log(resp.error)
        alert(resp.error)
      }
    })
  }

  const updateUser = async(id, user) => {
    console.log(id)
    console.log(user)
    const data = copyUserToData(user)
    console.log(data)
    const conf = { 
      method: 'PUT', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json',
                  "token":props.loginData.token },
      body: JSON.stringify(data)
    }
    console.log(data)
    const URL = userPath+id;
    console.log(URL)
    await fetch(URL, conf)
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
  
  const update = async (id) => {
    console.log(id)
    let data = await getUser(id)
    let user = await copyDataToUser(data)
    console.log(user)
    user = {...user, 'firstName':'TTTTT'}
    console.log(user)
    updateUser(id, user);
    console.log("update")
    fetchUsers();
  }
  return (
    <div>
      <h3>List of users</h3>
      {props.loginData.isLogged && <ul>
      {list.map((item) => (
          <li key={item.id}>{item.email} first name = {item.first_name} last name = {item.last_name}
            <Button id={item.id} onClick = {()=>del(item.id)}>Delete</Button>
            <Button id={item.id} onClick = {()=>update(item.id)}>Update</Button></li>
        ))}
      </ul>}
      {props.loginData.isLogged && <Button name = "users" onClick = {click}>Get users</Button>}
    </div>
  );
};

export default List;