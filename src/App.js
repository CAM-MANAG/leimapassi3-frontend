import React, {useState, useEffect} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import LoginForm from './components/LoginForm';
import List from './components/List';
import Stamps from './components/Stamps';

function App() {
  const [loginData, setLoginData] = useState({
    token:'',
    isLogged: false
  })

  useEffect(()=> {
    console.log("in useEffect")
    const data = JSON.parse(localStorage.getItem("state"))
    setLoginData(data);
    console.log(data);
  },[])

  const saveToStorage = (loginData) => {
    localStorage.setItem("state", JSON.stringify(loginData));
    console.log("loginData")
    console.log(loginData);
  }

  return (
    <div className="App">
      <header className="App-header">
        <LoginForm 
          loginData = {loginData} 
          setLoginData = {setLoginData}
          saveToStorage = {saveToStorage}/>
        <List loginData = {loginData} />
        <Stamps/>
      </header>
    </div>
  );
}

export default App;
