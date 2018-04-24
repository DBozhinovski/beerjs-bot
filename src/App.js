import React, { Component } from 'react';
import bjs from './beerjs.svg';
import './App.css';

import Chat from './Chat';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={bjs} className="App-logo" alt="logo" />
          <h1 className="App-title">BeerJS Bot</h1>
        </header>
        <main>
          <Chat />
        </main>
      </div>
    );
  }
}

export default App;
