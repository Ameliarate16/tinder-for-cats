import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//api key:    8820e5a33c8a3a3ce8dab58ef814de13
//api secret: 05193f3fdce7e005c28c59bcdeb71e3d
//pet.getRandom

async function catSearch(method){
  const cat = await $.ajax({
    url: `http://api.petfinder.com/${method}`,
    method: "GET",
    data: {
      key: "8820e5a33c8a3a3ce8dab58ef814de13",
      format: "json",
      callback: "?"
    }
  });
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
