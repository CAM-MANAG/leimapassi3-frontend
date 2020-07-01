import React, {useState, useEffect} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import LoginForm from './components/LoginForm';
import List from './components/List';
import StampCard from './components/StampCard';

function App() {
  const [loginData, setLoginData] = useState({
    token:'',
    isLogged: false
  })
  const [userData, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    id:""
  });

  useEffect(()=> {


    console.log("in App useEffect")
    let data = {
      token:'',
      isLogged: false
    }
    console.log(data);
    setLoginData(data);
    //const data = JSON.parse(localStorage.getItem("state"))
    //setLoginData(data);
    console.log(data);
  },[])

  const saveToStorage = (loginData) => {
    localStorage.setItem("state", JSON.stringify(loginData));
    console.log("loginData")
    console.log(loginData);
  }


  // saveToStorage = {saveToStorage}
  return (
    <div className="App">
      <header className="App-header">
        <LoginForm 
          loginData = {loginData} 
          setLoginData = {setLoginData}
          saveToStorage = {saveToStorage}
          userData = {userData}
          setUser = {setUser}/>
        <StampCard 
          loginData = {loginData}
          userData = {userData}/>
        <List 
          loginData = {loginData} 
          userData = {userData}
          setUser = {setUser}/>
      </header>
    </div>
  );
}

export default App;
