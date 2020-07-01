import React from 'react';
import {Form, Button} from 'semantic-ui-react';
import {userPath, userLoginPath, tokenPath} from '../helpers'
const fetch = require('node-fetch');

function LoginForm (props) {

  const updateUserData = event =>
    props.setUser({
      ...props.userData,
      [event.target.name]: event.target.value
    });
 
  const click = (event) => {
    event.preventDefault()
    const user = props.userData;
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
    else if (event.target.name === "logout"){ 
      console.log(props.loginData.token)
      const token = {token: props.loginData.token}
      logoutUser(token)
      console.log("logout")
    }
	}
  
  const loginUser = async(user) => {
    const conf = { 
      method: 'POST', 
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }
    
    console.log("in loginUser")
    await fetch(userLoginPath, conf)
    .then(resp => resp.json())
    .then(function(resp) {
      console.log(resp)
      if (resp.status !== 'success') {
        console.log(resp.error)
        alert(resp.error)
      }
      else {  // login successful
        console.log(resp)
        const data = {
          isLogged: true,
          token: resp.data.token
        }
        console.log(data)
        props.setLoginData(data);
        props.saveToStorage(data);

        const userData = {
          "id": resp.data.id,
          "email": user.email,
          "password": user.password,
          "firstname": resp.data.first_name,
          "lastname": resp.data.last_name
        }
        console.log(userData)
        props.setUser(userData);
        alert('Welcome back '+ user.email + '!')
        console.log(user)
        const token = {token: data.token}
        addToken(token) 
      }
    })
  }

  const addToken = async(token) => {
    console.log(token)
    const conf = { 
      method: 'POST', 
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(token)
    }
    //console.log(tokenPath)
    //console.log(conf)
    await fetch(tokenPath, conf)
    .then(resp => resp.json())
    .then(function(resp) {
      console.log(resp)
      if (resp.status !== 'success') {
        console.log(resp.error)
        alert(resp.error)
      }
      else {  // token added to logins
        console.log(resp)
      }
    })
  }

 /* const addToken = async(token) => {
    console.log(token)
    const conf = { 
      method: 'POST', 
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(token)
    }
    console.log(tokenPath)
    console.log(conf)
    await fetch(tokenPath, conf)
    .then(resp => resp.json())
    .then(function(resp) {
      console.log(resp)
      if (resp.status !== 'success') {
        console.log(resp.error)
        alert(resp.error)
      }
      else {  // token added to logins
        console.log(resp)
      }
    })
  }
*/
  const deleteToken = async(token) => {
    console.log(token)
    const conf = { 
      method: 'DELETE', 
      //mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(token)
    }
    console.log(tokenPath)
    console.log(conf)
    await fetch(tokenPath, conf)
    .then(resp => resp.json())
    .then(function(resp) {
      if (resp.status !== 'success') {
        console.log(resp.error)
        alert(resp.error)
      }
      
    })
  }

  const logoutUser = (token) => {
    console.log(token)
    deleteToken(token)
    const data = {
      isLogged: false,
      token: ''
    }
    props.setLoginData(data);
    props.saveToStorage(data);
    
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
      else {
        console.log(resp)
        props.setUser({
          ...user, 
          "id":resp.data.id})
      }
    })
  }
  
  const { firstName, lastName, email, password } = props.userData;
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
      <Button name = "logout" onClick = {click}>Logout</Button>
    </Form>
  )
}

export default LoginForm;

