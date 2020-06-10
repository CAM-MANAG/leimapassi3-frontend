import React, {useState} from 'react';
import {Form, Button} from 'semantic-ui-react';
import {userPath, userLoginPath} from '../helpers/path'
const fetch = require('node-fetch');

function LoginForm (props) {
    const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
 
 
  const updateUserData = event =>
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
 
  const click = (event) => {
    event.preventDefault()
    const user = userData;
    if (event.target.name === 'register') {
      if (user.password.length < 8) {
        alert("Password must be at least eight characters long");
        return;
      }
      
      if (user.firstName === '') {
        alert("First name field is empty");
        return;
      }

      if (user.lastName === '') {
        alert("Last name field is empty");
        return;
      }
		
		  registerUser(user);
      console.log("Register")
		}
		else if (event.target.name === "login"){   
      if (user.email === '') {
        alert("Email field is empty");
        return;
      }

      if (user.password === '') {
        alert("Password field is empty");
        return;
      }
      loginUser(user)
      console.log("login")
    }
	}
  
  const loginUser = async(user) => {
    const conf = { 
      method: 'POST', 
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }
    
    await fetch(userLoginPath, conf)
    .then(resp => resp.json())
    .then(function(resp) {
      if (resp.status !== 'success') {
        console.log(resp.error)
        alert(resp.error)
      }
      else {
        console.log(resp)
        alert('Welcome back '+ user.email + '!')
      }
    })
  }

  const registerUser = async(user) => {
    let data = {};
    data.first_name = user.firstName;
    data.last_name = user.lastName;
    data.email = user.email;
    data.password = user.password;    
    const conf = { 
      method: 'POST', 
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    
    await fetch(userPath, conf)
    .then(resp => resp.json())
    .then(function(resp) {
      if (resp.status !== 'success') {
        console.log(resp.error)
        alert(resp.error)
      }
    })
  }

  /*const fetchUsers = async() => {
    const URL = usersPath;
    const response = await fetch(URL)
    const jsonData = await response.json();
    let users = []
    users = await jsonData.data;
  }*/
  
  const { firstName, lastName, email, password } = userData;
  return (
    <Form>
      <Form.Field>
        <label htmlFor="email">Email:</label>
        <input 	type="email"
            name="email"
            required={true}
            onChange={e => updateUserData(e)}
            value={email}/>
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">Password:</label>
        <input 	type="password"
            name="password"
            required={true}
            onChange={e => updateUserData(e)}
            value={password}/>
      </Form.Field>
      <Form.Field>
        <label htmlFor="firstName">First Name:</label>
        <input 	type="text"
            name="firstName"
            required={true}
            onChange={e => updateUserData(e)}
            value={firstName}/>
      </Form.Field>
      <Form.Field>
        <label htmlFor="lastName">Last Name:</label>
        <input 	type="text"
            name="lastName"
            required={true}
            onChange={e => updateUserData(e)}
            value={lastName}/>
      </Form.Field>
      <Button name = "login" onClick = {click}>Login</Button>
      <Button name = "register" onClick = {click}>Register</Button>
    </Form>
  )
}

export default LoginForm;

