import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import LoginForm from './components/LoginForm';
import List from './components/List';
import Stamps from './components/Stamps';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginForm />
        <List />
        <Stamps/>
      </header>
    </div>
  );
}

export default App;
