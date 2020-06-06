import React, {useState} from 'react';
import {Form, Button} from 'semantic-ui-react';


const LoginForm =() => {  
	//const [user, setUser] = useState([]);
  const [response, setResponse] = useState([]);
  
	onChange = (event) => {
		/*let state = {}
		state[event.target.name] = event.target.value;
    this.setState(state);*/
    //setUser(`{${event.target.name} : ${event.target.value}}`)
    let j=0;
	}
  
	click = (event) => {
		event.preventDefault();
		let user = {
			email:this.state.email,
      password:this.state.password,
      first_name:this.state.first_name,
      last_name: this.state.last_name
		}
		if (/*user.username.length < 4 ||*/ user.password.length < 8) {
			alert("Username must be at least four characters and password eight characters long");
			return;
		}
		if (event.target.name === "register") {
      // this.addUserEndpoint(user) 
      console.log("Register")
      let list = fetch("http://localhost:3001/api/v1/users")
        .then((res) => 
        { 
          console.log(res);
          setResponse(res)
          return res
        })
      //console.log(list)
		//	this.props.dispatch(onRegister(user));
		}
		else {
    //	this.props.dispatch(onLogin(user));
      console.log("Login")
		}
	}
      
  onClick= () =>{
    let i;
  }
    
	render= ()=> {
    //let responseList = response.map(index => <li>response.email</li>)
    let responseList = ''
		return (
			<Form>
				<Form.Field>
					<label htmlFor="email">Email:</label>
					<input 	type="email"
							name="email"
							required={true}
              onChange={this.onChange}
              //onChange={e => setName(e.target.value)}
							value={this.state.email}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="password">Password:</label>
					<input 	type="password"
							name="password"
							required={true}
							onChange={this.onChange}
							value={this.state.password}/>
				</Form.Field>
        <Form.Field>
					<label htmlFor="first_name">First Name:</label>
					<input 	type="text"
							name="first_name"
							required={true}
							onChange={this.onChange}
							value={this.state.first_name}/>
				</Form.Field>
        <Form.Field>
					<label htmlFor="last_name">Last Name:</label>
					<input 	type="text"
							name="last_name"
							required={true}
							onChange={this.onChange}
							value={this.state.last_name}/>
				</Form.Field>
				<Button name = "login" onClick = {this.click}>Login</Button>
				<Button name = "register" onClick = {this.click}>Register</Button>
        <ul>
          {responseList}
        </ul>
			</Form>
		)
	}
}

export default /*connect()(*/ LoginForm/*)*/;

