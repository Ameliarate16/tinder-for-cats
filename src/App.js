import React, { Component } from 'react';
import './App.css';
import Profile from './Components/Profile'
import Likes from './Components/Likes'

//api key:    8820e5a33c8a3a3ce8dab58ef814de13
//api secret: 05193f3fdce7e005c28c59bcdeb71e3d
//pet.getRandom

class App extends Component {
  constructor(){
    super();
    this.state = {
      cats: []
    };
  }

  likeCallback = (cat) => {
    this.state.cats.push(cat);
    this.setState({
      cats: this.state.cats
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Profile likeCallback={this.likeCallback} />
            {this.state.cats.length?<Likes cats={this.state.cats} />:""}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
