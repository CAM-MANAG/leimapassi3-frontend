import React from 'react';
import './App.css';

import LoginForm from './components/LoginForm';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginForm />
        <List />
      </header>
    </div>
  );
}

export default App;
